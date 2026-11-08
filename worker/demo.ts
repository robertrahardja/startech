/**
 * POST /api/demo: AI-powered product demos with lead capture. Google
 * sign-in (google-auth.ts), per-account limits and the blocklist
 * (rate-limit.ts), then one model call (demo-model.ts). Each demo's prompt
 * and input fields are in demo-configs.ts.
 */

import { DEMO_CONFIGS, MAX_IMAGE_DATA_URL_LENGTH } from "./demo-configs";
import { runDemoModel } from "./demo-model";
import type { Env } from "./env";
import { verifyGoogleIdToken } from "./google-auth";
import { isRequestTooLarge, jsonError } from "./http";
import { isBlocked, isRateLimited } from "./rate-limit";
import { siteSender } from "./resend";
import { escapeHtml, sanitizeEmail, sanitizeString } from "./sanitize";

export async function handleDemo(
  request: Request,
  env: Env
): Promise<Response> {
  // Gemini is optional at the type level (env vars are never guaranteed
  // present) — its absence just means every request uses the Workers AI
  // fallback instead, which needs no separate credential. Only a missing
  // AI binding itself would mean the endpoint has nothing to call at all,
  // and that's a deploy-config error rather than a request-time 503.
  if (!env.AI) {
    return jsonError("Demo service is not configured.", 503);
  }

  if (!env.GOOGLE_CLIENT_ID) {
    return jsonError("Sign-in is not configured.", 503);
  }

  // Most demos never send more than a few KB of text; invoice-scanner's
  // photo upload is the outlier, capped separately below by
  // MAX_IMAGE_DATA_URL_LENGTH once the body is parsed. This ceiling only
  // needs to be big enough to let that image field's own limit be the one
  // that actually fires, plus headroom for the ID token and JSON overhead.
  if (isRequestTooLarge(request, MAX_IMAGE_DATA_URL_LENGTH + 50_000)) {
    return jsonError("Request too large.", 413);
  }

  // CSRF check
  if (request.headers.get("X-Requested-With") !== "XMLHttpRequest") {
    return jsonError("Invalid request.", 403);
  }

  let body: {
    type?: string;
    idToken?: string;
    input?: Record<string, string>;
  };
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  // Validate demo type
  const demoType = sanitizeString(body.type || "", 100);
  const config = DEMO_CONFIGS[demoType];
  if (!config) {
    return jsonError("Invalid demo type.", 400);
  }

  // Verify identity — the email/name used below come only from this,
  // never from anything the client claims directly.
  if (!body.idToken || typeof body.idToken !== "string") {
    return jsonError("Sign-in is required.", 401);
  }
  const claims = await verifyGoogleIdToken(body.idToken, env.GOOGLE_CLIENT_ID);
  if (!claims) {
    return jsonError("Sign-in could not be verified. Please sign in again.", 401);
  }
  const email = sanitizeEmail(claims.email);
  const name = sanitizeString(claims.name || "", 200);
  const googleSub = sanitizeString(claims.sub, 100);

  const clientIpForBlock =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "unknown";

  if (env.RATE_LIMIT && (await isBlocked(env.RATE_LIMIT, clientIpForBlock, googleSub))) {
    return jsonError("This account is not able to use demos right now.", 403);
  }

  if (env.RATE_LIMIT) {
    // Per-demoType limit: the two demos that will eventually take real-world
    // actions (booking a calendar slot, sending an email) get a tighter cap
    // than the pure-generation demos.
    const strictDemoTypes = new Set(["appointment-booking", "sales-assistant"]);
    const perTypeMax = strictDemoTypes.has(demoType) ? 3 : 5;
    const windowSeconds = 3600;

    const limited =
      (await isRateLimited(env.RATE_LIMIT, `ip:${clientIpForBlock}:${demoType}`, perTypeMax, windowSeconds)) ||
      (await isRateLimited(env.RATE_LIMIT, `sub:${googleSub}:${demoType}`, perTypeMax, windowSeconds));

    if (limited) {
      return jsonError("Too many requests. Please try again later.", 429);
    }
  }

  // Validate input fields. Image fields skip the usual string sanitizer —
  // stripping control characters would corrupt base64 — but still get the
  // same length cap and a strict shape check before anything trusts them.
  const rawInput = body.input || {};
  const sanitizedInput: Record<string, string> = {};
  let imageDataUrl: string | null = null;

  for (const field of config.inputFields) {
    const raw = String(rawInput[field.name] || "");

    if (field.type === "image") {
      if (!raw) continue;
      if (raw.length > field.maxLength) {
        return jsonError(`${field.label} is too large.`, 413);
      }
      if (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/.test(raw)) {
        return jsonError(`${field.label} must be a JPEG, PNG, or WebP image.`, 400);
      }
      imageDataUrl = raw;
      continue;
    }

    const value = sanitizeString(raw, field.maxLength);
    if (field.required && !value) {
      return jsonError(`${field.label} is required.`, 400);
    }
    if (value) {
      sanitizedInput[field.name] = value;
    }
  }

  // No field in the schema is individually required for invoice-scanner
  // (a photo or pasted text both satisfy it), so the per-field checks above
  // can't catch "neither was sent" — that's checked once, here, for every
  // demo alike.
  if (!imageDataUrl && Object.keys(sanitizedInput).length === 0) {
    return jsonError("Input is required.", 400);
  }

  // Build the user message from the text input fields.
  const userMessage = Object.entries(sanitizedInput)
    .map(([key, val]) => `${key}: ${val}`)
    .join("\n");

  let aiResult: Record<string, unknown>;
  let modelProvider: "gemini" | "workers-ai";
  try {
    const { result, provider } = await runDemoModel(env, {
      systemPrompt: config.systemPrompt,
      userMessage,
      imageDataUrl,
      maxTokens: config.maxTokens,
    });
    aiResult = result;
    modelProvider = provider;
  } catch (err) {
    console.error("Demo model error:", err);
    return jsonError("AI service temporarily unavailable.", 502);
  }

  // Store lead in D1 (fire-and-forget for speed, but log errors)
  // The image itself never reaches D1 — it's a multi-megabyte blob with no
  // abuse-review value once the AI's already extracted the fields from it,
  // and this table is otherwise just short text. A flag is enough to know
  // this lead came from a photo rather than pasted text.
  const inputJson = JSON.stringify(
    imageDataUrl ? { ...sanitizedInput, receipt_image: "[photo submitted]" } : sanitizedInput
  );
  const outputJson = JSON.stringify(aiResult);

  try {
    if (env.DB) {
      await env.DB.prepare(
        "INSERT INTO demo_leads (email, name, google_sub, demo_type, input_data, output_data, ip, model_provider) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(email, name || null, googleSub, demoType, inputJson, outputJson, clientIpForBlock, modelProvider).run();
    }
  } catch (err) {
    console.error("D1 insert error:", err);
  }

  // Send notification email (fire-and-forget)
  if (env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: siteSender("StarTech Demos", "demos"),
          to: ["rr.startech.innovation@gmail.com"],
          reply_to: email,
          subject: `Demo Lead: ${escapeHtml(config.description)} — ${escapeHtml(email)}`,
          html: `
            <h2>New Demo Lead</h2>
            <p><strong>Demo:</strong> ${escapeHtml(config.description)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${name ? `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` : ""}
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            <hr>
            <p><small>StarTech AI Demo Lead Capture — verified via Google sign-in</small></p>
          `,
          text: `Demo: ${config.description}\nEmail: ${email}\n${name ? `Name: ${name}\n` : ""}`,
        }),
      });
    } catch (err) {
      console.error("Resend notification error:", err);
    }
  }

  return new Response(
    JSON.stringify({ success: true, result: aiResult }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
