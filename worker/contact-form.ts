/**
 * Reading /api/contact's form: its fields from either encoding, the utm
 * tags, and the spreadsheet the flyer form may attach (stored in R2).
 */

/** Spreadsheet types the flyer form accepts, by extension. */
const SPREADSHEET_EXTENSIONS = new Set(["xlsx", "xls", "xlsm", "csv", "ods", "numbers", "tsv"]);
const SPREADSHEET_MAX_BYTES = 10 * 1024 * 1024;
/** Multipart overhead on top of the file plus the text fields. */
export const CONTACT_MAX_BYTES = SPREADSHEET_MAX_BYTES + 64 * 1024;

/** utm values: lowercase, and only what a tracking tag legitimately contains. */
export function sanitizeUtm(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 100);
}

interface ContactFields {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  country: string;
  staff: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  /** Which page's form sent it, e.g. "singpass". */
  topic: string;
  /** The language the visitor used, when the site sends it ("ja", "en"). */
  locale: string;
  file: File | null;
}

/**
 * Reads the form from either encoding. The homepage form sends JSON; the
 * flyer form sends multipart when a spreadsheet is attached.
 */
export async function readContactFields(request: Request): Promise<ContactFields | null> {
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const type = request.headers.get("Content-Type") ?? "";

  if (type.startsWith("multipart/form-data")) {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return null;
    }
    const file = form.get("spreadsheet");
    return {
      name: str(form.get("name")),
      email: str(form.get("email")),
      phone: str(form.get("phone")),
      company: str(form.get("company")),
      message: str(form.get("message")),
      country: str(form.get("country")),
      staff: str(form.get("staff")),
      utm_source: str(form.get("utm_source")),
      utm_medium: str(form.get("utm_medium")),
      utm_campaign: str(form.get("utm_campaign")),
      topic: str(form.get("topic")),
      locale: str(form.get("locale")),
      file: file instanceof File && file.size > 0 ? file : null,
    };
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return null;
  }
  if (!body || typeof body !== "object") return null;
  return {
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone),
    company: str(body.company),
    message: str(body.message),
    country: str(body.country),
    staff: str(body.staff),
    utm_source: str(body.utm_source),
    utm_medium: str(body.utm_medium),
    utm_campaign: str(body.utm_campaign),
    topic: str(body.topic),
    locale: str(body.locale),
    file: null,
  };
}

/**
 * Stores the attached spreadsheet under a key nobody can guess from the
 * filename alone. Returns the key, or an error message for the visitor.
 */
export async function storeSpreadsheet(
  bucket: R2Bucket | undefined,
  file: File,
  email: string
): Promise<{ key: string } | { error: string }> {
  const ext = file.name.toLowerCase().split(".").pop() ?? "";
  if (!SPREADSHEET_EXTENSIONS.has(ext)) {
    return { error: "Please attach a spreadsheet (.xlsx, .xls, .csv, .ods or .numbers)." };
  }
  if (file.size > SPREADSHEET_MAX_BYTES) {
    return { error: "The spreadsheet is over 10 MB. Please send a smaller extract." };
  }
  if (!bucket) {
    return { error: "File uploads are not available right now. Please send the form without the file." };
  }
  const safeName = file.name.replace(/[^A-Za-z0-9._-]+/g, "_").slice(-80) || `upload.${ext}`;
  const day = new Date().toISOString().slice(0, 10);
  const key = `${day}/${crypto.randomUUID()}/${safeName}`;
  await bucket.put(key, file.stream(), {
    httpMetadata: { contentType: file.type || "application/octet-stream" },
    customMetadata: { email, originalName: file.name.slice(0, 200) },
  });
  return { key };
}
