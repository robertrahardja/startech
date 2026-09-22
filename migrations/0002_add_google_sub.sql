-- The lead's identity now comes from a verified Google sign-in rather than a
-- typed form, so `sub` (Google's stable per-account id) is worth keeping
-- alongside email — an abusive account can be blocklisted by sub even if it
-- signs in from a new IP, and by IP even if it uses a new account.
--
-- `company` (added when the form was still hand-typed) is left in place:
-- it's nullable, so leaving it stops being written rather than dropping it.
ALTER TABLE demo_leads ADD COLUMN google_sub TEXT;

CREATE INDEX idx_demo_leads_google_sub ON demo_leads(google_sub);
