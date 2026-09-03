# startech

The StarTech Innovation website — [startech-innovation.com](https://startech-innovation.com).

React and TanStack-flavoured Vite on the front end, a Cloudflare Worker
serving it with `[assets]` and handling the API routes.

## Documentation

- **[docs/OPERATIONS.md](docs/OPERATIONS.md)** — where the site is hosted,
  which mailbox actually receives mail, how to deploy and roll back, and the
  outstanding DNS problems. Read this first when returning to the project.
- [SETUP.md](SETUP.md) — original contact-form setup notes.
- [brand/guidelines/brand-guidelines.md](brand/guidelines/brand-guidelines.md)
  — colour, type and logo rules.

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
```

## Deploying

Deploys are gated on per-project credentials — see
[docs/OPERATIONS.md](docs/OPERATIONS.md#deploying). In short:

```bash
npm run build
npx wrangler versions upload                      # review on the preview URL
npx wrangler versions deploy <version-id>@100% --yes
```
