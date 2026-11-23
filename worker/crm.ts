// Lead capture (CRM).
// Every enquiry is written to the CRM before the notification email goes out,
// so a bounced or filtered email no longer loses the lead. The database
// belongs to st_dasboard; the ids and columns below mirror its
// migrations/0001_crm_init.sql and src/crm/db.ts.

import { leadTrail, type Lead } from "./lead";

const CRM_ORG_ID = "org_startech_default";
const CRM_USER_ID = "user_ceo_default";

/**
 * Contact sources hq knows. A utm_source that matches one is written straight
 * to contacts.source so the channel can be filtered; anything else is kept
 * verbatim in the activity text and the contact is filed under "website".
 * Mirrors CONTACT_SOURCES in st_dasboard/src/crm/types.ts.
 */
const HQ_SOURCES = new Set([
  "website", "referral", "linkedin", "event", "cold_outreach", "partner",
  "email", "whatsapp", "line", "youtube", "x", "instagram", "tiktok",
  "facebook", "telegram", "newsletter", "google",
]);

export async function saveLead(db: D1Database, lead: Lead): Promise<void> {
  const now = new Date().toISOString();
  const writes: D1PreparedStatement[] = [];

  let companyId: string | null = null;
  if (lead.company) {
    const existing = await db
      .prepare("SELECT id FROM companies WHERE org_id = ? AND name = ? COLLATE NOCASE LIMIT 1")
      .bind(CRM_ORG_ID, lead.company)
      .first<{ id: string }>();
    companyId = existing?.id ?? `cmp_${crypto.randomUUID()}`;
    if (!existing) {
      writes.push(
        db
          .prepare(
            `INSERT INTO companies (id, org_id, name, country, created_by, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(companyId, CRM_ORG_ID, lead.company, lead.country, CRM_USER_ID, now, now)
      );
    }
  }

  // A repeat enquiry from the same address is a new activity on the existing
  // contact, not a second contact.
  const contact = await db
    .prepare("SELECT id, company_id FROM contacts WHERE org_id = ? AND email = ? COLLATE NOCASE LIMIT 1")
    .bind(CRM_ORG_ID, lead.email)
    .first<{ id: string; company_id: string | null }>();
  const contactId = contact?.id ?? `con_${crypto.randomUUID()}`;

  if (!contact) {
    const [firstName, ...rest] = lead.name.split(/\s+/);
    const source = HQ_SOURCES.has(lead.utmSource) ? lead.utmSource : "website";
    writes.push(
      db
        .prepare(
          `INSERT INTO contacts (id, org_id, company_id, type, first_name, last_name, email, phone, country, status, source, created_by, created_at, updated_at)
           VALUES (?, ?, ?, 'b2b_contact', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          contactId, CRM_ORG_ID, companyId, firstName, rest.join(" "),
          lead.email, lead.phone || null, lead.country, lead.status ?? "lead",
          source, CRM_USER_ID, now, now
        )
    );
  } else if (companyId && !contact.company_id) {
    writes.push(
      db
        .prepare("UPDATE contacts SET company_id = ?, updated_at = ? WHERE id = ? AND org_id = ?")
        .bind(companyId, now, contactId, CRM_ORG_ID)
    );
  }

  // Logged as a completed note, not an email: last_contacted_at is left alone
  // because nobody at StarTech has replied yet.
  writes.push(
    db
      .prepare(
        `INSERT INTO activities (id, org_id, type, contact_id, company_id, subject, description, completed_at, is_completed, created_by, created_at)
         VALUES (?, ?, 'note', ?, ?, ?, ?, ?, 1, ?, ?)`
      )
      .bind(
        `act_${crypto.randomUUID()}`, CRM_ORG_ID, contactId, companyId ?? contact?.company_id ?? null,
        lead.subject ?? "Website enquiry",
        [lead.message, leadTrail(lead)].filter(Boolean).join("\n\n"), now, CRM_USER_ID, now
      )
  );

  await db.batch(writes);
}
