// Lets `node --test` import the Worker's TypeScript directly, with no test
// framework to install. It does what wrangler's bundler normally does:
//
// - relative imports written without a file extension get ".ts";
// - .ts files are transpiled with esbuild (already a devDependency), because
//   Node's own type stripping refuses syntax the Worker uses, such as the
//   parameter properties in worker/singpass-demo.ts;
// - `cloudflare:workers`, which only exists inside workerd, becomes a stub
//   that is just enough to construct an entrypoint class in a test.
import { existsSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";

const HAS_EXTENSION = /\.[cm]?[jt]sx?$/;

const CLOUDFLARE_WORKERS_STUB =
  "data:text/javascript," +
  encodeURIComponent(
    "export class WorkerEntrypoint { constructor(ctx, env) { this.ctx = ctx; this.env = env; } }"
  );

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "cloudflare:workers") {
      return nextResolve(CLOUDFLARE_WORKERS_STUB, context);
    }
    if (specifier.startsWith(".") && !HAS_EXTENSION.test(specifier)) {
      const candidate = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(candidate)) return nextResolve(candidate.href, context);
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (!url.startsWith("file:") || !url.endsWith(".ts")) return nextLoad(url, context);
    const path = fileURLToPath(url);
    const { code } = transformSync(readFileSync(path, "utf8"), {
      loader: "ts",
      format: "esm",
      target: "es2022",
      sourcefile: path,
      sourcemap: "inline",
    });
    return { format: "module", source: code, shortCircuit: true };
  },
});
