/**
 * POST /api/contact: saves the lead to the CRM, then emails it via Resend.
 * JSON from the homepage form; multipart from /flyer when a spreadsheet is
 * attached (stored in R2). utm_* fields become the contact's source in hq.
 */

import { acknowledgeEnquiry } from "./ack";
import { CONTACT_MAX_BYTES, readContactFields, sanitizeUtm, storeSpreadsheet } from "./contact-form";
import { saveLead } from "./crm";
import type { Env } from "./env";
import { isRequestTooLarge } from "./http";
import { countryName, leadTrail, type Lead } from "./lead";
import { escapeHtml, sanitizeEmail, sanitizeString } from "./sanitize";

export async function handleContact(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  if (isRequestTooLarge(request, CONTACT_MAX_BYTES)) {
    return new Response(
      JSON.stringify({ success: false, error: "Request too large." }),
      { status: 413, headers: { "Content-Type": "application/json" } }
    );
  }

  // CSRF check: require custom header
  if (request.headers.get("X-Requested-With") !== "XMLHttpRequest") {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid request." }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await readContactFields(request);
  if (!body) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const name = sanitizeString(body.name, 200);
  const email = sanitizeEmail(body.email);
  const phone = sanitizeString(body.phone, 30).replace(/[\r\n]/g, "");
  const company = sanitizeString(body.company, 200).replace(/[\r\n]/g, "");
  const message = sanitizeString(body.message, 5000);
  const formCountry = sanitizeString(body.country, 100).replace(/[\r\n]/g, "");
  const staff = sanitizeString(body.staff, 40).replace(/[\r\n]/g, "");
  const utmSource = sanitizeUtm(body.utm_source);
  const utmMedium = sanitizeUtm(body.utm_medium);
  const utmCampaign = sanitizeUtm(body.utm_campaign);
  // Which page's form it came from; only known topics change the subject.
  const TOPIC_SUBJECTS: Record<string, string> = {
    singpass: "Singpass check",
    indonesia: "Indonesia site enquiry",
    malaysia: "Malaysia site enquiry",
    philippines: "Philippines site enquiry",
    thailand: "Thailand site enquiry",
    vietnam: "Vietnam site enquiry",
  };
  const topic = TOPIC_SUBJECTS[body.topic] ?? null;

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ success: false, error: "Name, email, and message are required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Strict email validation — no newlines, proper format
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid email address." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // The file goes up before anything else: a rejected file is the visitor's
  // problem to fix, so it has to be reported before the lead is recorded.
  let spreadsheetKey: string | null = null;
  if (body.file) {
    const stored = await storeSpreadsheet(env.LEADS, body.file, email);
    if ("error" in stored) {
      return new Response(
        JSON.stringify({ success: false, error: stored.error }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    spreadsheetKey = stored.key;
  }

  const lead: Lead = {
    name, email, phone, company, message, staff,
    utmSource, utmMedium, utmCampaign, spreadsheetKey,
    ...(topic ? { subject: topic } : {}),
    // What the visitor typed beats where the request came from.
    country: formCountry || countryName(request.cf?.country),
  };

  let saved = false;
  if (env.CRM_DB) {
    try {
      await saveLead(env.CRM_DB, lead);
      saved = true;
    } catch (err) {
      console.error("CRM write failed:", err instanceof Error ? err.message : err);
    }
  }
  const trail = leadTrail(lead);

  const crmLine = saved
    ? "Saved to the CRM."
    : "NOT saved to the CRM. Add this lead by hand.";

  let emailed = false;
  if (env.RESEND_API_KEY) {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "StarTech Website <onboarding@resend.dev>",
        to: ["rr.startech.innovation@gmail.com"],
        reply_to: email,
        subject: `${topic ?? "New Contact"}: ${escapeHtml(name).slice(0, 100)}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${lead.country ? `<p><strong>Country:</strong> ${escapeHtml(lead.country)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          ${trail ? `<p>${escapeHtml(trail).replace(/\n/g, "<br>")}</p>` : ""}
          <hr>
          <p><small>Sent from StarTech Innovation website. ${crmLine}</small></p>
        `,
        text: `Name: ${escapeHtml(name)}\n${company ? `Company: ${escapeHtml(company)}\n` : ""}Email: ${escapeHtml(email)}\n${phone ? `Phone: ${escapeHtml(phone)}\n` : ""}${lead.country ? `Country: ${escapeHtml(lead.country)}\n` : ""}Message:\n${escapeHtml(message)}\n${trail ? `\n${escapeHtml(trail)}\n` : ""}\n${crmLine}`,
      }),
    });
    emailed = resendResponse.ok;
    if (!emailed) console.error("Resend error:", resendResponse.status);
  }

  // The visitor only needs to retry when the lead reached neither place.
  if (!saved && !emailed) {
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send your message. Please try again later." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  // The enquirer's own acknowledgement, only for a lead the CRM holds. It
  // runs after the response and never throws (worker/ack.ts).
  if (saved) {
    ctx.waitUntil(
      acknowledgeEnquiry(env, {
        email, topic: body.topic, locale: body.locale, utmCampaign,
        hasSpreadsheet: spreadsheetKey !== null,
      })
    );
  }

  return new Response(
    JSON.stringify({ success: true, message: "Thank you for your message! We will get back to you soon." }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
