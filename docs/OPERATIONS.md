# Operations

Where this site lives, how mail reaches you, and how to deploy it.
Written 2026-09-02. Verified against the live services on that date.

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

`POST /api/contact` → the Worker → [Resend](https://resend.com) → an email.

| | |
| --- | --- |
| To | `rr.startech.innovation@gmail.com` |
| From | `StarTech Website <onboarding@resend.dev>` |
| Reply-To | the visitor's address |

**Nothing is stored.** No database write — if the email fails or is filtered,
that lead is gone. The D1 database is used by the demo endpoints, not by this
form.

Two things worth changing:

- The `from` address is Resend's shared sandbox domain. Verifying
  `startech-innovation.com` in Resend would allow a real sender such as
  `website@startech-innovation.com`, which is far better for deliverability.
- The form sends to Gmail while the site publishes `info@`, so enquiries
  arrive in different places depending on how someone makes contact.

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
`worker/index.ts`). Verify after any deploy:

```bash
curl -s https://startech-innovation.com/ja/ | grep -oP '(?<=<html lang=")[^"]*'
curl -s https://startech-innovation.com/ja/ | grep -c 'rel="alternate"'   # 8
```

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

```bash
npx wrangler secret list
npx wrangler secret put <NAME>
```
