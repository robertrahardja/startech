// Demo model calls (Gemini primary, Workers AI fallback).
// Every /api/demo request needs one JSON result back from a system prompt
// plus either text or an image. Gemini is the primary model — free tier,
// and its response_mime_type option gets the same "always valid JSON"
// guarantee OpenAI's response_format gave before. Workers AI is the
// fallback for when Gemini's free-tier quota for the day is spent: it's
// already local to this Worker (no separate account), but neither its JSON
// reliability nor its vision quality are Gemini's equal, so it only runs
// when Gemini genuinely isn't an option, never as a co-equal alternative.

import type { Env } from "./env";
import { callGemini, callWorkersAi, isGeminiQuotaError, type DemoModelInput } from "./model-providers";
import { isGeminiDailyCeilingReached, recordGeminiCall } from "./rate-limit";

/**
 * Runs a demo prompt against Gemini, falling back to Workers AI when
 * Gemini's daily ceiling is already spent or a live call comes back
 * quota-exhausted. Returns the parsed result and which provider produced
 * it, so the caller can log which path served the request.
 */
export async function runDemoModel(
  env: Env,
  input: DemoModelInput
): Promise<{ result: Record<string, unknown>; provider: "gemini" | "workers-ai" }> {
  const geminiAvailable =
    !!env.GOOGLE_GEMINI_API_KEY &&
    !!env.RATE_LIMIT &&
    !(await isGeminiDailyCeilingReached(env.RATE_LIMIT));

  if (geminiAvailable) {
    try {
      const result = await callGemini(env.GOOGLE_GEMINI_API_KEY, input);
      await recordGeminiCall(env.RATE_LIMIT);
      return { result, provider: "gemini" };
    } catch (err) {
      const status = (err as { status?: number }).status;
      if (!isGeminiQuotaError(status ?? 0)) throw err;
      // Quota exhausted specifically — fall through to Workers AI below.
    }
  }

  const result = await callWorkersAi(env.AI, input);
  return { result, provider: "workers-ai" };
}
