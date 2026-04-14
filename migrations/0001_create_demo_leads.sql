CREATE TABLE IF NOT EXISTS demo_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  name TEXT,
  company TEXT,
  demo_type TEXT NOT NULL,
  input_data TEXT NOT NULL,
  output_data TEXT,
  ip TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_demo_leads_email ON demo_leads(email);
CREATE INDEX idx_demo_leads_demo_type ON demo_leads(demo_type);
CREATE INDEX idx_demo_leads_created_at ON demo_leads(created_at);
