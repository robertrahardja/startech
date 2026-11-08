/**
 * The two model hosts /api/demo can call: Gemini (primary) and Cloudflare
 * Workers AI (fallback). Which one runs is decided in demo-model.ts.
 */

const GEMINI_MODEL = "gemini-2.0-flash";
const WORKERS_AI_TEXT_MODEL = "@cf/meta/llama-3.1-8b-instruct-fp8";
const WORKERS_AI_VISION_MODEL = "@cf/meta/llama-3.2-11b-vision-instruct";

/** Parsed out of a data: URL — Gemini and Workers AI both want the raw
 * base64 payload and the MIME type as separate fields, not one string. */
function splitDataUrl(dataUrl: string): { mimeType: string; base64: string } {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error("Malformed image data URL");
  return { mimeType: match[1], base64: match[2] };
}

/** True for the specific Gemini error shape that means "quota exhausted for
 * now" — the only condition the caller should fall back to Workers AI for.
 * Any other failure (bad request, genuine server error) surfaces as a real
 * error instead of being silently masked by a lower-quality fallback. */
export function isGeminiQuotaError(status: number): boolean {
  return status === 429;
}

export interface DemoModelInput {
  systemPrompt: string;
  userMessage: string;
  imageDataUrl: string | null;
  maxTokens: number;
}

/**
 * Calls Gemini. Returns the parsed JSON result on success, or throws — the
 * thrown value's `status` (when present) lets the caller distinguish "quota
 * exhausted, try the fallback" from every other kind of failure.
 */
export async function callGemini(
  apiKey: string,
  input: DemoModelInput
): Promise<Record<string, unknown>> {
  const parts: Array<{ text: string } | { inline_data: { mime_type: string; data: string } }> = [];
  if (input.userMessage) parts.push({ text: input.userMessage });
  if (input.imageDataUrl) {
    const { mimeType, base64 } = splitDataUrl(input.imageDataUrl);
    parts.push({ inline_data: { mime_type: mimeType, data: base64 } });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: input.systemPrompt }] },
        contents: [{ role: "user", parts }],
        generationConfig: {
          maxOutputTokens: input.maxTokens,
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!res.ok) {
    const err = new Error(`Gemini API error: ${res.status}`) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned no response");
  return JSON.parse(text);
}

/**
 * Best-effort JSON extraction from a Workers AI text response. Unlike
 * Gemini/OpenAI, Workers AI has no native "force JSON" mode — the model is
 * asked nicely in the prompt, but the raw response can still come back with
 * leading/trailing prose around the object. Tries a straight parse first,
 * then the first {...} substring, and only gives up after both fail.
 */
function extractJson(text: string): Record<string, unknown> {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        // fall through
      }
    }
    throw new Error("Could not extract JSON from Workers AI response");
  }
}

/** Calls Cloudflare Workers AI — the fallback once Gemini isn't an option. */
export async function callWorkersAi(
  ai: Ai,
  input: DemoModelInput
): Promise<Record<string, unknown>> {
  const jsonInstruction =
    "Respond with ONLY a single valid JSON object matching the schema described above — no markdown code fences, no prose before or after it.";

  if (input.imageDataUrl) {
    const { base64 } = splitDataUrl(input.imageDataUrl);
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const result = (await ai.run(WORKERS_AI_VISION_MODEL, {
      prompt: `${input.systemPrompt}\n\n${jsonInstruction}\n\n${input.userMessage}`,
      image: Array.from(bytes),
      max_tokens: input.maxTokens,
    })) as { response?: string };
    if (!result.response) throw new Error("Workers AI returned no response");
    return extractJson(result.response);
  }

  const result = (await ai.run(WORKERS_AI_TEXT_MODEL, {
    messages: [
      { role: "system", content: `${input.systemPrompt}\n\n${jsonInstruction}` },
      { role: "user", content: input.userMessage },
    ],
    max_tokens: input.maxTokens,
  })) as { response?: string };
  if (!result.response) throw new Error("Workers AI returned no response");
  return extractJson(result.response);
}
