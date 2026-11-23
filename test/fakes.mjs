// Fakes for the Worker tests: a KV namespace, a fetch that records each
// call, a console.error that collects what was logged, and a valid outreach
// message. The D1 fake is in fake-d1.mjs.

/** An in-memory KV namespace with the calls the Worker makes. */
export function fakeKV() {
  const store = new Map();
  return {
    store,
    get: async (key) => store.get(key)?.value ?? null,
    getWithMetadata: async (key) => ({
      value: store.get(key)?.value ?? null,
      metadata: store.get(key)?.metadata ?? null,
    }),
    put: async (key, value, options = {}) => {
      store.set(key, { value, metadata: options.metadata ?? null });
    },
  };
}

const realFetch = globalThis.fetch;
const realConsoleError = console.error;

/**
 * Replaces fetch. `respond(url, init, index)` answers each call; the
 * returned list records every call with its JSON body parsed.
 */
export function fakeFetch(respond = () => Response.json({ id: "email_1" })) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    const call = {
      url: String(url),
      method: init.method ?? "GET",
      headers: new Headers(init.headers),
      body: typeof init.body === "string" ? JSON.parse(init.body) : undefined,
    };
    calls.push(call);
    return respond(call, calls.length - 1);
  };
  return calls;
}

/** Collects console.error output instead of printing it. */
export function captureErrors() {
  const logged = [];
  console.error = (...args) => logged.push(args.join(" "));
  return logged;
}

/** Puts the real fetch and console.error back. */
export function restoreGlobals() {
  globalThis.fetch = realFetch;
  console.error = realConsoleError;
}

/** An unsub_token in the shape hq generates. */
export const TOKEN = "tok_9fJ2kQ7xLmP4vR8sT1wY6zB3";

/** The footer every outreach email must carry: the link and the postal address. */
const FOOTER = [
  "--",
  "StarTech Innovation Pte Ltd, 1003 Bukit Merah Central #06-07, Singapore 159836",
  `To stop these emails: https://startech-innovation.com/u/${TOKEN}`,
].join("\n");

/** A valid outreach message from hq. */
export function outreachMessage(overrides = {}) {
  return {
    to: "info@example.co.jp",
    subject: "A question about your stock list",
    text: `Hello,\n\nA short question about how you track stock.\n\n${FOOTER}`,
    ...overrides,
  };
}
