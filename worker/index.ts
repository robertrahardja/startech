/**
 * StarTech Innovation - Cloudflare Worker
 *
 * Handles API endpoints:
 * - POST /api/chat    — Proxies to OpenAI GPT-4o-mini with streaming SSE
 * - POST /api/tts     — Proxies to ElevenLabs text-to-speech
 * - POST /api/contact — Sends email via Resend
 *
 * Static assets are served by the ASSETS binding (Cloudflare Workers static assets).
 */

interface Env {
  ASSETS: Fetcher;
  OPENAI_API_KEY: string;
  ELEVENLABS_API_KEY: string;
  RESEND_API_KEY: string;
  ENVIRONMENT: string;
}

// ─── Rate Limiting (in-memory, per-isolate) ─────────────────────────────────
// For production at scale, use Cloudflare Rate Limiting rules or Durable Objects.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(
  ip: string,
  endpoint: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const key = `${ip}:${endpoint}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count++;
  return entry.count > maxRequests;
}

// ─── Input Sanitization ─────────────────────────────────────────────────────

function sanitizeString(input: string, maxLength: number): string {
  // Strip control characters (except newlines/tabs), trim, and truncate
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function validateOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigins = [
    "https://startech-innovation.com",
    "https://www.startech-innovation.com",
    "https://startech.pages.dev",
    "http://localhost:5173",
    "http://localhost:8787",
  ];
  return allowedOrigins.includes(origin) || origin === "";
}

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

// ─── StarTech System Prompt ─────────────────────────────────────────────────

const STARTECH_SYSTEM_PROMPT = `You are the AI assistant for StarTech Innovation, a Singapore-based technology consultancy led by Robert Rahardja as Managing Director.

StarTech Innovation Pte. Ltd. is located at 1003 Bukit Merah Central #06-07, Singapore 159836. Phone is +65 9069 3236. Email is info@startech-innovation.com.

StarTech specialises in six areas: enterprise AI implementation using AWS, OpenAI, HeyGen, ElevenLabs, and Cloudflare; ERP systems built on Java Spring Boot and PostgreSQL; education technology including LMS and AI tutoring; healthcare IT for hospitals; financial tools like accounting, insurance scanning, tax, and startup valuation; and blockchain platforms.

Products include an AI Decision Engine, Startup Valuation Tool, Insurance Scanner, ERP Platform, Education Platform, Health IT System, and Crypto Exchange.

The implementation approach runs 90 days: discovery in weeks one and two, architecture in weeks three and four, proof of concept in weeks five to eight, production deployment in weeks nine to eleven, then ongoing optimisation.

RULES FOR YOUR RESPONSES:
Keep answers to one to three sentences. Be direct. Never use markdown, asterisks, bullet points, dashes, headers, or any formatting. Write plain conversational English only. Never use the ampersand symbol, always write "and" instead. Never say "and and" or repeat conjunctions. Sound like a confident senior consultant in a brief conversation. If asked about pricing, say StarTech provides custom quotes and suggest reaching out via the contact form or email. If asked something unrelated, politely redirect.`;

// ─── API Handlers ───────────────────────────────────────────────────────────

async function handleChat(
  request: Request,
  env: Env
): Promise<Response> {
  if (!env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "AI chat service is not configured." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { message?: string; history?: Array<{ role: string; content: string }> };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const message = sanitizeString(body.message || "", 2000);
  if (!message) {
    return new Response(
      JSON.stringify({ error: "Message is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Build conversation history (limit to last 20 messages to control token usage)
  const history = (body.history || []).slice(-20).map((m) => ({
    role: m.role === "assistant" ? "assistant" as const : "user" as const,
    content: sanitizeString(m.content || "", 2000),
  }));

  const messages = [
    { role: "system" as const, content: STARTECH_SYSTEM_PROMPT },
    ...history,
    { role: "user" as const, content: message },
  ];

  // Stream response from OpenAI
  const openaiResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        stream: true,
        max_tokens: 200,
        temperature: 0.7,
      }),
    }
  );

  if (!openaiResponse.ok) {
    const errText = await openaiResponse.text();
    console.error("OpenAI API error:", openaiResponse.status, errText);
    return new Response(
      JSON.stringify({ error: "AI service temporarily unavailable." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  // Forward the SSE stream directly to the client
  return new Response(openaiResponse.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      ...corsHeaders(request),
    },
  });
}

async function handleTts(
  request: Request,
  env: Env
): Promise<Response> {
  if (!env.ELEVENLABS_API_KEY) {
    return new Response(
      JSON.stringify({ error: "TTS service is not configured." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { text?: string; voiceId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const text = sanitizeString(body.text || "", 1000);
  if (!text) {
    return new Response(
      JSON.stringify({ error: "Text is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Default to Rachel voice if none specified
  const voiceId = body.voiceId || "21m00Tcm4TlvDq8ikWAM";

  const elevenLabsResponse = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method: "POST",
      headers: {
        "xi-api-key": env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!elevenLabsResponse.ok) {
    console.error("ElevenLabs error:", elevenLabsResponse.status);
    return new Response(
      JSON.stringify({ error: "TTS service temporarily unavailable." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(elevenLabsResponse.body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-cache",
      ...corsHeaders(request),
    },
  });
}

async function handleContact(
  request: Request,
  env: Env
): Promise<Response> {
  if (!env.RESEND_API_KEY) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Email service is not configured.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const name = sanitizeString(body.name || "", 200);
  const email = sanitizeString(body.email || "", 320);
  const phone = sanitizeString(body.phone || "", 30);
  const message = sanitizeString(body.message || "", 5000);

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Name, email, and message are required.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid email address." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "StarTech Website <onboarding@resend.dev>",
      to: ["rr.startech.innovation@gmail.com"],
      reply_to: email,
      subject: `New Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Sent from StarTech Innovation website</small></p>
      `,
      text: `Name: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}Message:\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    console.error("Resend error:", resendResponse.status);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to send email. Please try again later.",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ─── Main Request Handler ───────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS" && url.pathname.startsWith("/api/")) {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    // Only API routes are handled by the worker
    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    // Origin validation for API routes
    if (!validateOrigin(request)) {
      return new Response(
        JSON.stringify({ error: "Forbidden." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Method check — all API endpoints are POST only
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed." }),
        { status: 405, headers: { "Content-Type": "application/json" } }
      );
    }

    const clientIp =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For") ||
      "unknown";

    // Rate limiting per endpoint
    const rateLimits: Record<string, [number, number]> = {
      "/api/chat": [20, 60_000], // 20 requests per minute
      "/api/tts": [10, 60_000], // 10 requests per minute
      "/api/contact": [3, 60_000], // 3 requests per minute
    };

    const limits = rateLimits[url.pathname];
    if (limits && isRateLimited(clientIp, url.pathname, limits[0], limits[1])) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            ...corsHeaders(request),
          },
        }
      );
    }

    // Route to handler
    let response: Response;
    try {
      switch (url.pathname) {
        case "/api/chat":
          response = await handleChat(request, env);
          break;
        case "/api/tts":
          response = await handleTts(request, env);
          break;
        case "/api/contact":
          response = await handleContact(request, env);
          break;
        default:
          response = new Response(
            JSON.stringify({ error: "Not found." }),
            { status: 404, headers: { "Content-Type": "application/json" } }
          );
      }
    } catch (err) {
      console.error("Worker error:", err);
      response = new Response(
        JSON.stringify({ error: "Internal server error." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Add CORS headers to all API responses
    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(corsHeaders(request))) {
      headers.set(key, value);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
