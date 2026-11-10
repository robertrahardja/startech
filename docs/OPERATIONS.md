# Operations

Where this site lives, how mail reaches you, and how to deploy it.
Written 2026-09-02, extended 2026-09-03. Verified against the live services
on those dates.

## Open items

Picked up where this left off:

- **No locale has had a native review.** Six languages are live and
  reachable. Every catalogue file says so in its header. Worth doing before
  pointing campaign traffic at a specific language — see
  [Languages](#languages).
- **`/solutions/*` is English only** — 219 strings, and the data file needs
  restructuring before they have anywhere to live.
- **Three DNS problems are unfixed**: two SPF records (an RFC 7208 violation
  causing permerror), no DKIM, no DMARC — see
  [Known DNS problems](#known-dns-problems).
- **AI chat is off in production.** The OpenAI account returns 429 on every
  call. Gated behind `VITE_ENABLE_AI_CHAT`, not deleted — see
  [AI chat](#ai-chat--currently-disabled).
- **Outreach mail and enquiry acknowledgements are off** until
  `mail.startech-innovation.com` is verified in Resend and `OUTREACH_FROM`
  is set — see [Switching sending on](#switching-sending-on).

## Hosting

| | |
| --- | --- |
| Platform | Cloudflare Workers with `[assets]` — **not** Pages |
| Worker name | `startech` |
| Cloudflare account | `Rr.startech.innovation@gmail.com` |
| Account ID | `6ee935bdec95c224f38e01105b6beed1` |
| Domains | `startech-innovation.com`, `www.startech-innovation.com` |
| D1 database | `startech-demos` (`dd762257-3eee-4e21-897f-6eb580c4f0c7`) |

The domains are bound as **Custom Domains on the Worker**, not as zone Workers
Routes. That is why the Cloudflare zone overview reports "No Workers
connected" while the site is plainly running — the binding lives under the
Worker's own settings, and the zone panel only lists Routes.

## Email

**There is one real mailbox.** `robert.rahardja@startech-innovation.com`,
hosted on **Namecheap Private Email** — sign in at
[privateemail.com](https://privateemail.com).

`info@startech-innovation.com` is **not a mailbox**. It cannot be logged into.
Mail addressed to it is delivered to `robert.rahardja@` by the domain's
catch-all, which was confirmed by test on 2026-09-02. The same catch-all
accepts any other address at the domain, so a made-up address will also be
accepted at SMTP time rather than bounced.

The Private Email plan reports "5 GB of 5 GB assigned to mailbox", consistent
with a single mailbox holding the whole allocation.

### DNS

```text
MX   10  mx1.privateemail.com
MX   20  mx2.privateemail.com
```

### Known DNS problems

Not yet fixed as of 2026-09-02:

1. **Two SPF records exist.** RFC 7208 permits one per domain; receivers
   seeing two commonly return `permerror` and treat the mail as
   unauthenticated, which pushes outbound mail toward spam.

   ```text
   v=spf1 include:spf.privateemail.com ~all
   v=spf1 include:spf.efwd.registrar-servers.com ~all
   ```

   Replace both with a single record:

   ```text
   v=spf1 include:spf.privateemail.com include:spf.efwd.registrar-servers.com ~all
   ```

   Drop the `efwd` include if Namecheap email forwarding is not in use.

2. **No DKIM.** Nothing published at any common selector. Enable it under
   Namecheap → Private Email → Email Security, then publish the TXT record it
   generates.

3. **No DMARC.** Start in monitoring mode, which changes no delivery:

   ```text
   _dmarc  TXT  v=DMARC1; p=none; rua=mailto:robert.rahardja@startech-innovation.com
   ```

   Tighten to `p=quarantine` once SPF and DKIM have been clean for a few weeks.

DNS is edited at Namecheap → Domain List → `startech-innovation.com` →
Manage → Advanced DNS.

## Contact form

`POST /api/contact` → the Worker → the CRM database, then
[Resend](https://resend.com) → an email.

| | |
| --- | --- |
| Stored in | D1 `startech-crm` (binding `CRM_DB`), the st_dasboard CRM |
| To | `rr.startech.innovation@gmail.com` |
| From | `StarTech Website <onboarding@resend.dev>` |
| Reply-To | the visitor's address |

Each enquiry becomes a `lead` contact, plus a "Website enquiry" note holding
the message. A company is created or matched by name when one is given. A
repeat enquiry from the same email address adds a note to the existing
contact.

Once `OUTREACH_FROM` is set, a lead that reached the CRM also gets one
short acknowledgement — see [Outreach mail](#outreach-mail).

### Where the lead came from

The contact's `source` is the `utm_source` of the URL the visitor arrived
on, when it is one hq knows (`linkedin`, `youtube`, `line`, `whatsapp` and
the rest of `CONTACT_SOURCES` in `st_dasboard/src/crm/types.ts`); any other
tag is filed under `website` and kept verbatim in the note. `src/lib/utm.ts`
reads `utm_source`, `utm_medium` and `utm_campaign` once on arrival and
keeps them in `sessionStorage` until the form is sent, so a tag survives
browsing to another page first. Every bio link and flyer must carry
`?utm_source=<platform>`, or the channel cannot be measured.

### The flyer page and its spreadsheet

`/flyer` (and `/<locale>/flyer`) is the digital flyer: who it is for, three
proof lines, three demos, the offer, a longer form, the deck, the EDGE line.
It is reached by link only and is not prerendered. Its form adds country, a
staff-count band and an optional spreadsheet; with a file attached it posts
`multipart/form-data` instead of JSON and the Worker reads both.

The file goes to the R2 bucket `startech-leads` (binding `LEADS`, created
2026-11-02) under `<date>/<uuid>/<name>`; `.xlsx .xls .xlsm .csv .ods
.numbers .tsv`, 10 MB at most. The note and the email link to
`https://hq.startech-innovation.com/api/leads/files/<key>`, which hq serves
behind its Access gate. Nothing expires these files; delete one with
`wrangler r2 object delete startech-leads/<key>` when a prospect asks.

The email's footer says whether the CRM write worked. The visitor sees an
error only when the lead reached neither the CRM nor the inbox. The schema
belongs to `st_dasboard/migrations/`; change it there, then check
`saveLead` in `worker/crm.ts`.

Two things worth changing:

- The `from` address is Resend's shared sandbox domain. Verifying
  `startech-innovation.com` in Resend would allow a real sender such as
  `website@startech-innovation.com`, which is far better for deliverability.
- The form sends to Gmail while the site publishes `info@`, so enquiries
  arrive in different places depending on how someone makes contact.

### Testimonials

`/testimonial` is where a client leaves a testimonial. It is not in the
nav and carries `noindex`; send the link, optionally prefilled:

```text
https://startech-innovation.com/testimonial?name=Michael%20Choy&company=TechTree
```

`POST /api/testimonial` saves it as a "Testimonial" note on the client's
contact in hq (found by email, created as a customer if new) and emails
the same Gmail inbox. The client picks a credit (name and company, role
and industry only, or do not publish) and agrees to see the final wording
before it goes online, so nothing is published from the form itself. A
hidden honeypot field drops bot submissions; the limit is 3 a minute.

## Outreach mail

hq (`st-dasboard`) runs the outreach campaigns, but it cannot send mail:
the Resend key is a secret of this Worker only. This Worker does the
sending side. Written 2026-11-08; nothing here sends until `OUTREACH_FROM`
is set.

| Piece | Where |
| --- | --- |
| `Mailer` RPC entrypoint for hq | `worker/mailer-entrypoint.ts` |
| Rules every outreach email must pass | `worker/outreach-rules.ts` |
| Unsubscribe page, `/u/<token>` | `worker/unsubscribe.ts` |
| Acknowledgement to website enquiries | `worker/ack.ts` |

### The Mailer entrypoint

hq binds it in its `wrangler.toml`. It is not an HTTP route: only the
default export answers requests.

```toml
[[services]]
binding = "MAILER"
service = "startech"
entrypoint = "Mailer"
```

Deploy this Worker before hq, so the entrypoint exists when hq binds it.

- `send(message)` — one outreach email from `OUTREACH_FROM`. Refused with
  `sender-not-configured` while `OUTREACH_FROM` is unset, and with
  `missing-required-footer` unless the text part (and the HTML part, if
  any) carries a `https://startech-innovation.com/u/<token>` link and the
  postal address (`1003 Bukit Merah Central`, `Singapore 159836`). That
  is what the Spam Control Act and 特定電子メール法 require. It also refuses
  an address in `outreach_suppression`, in any letter case, as a second
  check after hq's.
- `status(id)` — Resend's last event for a sent email (`delivered`,
  `bounced`, `complained`...), so hq can suppress without a webhook.
- `notifyOwner(subject, text)` — plain text to
  `rr.startech.innovation@gmail.com`, e.g. hq's weekly report. Works
  before `OUTREACH_FROM` is set, from the sandbox sender.

Every method returns `{ ok: false, error }` rather than throwing. Replies
to outreach go to the Gmail inbox unless hq sets `replyTo`, because the
sending subdomain has no mailbox.

### Unsubscribe

`GET /u/<token>` shows a confirmation and changes nothing, because mail
scanners open every link. `POST` (the page's button, or a mail provider's
RFC 8058 one-click request) adds the address to `outreach_suppression`
(reason `unsubscribe`, source the recipient id) and sets that recipient's
status to `unsubscribed`. It answers in the campaign's language (en, ja,
id). An unknown token gets a neutral 404 page. Tokens are
`[A-Za-z0-9_-]`, 16 to 128 characters; hq generates them.

Recipient rows must not be deleted while mail that links to them is
still out there: a token with no row cannot be mapped to an address, so
that click cannot suppress anything.

### Website concepts (/c/)

The website email links to `/c/<token>/?r=<unsub_token>`: the private
comparison page and the concept built for that company
(`worker/concepts.ts`). Files come from the R2 bucket `startech-concepts`
(binding `CONCEPTS`), one immutable folder per version:

```text
c/<token>/v<n>/compare/index.html   comparison page, today-*.webp
c/<token>/v<n>/site/...             concept website
c/<token>/current.json              {"version": n, "pulled": false}
```

`/c/<token>/` serves the version in `current.json`; `/c/<token>/v<n>/`
serves that version frozen (hq's "Open as sent"). Under either base,
`site/...` is the concept and any other file is the comparison page's.
`__INTEREST_HREF__` in the comparison page becomes `/i/<r>` when `r` is a
valid unsub token, otherwise `#contact`. `"pulled": true` (hq's "Pull
offline") makes every address of the concept answer a polite 410; the
files stay. Everything is `noindex` and `Cache-Control: private`, with
same-origin framing allowed so the comparison page can frame the concept.

`POST /c/<token>/view` adds a row to `web_views` (st_dasboard migration
0022). The comparison page sends it after 3 seconds visible, only from the
unversioned base, so scanners and frozen copies do not count. 30 a minute
per IP, as on `/i/`.

### Acknowledgement to enquiries

After `/api/contact` has saved a lead, the visitor gets one short reply
from `OUTREACH_FROM`, reply-to the Gmail inbox: thanks, Robert replies
within one working day, the spreadsheet arrived (if one did), nothing more
is automatic. The language is Indonesian for the Indonesia site. For
Thailand, Vietnam and Japan it is the visitor's language when the form
sends a `locale` field, or when the country site's `utm_campaign` default
(`thailand-en`) shows it; otherwise Japanese. Everything else is English.

It carries fixed copy only (nothing the visitor typed), reaches an
address at most once a day, and runs after the response. A failure is
logged and never affects the enquiry.

### Switching sending on

1. Resend dashboard → Domains → Add Domain:
   `mail.startech-innovation.com`. Pick the Tokyo region
   (`ap-northeast-1`), the closest to Singapore and Japan.
2. Resend shows three records. They go in the Cloudflare zone for
   `startech-innovation.com`, as DNS only:

   | Type | Name | Value |
   | --- | --- | --- |
   | TXT | `resend._domainkey.mail` | the DKIM key Resend shows (`p=...`) |
   | MX | `send.mail` | `feedback-smtp.ap-northeast-1.amazonses.com` |
   | TXT | `send.mail` | `v=spf1 include:amazonses.com ~all` |

   The MX record has priority 10. Copy the values from Resend's own screen
   if they differ from these. The existing `_dmarc` record (`p=none`) covers
   the subdomain; it needs
   no record of its own. An agent session can add these with
   `CLOUDFLARE_DNS_TOKEN` from `.envrc.local` (zone DNS edit; expires
   2026-11-10, after which it needs a new token or the dashboard):

   ```bash
   cd ~/Projects/startech/startech && direnv exec . bash -c '
     api=https://api.cloudflare.com/client/v4
     auth="Authorization: Bearer $CLOUDFLARE_DNS_TOKEN"
     zone=$(curl -s -H "$auth" "$api/zones?name=startech-innovation.com" |
       jq -r ".result[0].id")
     add() { curl -s -X POST -H "$auth" -H "Content-Type: application/json" \
       "$api/zones/$zone/dns_records" --data "$1" | jq -c "{success,errors}"; }
     d=startech-innovation.com
     add "{\"type\":\"TXT\",\"name\":\"resend._domainkey.mail.$d\",
       \"content\":\"<DKIM value from Resend>\"}"
     add "{\"type\":\"MX\",\"name\":\"send.mail.$d\",\"priority\":10,
       \"content\":\"feedback-smtp.ap-northeast-1.amazonses.com\"}"
     add "{\"type\":\"TXT\",\"name\":\"send.mail.$d\",
       \"content\":\"v=spf1 include:amazonses.com ~all\"}"
   '
   ```

3. Back in Resend, Verify DNS Records, and wait for Verified. Turn open
   and click tracking off for this domain: rewritten links and tracking
   pixels hurt delivery of cold mail.
4. Set the sender. A secret rather than a `[vars]` entry, so it takes
   effect without a build, and deleting it is an instant off switch:

   ```bash
   npx wrangler secret put OUTREACH_FROM
   # value: Robert Rahardja <robert@mail.startech-innovation.com>
   ```

5. Check it: send the site's contact form to your own address. The
   acknowledgement should arrive from the new sender, with `dkim=pass`
   for `mail.startech-innovation.com` in the headers.

To switch off: `npx wrangler secret delete OUTREACH_FROM`.

### Tests

```bash
npm test
```

`node --test` with no framework: `scripts/test-hooks.mjs` transpiles the
Worker's TypeScript with esbuild, and `test/fake-d1.mjs` runs the queries
as real SQL on `node:sqlite` with the outreach tables from st_dasboard's
`migrations/0007_outreach.sql`.

`npm run check:parity` compares how a running Worker answers 40 requests
(pages, `/u/`, Singpass, the API's CORS, origin, method and rate-limit
checks, and each form's validation) with a saved snapshot. Use it for a
refactor of `worker/`: snapshot the old code, then compare the new, both
on one `npm run build`. Usage and the optional CRM seed are in the header
of `scripts/check-worker-parity.mjs`.

## Singpass demo

`/singpass` explains the Singpass FAPI 2.0 deadline (31 December 2026;
Corppass 31 March 2027) and runs a working reference demo of the new flow:
PAR, PKCE (S256), DPoP-bound code and tokens, `private_key_jwt`, an ID
token signed ES256 and encrypted (`ECDH-ES+A256KW` / `A256CBC-HS512`),
and for Myinfo apps the encrypted `person_info` userinfo response.

It runs against a **mock** authorization server, not Singpass. Honesty
rules for the page: we have not yet done a Singpass migration for a
client and are not a Singpass or GovTech partner.

Where the code lives:

- `src/lib/singpass/jose.ts` — JWS, JWE, JWK thumbprints on WebCrypto.
  Shared by the page and the Worker. Cross-checked against `jose` 5.9.
- `src/lib/singpass/client.ts` — the relying-party client. Everything
  environment-specific is in `SingpassClientConfig`.
- `src/components/singpass/` — the page's demo runner and UI.
- `worker/singpass-demo.ts` — the mock server under
  `/api/demo/singpass/*`, mirroring Singpass paths under `fapi/`. Its
  `register` and JSON `fapi/auth` + `decision` endpoints exist only because
  there is no real login page; nothing uses them against Singpass.
- `worker/singpass-rp.ts` and `scripts/singpass-keys.mjs` — the real
  staging relying party and its key generator (next section).

The mock keeps state in the `RATE_LIMIT` KV namespace with relative TTLs:
registrations 15 minutes, `request_uri` and codes 60 seconds, seen `jti`
values 2 minutes, its own signing key one day. Every route is rate limited
per IP. A full run is about 17 KV writes, counting the rate limiter.

### Singpass staging (real relying party)

`worker/singpass-rp.ts` runs the same `SingpassClient` server-side, as
StarTech's own staging Login app on the
[Singpass Developer Portal](https://developer.singpass.gov.sg). It is off
until switched on, and the mock stays the default demo. When on, `/singpass`
shows a "Log in with Singpass (staging)" button. Only Singpass staging
test accounts can log in (portal: "Create Staging Test Account").

Values for the portal (Login app, staging):

| Field        | Value                                                   |
| ------------ | ------------------------------------------------------- |
| Redirect URL | `https://startech-innovation.com/singpass/callback`     |
| JWKS URL     | `https://startech-innovation.com/.well-known/jwks.json` |
| Scopes       | `openid` and `user.identity` (User Identity) only       |

The portal rejects domains containing "singpass"; paths are fine.
`authentication_context_type` is sent as `APP_AUTHENTICATION_DEFAULT`.

Keys: one ES256 signing key (for `private_key_jwt`) and one
`ECDH-ES+A256KW` encryption key (FAPI 2.0 ID tokens are always
encrypted), both P-256, both Worker secrets. The script prints a private
JWK to stdout only, so it never lands on disk:

```bash
node scripts/singpass-keys.mjs sig | npx wrangler secret put SINGPASS_SIG_PRIVATE_JWK
node scripts/singpass-keys.mjs enc | npx wrangler secret put SINGPASS_ENC_PRIVATE_JWK
```

The JWKS URL returns 404 until both secrets are set, then serves only the
public halves (no `d`). It is live in every mode, because the portal reads
it before the app is switched on. After setting the secrets and deploying:

```bash
curl -s https://startech-innovation.com/.well-known/jwks.json
```

To switch on, in `wrangler.toml` `[vars]`: set `SINGPASS_CLIENT_ID` to the
App ID and `SINGPASS_MODE = "staging"`, then deploy. `SINGPASS_ISSUER` is
`https://stg-id.singpass.gov.sg/fapi`; production would be
`https://id.singpass.gov.sg/fapi`. Setting `SINGPASS_MODE` back to `"mock"`
hides the button.

How a staging login runs: `GET /api/demo/singpass/staging/login` makes
the PAR call and keeps that login's state, nonce, PKCE verifier and DPoP
key in KV for 10 minutes. It also pins the state to the browser in an
HttpOnly cookie, then redirects to Singpass. `/singpass/callback` checks
state and cookie, exchanges the code, and decrypts and verifies the ID
token. It then redirects to `/singpass?staging=<id>`, and the page reads
the claims once from `/api/demo/singpass/staging/result`. Singpass's
discovery document and JWKS are cached per isolate for an hour.

To rotate a key, generate a new one (each kid is new), put the secret and
deploy; Singpass refetches the JWKS. Before any production use, the button
must follow Singpass's button design specification (in force from
1 September 2026); the staging button is a plain test control.

Local testing: `wrangler dev` rewrites `request.url` to the custom domain,
so run it with `--local-upstream 127.0.0.1:8787 --upstream-protocol http`
or the mock's issuer will not match the page's origin. The Worker still
refuses localhost origins in production mode; in Playwright, replay
`/api/**` with `route.fetch` and an `origin` header, because Chromium
ignores an Origin override on `route.continue`.

## AI chat — currently disabled

Disabled in production on 2026-09-02. OpenAI returns **429 on every request**,
consistently rather than in bursts, which indicates exhausted quota or a
billing cap rather than throttling. The Worker mapped any OpenAI failure to a
generic 502, so visitors saw the panel open and then fail with no explanation.

The code is gated, not deleted:

- Front end: `src/lib/features.ts` reads `VITE_ENABLE_AI_CHAT`; absent is off.
- Worker: `/api/chat` and `/api/tts` return 503 unless the `ENABLE_AI_CHAT`
  secret is `"true"`.

To diagnose the account, `200` means the key is valid and the problem is
quota; `401` means the key needs rotating:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

To re-enable once fixed — test on a preview URL first:

```bash
VITE_ENABLE_AI_CHAT=true npm run build
npx wrangler secret put ENABLE_AI_CHAT   # value: true
npx wrangler versions upload
```

## Languages

The site ships in seven: English (unprefixed), plus `/ja/`, `/ko/`,
`/zh-Hans/`, `/zh-Hant/`, `/es/` and `/pt/`.

**The six translations have not had a native review.** Every catalogue file
says so in its header. Get them reviewed before advertising a locale.

`/solutions/*` is still English only — 219 strings in
`src/components/solutions/solutionsData.ts`, which is a flat array with the
copy baked in and no place for translations to live. Translating it means
restructuring that file and its four consumers first.

### Where the strings live

`src/i18n/en.ts` is the source of truth and defines `Messages`, the shape
every other catalogue must satisfy. It is deliberately not `as const`:
literal types would force each translation to equal the English string.

### Checks

```bash
npm run check:i18n        # locales + untranslated; no server needed
npm run check:rendered    # needs a server; see below
```

Three guards, each catching what the others cannot:

- `check:locales` — wrong scripts in a catalogue. Written after Cyrillic
  twice reached the Japanese file; that survives a build, a typecheck and a
  screenshot review by anyone who does not read the language.
- `check:untranslated` — values still identical to English.
- `check:rendered` — loads each locale in a browser and diffs the visible
  text against the English catalogue. The other two read the catalogues, so
  they are blind to a component that renders an English literal without
  going through them — which is how the contact form, the case-study
  headings, "Ask us" and every footer link shipped untranslated.

`check:rendered` needs a running server, so it is not part of `check:i18n`:

```bash
npm run build && npm run preview -- --port 4321 &
npm run check:rendered
BASE=https://startech-innovation.com npm run check:rendered   # or any deploy
```

It drives the Chromium already in `~/.cache/ms-playwright`; override with
`CHROME_PATH`.

### lang and hreflang

The app is an SPA — one `index.html` answers every route — so React could
only set these after boot, and crawlers read the markup as delivered. The
Worker now rewrites `<html lang>` and appends the alternates with
`HTMLRewriter` as the response streams (`withLocaleMarkup` in
`worker/locale-markup.ts`). Verify after any deploy:

```bash
curl -s https://startech-innovation.com/ja/ | grep -oP '(?<=<html lang=")[^"]*'
curl -s https://startech-innovation.com/ja/ | grep -c 'rel="alternate"'   # 8
```

## Design and performance

Decisions here were measured, not estimated. Each records the number so a
future change can tell whether it is an improvement or a regression.

### Contrast on the dark palette

The brand ground is true black, sampled from the printed business card. That
makes contrast the thing most easily got wrong: separations that read fine on
a calibrated monitor in a dark room vanish on a phone at reduced brightness
or outdoors. Both problems below were reported from a real phone after
passing desktop review.

Two rules hold the palette together:

- **Borders carry every boundary.** A fill this dark cannot reach the 3:1 a
  UI boundary needs (WCAG 1.4.11) without ceasing to be the brand colour, so
  the border does the work. `--color-st-border` is `#595966` (3.05:1) and
  `--color-st-field` is `#6b6b7a` (4.01:1). Card fills sit at 1.11-1.17:1 —
  enough to register as a distinct surface, never relied on as an edge.
- **Do not fade text below 80%.** `--color-st-text-muted` passes AA on its
  own, but it is used at `/40` through `/90` in about 29 places. Below 80%
  those land at 2.1-3.8:1. The token was raised to `#c2c2cc` so the common
  `/60` and `/70` fades clear 4.5:1; anything deeper is for decorative
  separators only, never copy.

The deep brand blue `#0a68f9` measures 3.73:1 as text and must not be used
for it — `st-blue-light` (5.69:1) is the text colour. The deep blue stays for
fills, borders and gradients, where contrast rules do not apply.

**Measure from painted pixels, not computed styles.** `getComputedStyle`
returns `oklab()` for these colours, and parsing that by hand produced wildly
wrong numbers several times. Screenshot the element and read the pixels.

### Mobile type

The scale was set at desktop, where 10-13px labels read as fine detail. On a
phone the same values are simply small: 144 of 178 text elements measured
under 16px, the largest group at 10px.

A `max-width: 767px` block at the end of `src/index.css` maps each small step
up to the next size on the existing scale. Scaling there rather than editing
325 hardcoded utilities keeps the desktop composition untouched and moves the
whole hierarchy together. The mobile floor is 12px.

Anything sized in `ch` tracks this automatically; anything in `px` does not.

### Bundle

Two things kept the entry bundle at 428KB, both fixed by how they are
imported. Keep them that way:

- **Routes are lazy.** `SolutionsIndex`, `SolutionPage` and the chat panel
  are `React.lazy` in `App.tsx`. Static-importing any of them puts every
  solution page back in the first download. The homepage stays in the main
  chunk deliberately — nearly every visitor sees it first.
- **Only the active locale loads.** `src/i18n/index.tsx` exposes
  `loadCatalogue()`, called in `main.tsx` before the first render. The locale
  is known from the URL at startup, so there is no loading state and no flash
  of English. English stays static so the app can always render without a
  network round trip, and a failed chunk degrades to English rather than a
  blank page.

Result: 428KB -> 264KB raw, 147KB -> 89KB over the wire, first paint
1279ms -> 1100ms on a throttled phone.

### Fonts

Self-hosted from `public/fonts/`, with `@font-face` at the top of
`src/index.css`. Only the Latin subsets ship, which is all the site used;
Inter is variable, so one file covers weights 300-600.

This is **not** a speed optimisation — measured at 995ms against 989ms for
Google Fonts over 11 runs. It is for independence from a third party, no font
requests leaving the origin, and a CSP that no longer needs
`fonts.googleapis.com` or `fonts.gstatic.com`.

**Do not add `<link rel="preload">` for them.** It was tried: 62KB of woff2
on the critical path competed with the JS bundle and pushed first paint from
989ms to 1390ms. `font-display: swap` already shows text immediately in the
fallback face.

The Worker gives `/fonts/` a one-year immutable cache, since these filenames
are not content-hashed the way the bundle's are.

### Measuring any of this

There is no perf script in the repo; these were one-off measurements with
Playwright driving the Chromium already in `~/.cache/ms-playwright`. Two
things that repeatedly produced wrong conclusions:

- **Take a median of several runs.** A single throttled run once showed a
  20% improvement as a 70% regression.
- **Measure a real deployment, not `vite preview`.** Preview served the dev
  server, whose module graph looks nothing like the built bundle.

## Deploying

Credentials are per-project on purpose. Several Cloudflare accounts exist on
this machine, and `~/bin/direnv-deploy-gate` blocks any deploy command unless
this directory carries its own scoped token — an ambient `wrangler login`
could otherwise push this Worker into another company's account.

Two files, both gitignored:

- `.envrc.local` — `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, loaded
  by direnv in an interactive shell. Copy `.envrc.local.example`.
- `.env` — the same two values. Wrangler reads it from the working directory,
  and it is what satisfies the gate in non-interactive sessions, which never
  inherit the direnv hook.

The API token needs Workers Scripts Write, Workers KV Storage Write, D1 Write,
and Workers Routes Write, scoped to this account and this zone.

### Preview before production

`preview_urls = true` in `wrangler.toml` gives every uploaded version its own
URL, so a build can be reviewed before it serves any real traffic.

```bash
npm run build
npx wrangler versions upload          # prints a Version ID
# open https://<first-8-of-version-id>-startech.rr-startech-innovation.workers.dev
```

Preview URLs required `previews_enabled` on the Worker, which is on. Note that
production `workers.dev` is deliberately **off**: the site should answer on its
own domain only.

### Promote to production

```bash
npx wrangler versions deploy <version-id>@100% --yes
```

### Roll back

```bash
npx wrangler rollback
npx wrangler deployments list    # to pick a specific earlier version
```

## Secrets on the Worker

Set, and not stored in the repository:

- `OPENAI_API_KEY` — chat and the AI demos
- `ELEVENLABS_API_KEY` — text to speech
- `RESEND_API_KEY` — the contact form
- `RESEND_API_KEY_2` and `OUTREACH_FROM_2` — the second outreach domain
  (sending access to outreach.startech-innovation.com only)

Needed, not set yet (10 Nov 2026):

- `RESEND_STATUS_KEY` — a Resend key with full access, used only to read
  delivery events for hq (bounces, complaints). Both sending keys are
  "sending access" and Resend refuses their reads (`restricted_api_key`).
  Create it in Resend (API Keys, Full access) and set it from your own
  terminal so the key never lands in a chat: `npx wrangler secret put
  RESEND_STATUS_KEY`.

Not set yet:

- `OUTREACH_FROM` — the outreach and acknowledgement sender; see
  [Switching sending on](#switching-sending-on)

```bash
npx wrangler secret list
npx wrangler secret put <NAME>
```
