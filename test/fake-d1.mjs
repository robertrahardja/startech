// A D1 database backed by node:sqlite, so the Worker's queries run as real
// SQL against the real outreach schema instead of being mocked.
import { DatabaseSync } from "node:sqlite";

/**
 * The tables this Worker reads and writes. The outreach tables are copied
 * from st_dasboard's migrations/0007_outreach.sql; the CRM tables carry only
 * the columns saveLead writes (st_dasboard migrations/0001_crm_init.sql has
 * the full ones).
 */
const SCHEMA = `
CREATE TABLE companies (
  id TEXT PRIMARY KEY, org_id TEXT, name TEXT, country TEXT,
  created_by TEXT, created_at TEXT, updated_at TEXT
);
CREATE TABLE contacts (
  id TEXT PRIMARY KEY, org_id TEXT, company_id TEXT, type TEXT, first_name TEXT,
  last_name TEXT, email TEXT, phone TEXT, country TEXT, status TEXT, source TEXT,
  created_by TEXT, created_at TEXT, updated_at TEXT
);
CREATE TABLE activities (
  id TEXT PRIMARY KEY, org_id TEXT, type TEXT, contact_id TEXT, company_id TEXT,
  subject TEXT, description TEXT, completed_at TEXT, is_completed INTEGER,
  created_by TEXT, created_at TEXT
);
CREATE TABLE outreach_campaigns (
  id TEXT PRIMARY KEY,
  country TEXT NOT NULL,
  language TEXT NOT NULL,
  name TEXT NOT NULL,
  segment_tags TEXT NOT NULL DEFAULT '[]',
  steps TEXT NOT NULL DEFAULT '[]',
  daily_cap INTEGER NOT NULL DEFAULT 10,
  active INTEGER NOT NULL DEFAULT 0,
  auto_send INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE outreach_recipients (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  company_id TEXT,
  email TEXT NOT NULL,
  email_source_url TEXT,
  consent_basis TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  step INTEGER NOT NULL DEFAULT 0,
  next_at TEXT,
  last_sent_at TEXT,
  replied_at TEXT,
  unsub_token TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (campaign_id, email),
  FOREIGN KEY (campaign_id) REFERENCES outreach_campaigns(id),
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
CREATE TABLE outreach_suppression (
  email TEXT PRIMARY KEY,
  reason TEXT NOT NULL,
  source TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;

/** A fresh in-memory database with the schema above, and a D1-shaped handle on it. */
export function fakeD1() {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(SCHEMA);
  const plain = (row) => (row ? { ...row } : null);
  const statement = (sql, params = []) => ({
    bind: (...values) => statement(sql, values),
    first: async () => plain(sqlite.prepare(sql).get(...params)),
    all: async () => ({ success: true, results: sqlite.prepare(sql).all(...params).map(plain) }),
    run: async () => {
      sqlite.prepare(sql).run(...params);
      return { success: true, meta: {} };
    },
    runNow: () => sqlite.prepare(sql).run(...params),
  });
  const d1 = {
    prepare: (sql) => statement(sql),
    // D1 runs a batch as one transaction.
    batch: async (statements) => {
      sqlite.exec("BEGIN");
      try {
        statements.forEach((s) => s.runNow());
        sqlite.exec("COMMIT");
      } catch (err) {
        sqlite.exec("ROLLBACK");
        throw err;
      }
      return statements.map(() => ({ success: true, meta: {} }));
    },
  };
  /** Runs SQL directly, for arranging and inspecting test data. */
  const query = (sql, ...params) => sqlite.prepare(sql).all(...params).map(plain);
  return { d1, query };
}

/** A D1 whose every call fails, as when the database is unreachable. */
export function brokenD1() {
  const fail = () => {
    throw new Error("D1_ERROR: database unavailable");
  };
  return { prepare: fail, batch: fail };
}
