/** A lead as the CRM note and the notification email describe it. */

export interface Lead {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  country: string | null;
  /** Company size band from the flyer form; "" when not asked. */
  staff: string;
  /** utm_source from the URL the visitor arrived on, or "" when untagged. */
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  /** R2 key of the spreadsheet the visitor attached, if any. */
  spreadsheetKey: string | null;
  /** Activity subject in hq; defaults to "Website enquiry". */
  subject?: string;
  /** Status for a contact created by this write; defaults to "lead". */
  status?: "lead" | "customer";
}

/**
 * Where hq serves an attached spreadsheet from. The R2 key itself is
 * private; this URL sits behind hq's Cloudflare Access gate.
 */
const HQ_FILE_URL = "https://hq.startech-innovation.com/api/leads/files/";

/** The lines hq and the notification email both show under the message. */
export function leadTrail(lead: Lead): string {
  const lines: string[] = [];
  const utm = [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean);
  if (utm.length) lines.push(`Source: ${utm.join(" / ")}`);
  if (lead.staff) lines.push(`Staff: ${lead.staff}`);
  if (lead.spreadsheetKey) lines.push(`Spreadsheet: ${HQ_FILE_URL}${lead.spreadsheetKey}`);
  return lines.join("\n");
}

/** "SG" → "Singapore", matching how the CRM stores country names. */
export function countryName(code: unknown): string | null {
  if (typeof code !== "string") return null;
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? null;
  } catch {
    return null; // Cloudflare's "T1" (Tor) and other non-region codes
  }
}
