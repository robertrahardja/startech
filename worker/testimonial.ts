import { saveLead } from "./crm";
import type { Env } from "./env";
import { isRequestTooLarge } from "./http";
import { countryName } from "./lead";
import { escapeHtml, sanitizeEmail, sanitizeString } from "./sanitize";

/** How a client lets us credit their testimonial. */
const TESTIMONIAL_CREDITS = {
  full: "Name, role and company may be shown",
  anonymous: "Show role and industry only, no name or company",
  private: "Feedback only, do not publish",
} as const;

/**
 * POST /api/testimonial — a client's testimonial from /testimonial.
 *
 * Saved as a "Testimonial" note on the client's contact in hq (found by
 * email, created as a customer if new) and emailed to StarTech. Nothing is
 * published automatically: the client agreed to see the final wording first.
 */
export async function handleTestimonial(request: Request, env: Env): Promise<Response> {
  const json = (status: number, body: object) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  if (isRequestTooLarge(request, 16 * 1024)) {
    return json(413, { success: false, error: "Request too large." });
  }
  if (request.headers.get("X-Requested-With") !== "XMLHttpRequest") {
    return json(403, { success: false, error: "Invalid request." });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { success: false, error: "Invalid request body." });
  }
  if (!body || typeof body !== "object") {
    return json(400, { success: false, error: "Invalid request body." });
  }

  // Honeypot: a field people never see. Bots fill it; pretend it worked.
  if (typeof body.website === "string" && body.website !== "") {
    return json(200, { success: true });
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const oneLine = (v: unknown, max: number) =>
    sanitizeString(str(v), max).replace(/[\r\n]/g, " ");
  const name = oneLine(body.name, 200);
  const role = oneLine(body.role, 120);
  const company = oneLine(body.company, 200);
  const email = sanitizeEmail(str(body.email));
  const quote = sanitizeString(str(body.quote), 1500);
  const credit = typeof body.credit === "string" && body.credit in TESTIMONIAL_CREDITS
    ? (body.credit as keyof typeof TESTIMONIAL_CREDITS)
    : null;

  if (!name || !role || !company || !email || quote.length < 20 || !credit) {
    return json(400, { success: false, error: "Please fill in every field." });
  }
  if (body.consent !== true) {
    return json(400, { success: false, error: "Please tick the agreement box." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { success: false, error: "Invalid email address." });
  }

  const details = [
    `Role: ${role}`,
    `Credit: ${TESTIMONIAL_CREDITS[credit]}`,
    "Agreed: StarTech may shorten it, and shows the final wording before publishing.",
  ].join("\n");

  let saved = false;
  if (env.CRM_DB) {
    try {
      await saveLead(env.CRM_DB, {
        name, email, phone: "", company,
        message: `"${quote}"\n\n${details}`,
        country: countryName(request.cf?.country),
        staff: "", utmSource: "", utmMedium: "", utmCampaign: "",
        spreadsheetKey: null,
        subject: "Testimonial",
        status: "customer",
      });
      saved = true;
    } catch (err) {
      console.error("CRM write failed:", err instanceof Error ? err.message : err);
    }
  }

  let emailed = false;
  if (env.RESEND_API_KEY) {
    const crmLine = saved ? "Saved to the CRM." : "NOT saved to the CRM. Add it by hand.";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "StarTech Website <onboarding@resend.dev>",
        to: ["rr.startech.innovation@gmail.com"],
        reply_to: email,
        subject: `Testimonial: ${escapeHtml(name).slice(0, 80)}, ${escapeHtml(company).slice(0, 80)}`,
        html: `
          <h2>New testimonial</h2>
          <p><strong>${escapeHtml(name)}</strong>, ${escapeHtml(role)}, ${escapeHtml(company)}</p>
          <blockquote>${escapeHtml(quote).replace(/\n/g, "<br>")}</blockquote>
          <p>${escapeHtml(details).replace(/\n/g, "<br>")}</p>
          <hr><p><small>Sent from startech-innovation.com/testimonial. ${crmLine}</small></p>
        `,
        text: `${name}, ${role}, ${company}\n\n"${quote}"\n\n${details}\n\n${crmLine}`,
      }),
    });
    emailed = res.ok;
    if (!emailed) console.error("Resend error:", res.status);
  }

  if (!saved && !emailed) {
    return json(502, { success: false, error: "Could not send. Please try again later." });
  }
  return json(200, { success: true });
}
