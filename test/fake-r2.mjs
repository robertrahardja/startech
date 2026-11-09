// An R2 bucket backed by a Map of key to string, with the calls the Worker
// makes (worker/concepts.ts reads; nothing in the site Worker writes).

export function fakeR2(files = {}) {
  const store = new Map(Object.entries(files));
  const object = (value) => ({
    get body() {
      return new Response(value).body;
    },
    text: async () => value,
    json: async () => JSON.parse(value),
  });
  return {
    store,
    get: async (key) => (store.has(key) ? object(store.get(key)) : null),
  };
}

/** The files of one uploaded concept: v1 and v2, the pointer on v2. */
export const CONCEPT = "Zq3vK8pL2mN7xR4tW9yB1c"; // 22 characters, as hq's builder makes them

const COMPARE_V1 = `<!doctype html><html><head><meta name="robots" content="noindex, nofollow"></head>
<body><iframe src="site/"></iframe><img src="today-phone.webp"><a class="btn" href="__INTEREST_HREF__">I am interested</a> v1</body></html>`;

export const conceptFiles = () => ({
  [`c/${CONCEPT}/current.json`]: JSON.stringify({ version: 2, pulled: false }),
  [`c/${CONCEPT}/v1/compare/index.html`]: COMPARE_V1,
  [`c/${CONCEPT}/v1/site/index.html`]: "<!doctype html><title>Concept v1</title>",
  [`c/${CONCEPT}/v2/compare/index.html`]: COMPARE_V1.replace(" v1<", " v2<"),
  [`c/${CONCEPT}/v2/compare/today-phone.webp`]: "RIFF-phone",
  [`c/${CONCEPT}/v2/site/index.html`]: "<!doctype html><title>Concept v2</title>",
  [`c/${CONCEPT}/v2/site/hero-0.webp`]: "RIFF-hero",
  [`c/${CONCEPT}/v2/site/logo.svg`]: "<svg xmlns='http://www.w3.org/2000/svg'><script>alert(1)</script></svg>",
  [`c/${CONCEPT}/v2/site/about/index.html`]: "<!doctype html><title>About</title>",
});
