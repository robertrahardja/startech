/**
 * c/<token>/current.json in the CONCEPTS bucket: which version the
 * company's link /c/<token>/ shows, and whether Robert has pulled it
 * offline ("pulled": true, written by hq's "Pull offline").
 */

export interface Pointer {
  version: number;
  pulled: boolean;
}

const pointerKey = (token: string) => `c/${token}/current.json`;

/**
 * current.json, or null when the token has none. Only an explicit
 * "pulled": false shows the concept: a pointer written without it fails
 * closed, because a page shown by mistake cannot be unsent.
 */
export async function readPointer(bucket: R2Bucket, token: string): Promise<Pointer | null> {
  const object = await bucket.get(pointerKey(token));
  if (!object) return null;
  const data = (await object.json()) as Partial<Pointer> | null;
  const version = data?.version;
  if (typeof version !== "number" || !Number.isInteger(version) || version < 1) return null;
  return { version, pulled: data?.pulled !== false };
}
