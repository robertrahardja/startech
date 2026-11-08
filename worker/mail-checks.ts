/**
 * Input checks for everything the Mailer entrypoint passes on to Resend.
 * Values arrive over RPC from hq, so nothing is trusted because of its
 * TypeScript type: each check takes `unknown`.
 */

/**
 * One bare address, at most 254 characters: no display name, no second
 * recipient, nothing that could end a header line.
 */
const ADDRESS =
  /^(?=.{3,254}$)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z0-9-]{2,63}$/;

/**
 * At least one character and none that can break a header line: C0 and C1
 * controls (CR, LF, NEL among them) and the Unicode line separators.
 */
const ONE_LINE = /^[^\x00-\x1F\x7F-\x9F\u2028\u2029]+$/;

/** Something other than whitespace, and no NUL bytes. */
const BODY = /^(?=[\s\S]*\S)[^\0]*$/;

/** Resend's rule for tag names and values. */
const TAG_PART = /^[A-Za-z0-9_-]{1,256}$/;

/**
 * Headers hq may set, in the casing they are sent with. Anything else
 * (From, To, Bcc, Reply-To, Sender, Return-Path...) is refused rather than
 * passed through.
 */
const PASS_HEADERS = new Map(
  ["List-Unsubscribe", "List-Unsubscribe-Post", "List-Id", "In-Reply-To", "References", "X-Entity-Ref-ID"].map(
    (name) => [name.toLowerCase(), name]
  )
);

export function isAddress(value: unknown): value is string {
  return typeof value === "string" && ADDRESS.test(value);
}

/** A header-safe single line of at most `max` characters, e.g. a subject. */
export function isOneLine(value: unknown, max: number): value is string {
  return typeof value === "string" && value.length <= max && ONE_LINE.test(value);
}

/** A message body of at most `max` characters. Line breaks are fine here. */
export function isBody(value: unknown, max: number): value is string {
  return typeof value === "string" && value.length <= max && BODY.test(value);
}

/**
 * The headers to send, renamed to their canonical casing, or null when any
 * name is not allowed or any value is not a safe single line.
 */
export function passHeaders(value: unknown): Record<string, string> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const headers: Record<string, string> = {};
  for (const [name, text] of Object.entries(value)) {
    const canonical = PASS_HEADERS.get(name.toLowerCase());
    if (!canonical || !isOneLine(text, 900)) return null;
    headers[canonical] = text;
  }
  return headers;
}

const isTagPart = (value: unknown) => typeof value === "string" && TAG_PART.test(value);

/** At most ten `{ name, value }` tags in Resend's character set. */
export function areTags(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.length <= 10 &&
    value.every((tag: { name?: unknown; value?: unknown } | null) => isTagPart(tag?.name) && isTagPart(tag?.value))
  );
}
