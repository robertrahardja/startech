-- The demo endpoint now tries Gemini first and falls back to Workers AI
-- once Gemini's free-tier daily ceiling is spent or a live call comes back
-- quota-exhausted. Recording which one actually served a given lead makes
-- fallback frequency visible from a simple query rather than only from
-- Worker logs, which don't stick around.
ALTER TABLE demo_leads ADD COLUMN model_provider TEXT;
