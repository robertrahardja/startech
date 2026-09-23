import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Renders the app shell to an HTML string for the homepage only, at build
 * time — see scripts/prerender.mjs, which calls this against the SSR build
 * of this file and writes the result into dist/index.html.
 *
 * "/" is the only pathname this is ever called with: useCurrentPage() (via
 * lib/router's usePathname) falls back to "/" when window is undefined,
 * which resolves to page.type === "home" — the one route worth prerendering.
 * Every other route (solutions, individual solution pages) stays purely
 * client-rendered, same as before.
 */
export function render(): string {
  return renderToString(<App />);
}
