import path from "node:path";
import Database from "better-sqlite3";

const DB_PATH = path.join(process.cwd(), "data", "karatecar.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH, { readonly: true });
  }
  return _db;
}

// ── Types ──────────────────────────────────────────────────────────────────

export type Program = {
  id: number;
  category: string;
  subcategory: string | null;
  name: string;
  funder: string | null;
  funder_url: string | null;
  min_amount: number | null;
  max_amount: number | null;
  deadline_2026: string | null;
  next_round_expected: string | null;
  eligible_costs: string | null;
  eligibility_conditions: string | null;
  application_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  status: string | null;
  relevance: string | null;
  notes: string | null;
  source_url: string | null;
  verified_date: string | null;
};

export type Contact = {
  id: number;
  entity_type: string | null;
  entity_name: string | null;
  person_name: string | null;
  role: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  source_url: string | null;
  notes: string | null;
};

export type Statement = {
  id: number;
  channel: string | null;
  external_id: string | null;
  ts_utc: string | null;
  kind: string | null;
  verbatim: string | null;
  topic: string | null;
  notes: string | null;
  created_at: string | null;
};

// ── Queries ────────────────────────────────────────────────────────────────

export function getTopPrograms(): Program[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM programs
       WHERE status IN ('aktuální','průběžný','otevřený')
         AND relevance = 'high'
       ORDER BY
         CASE WHEN deadline_2026 IS NULL OR deadline_2026 IN ('prošlo','neotevřeno','průběžně','?') THEN 1 ELSE 0 END,
         deadline_2026 ASC
       LIMIT 10`
    )
    .all() as Program[];
}

export function getProgramStats() {
  const db = getDb();
  return db
    .prepare(
      `SELECT
         COUNT(*) as total,
         SUM(CASE WHEN relevance = 'high' THEN 1 ELSE 0 END) as high_relevance,
         SUM(CASE WHEN eligible_costs LIKE '%vozidl%' OR eligible_costs LIKE '%auto%' OR eligible_costs LIKE '%doprav%' THEN 1 ELSE 0 END) as with_vehicle
       FROM programs`
    )
    .get() as { total: number; high_relevance: number; with_vehicle: number };
}

export function getUpcomingDeadlines(limit = 8): Program[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM programs
       WHERE deadline_2026 IS NOT NULL
         AND deadline_2026 NOT IN ('prošlo','neotevřeno','průběžně','?')
         AND deadline_2026 LIKE '2026-%'
       ORDER BY deadline_2026 ASC
       LIMIT ?`
    )
    .all(limit) as Program[];
}

export function getAllPrograms(opts: {
  category?: string;
  status?: string;
  relevance?: string;
  sort?: string;
}): Program[] {
  const db = getDb();
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (opts.category) {
    conditions.push("category = ?");
    params.push(opts.category);
  }
  if (opts.status) {
    conditions.push("status = ?");
    params.push(opts.status);
  }
  if (opts.relevance) {
    conditions.push("relevance = ?");
    params.push(opts.relevance);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  let orderBy = "name ASC";
  if (opts.sort === "deadline") {
    orderBy =
      "CASE WHEN deadline_2026 IS NULL OR deadline_2026 IN ('prošlo','neotevřeno','průběžně','?') THEN 1 ELSE 0 END, deadline_2026 ASC";
  } else if (opts.sort === "amount") {
    orderBy = "max_amount DESC NULLS LAST";
  }

  return db
    .prepare(`SELECT * FROM programs ${where} ORDER BY ${orderBy}`)
    .all(...params) as Program[];
}

export function getProgramById(id: number): Program | null {
  const db = getDb();
  return (
    (db.prepare("SELECT * FROM programs WHERE id = ?").get(id) as Program) ??
    null
  );
}

export function getAllContacts(opts: {
  search?: string;
  entity_type?: string;
}): Contact[] {
  const db = getDb();
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (opts.search) {
    conditions.push(
      "(entity_name LIKE ? OR person_name LIKE ? OR email LIKE ?)"
    );
    const q = `%${opts.search}%`;
    params.push(q, q, q);
  }
  if (opts.entity_type) {
    conditions.push("entity_type = ?");
    params.push(opts.entity_type);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return db
    .prepare(`SELECT * FROM contacts ${where} ORDER BY entity_name, person_name`)
    .all(...params) as Contact[];
}

export function getContactById(id: number): Contact | null {
  const db = getDb();
  return (
    (db.prepare("SELECT * FROM contacts WHERE id = ?").get(id) as Contact) ??
    null
  );
}

export function getAllStatements(): Statement[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM radim_statements ORDER BY ts_utc DESC")
    .all() as Statement[];
}

export function getProgramsWithDeadline2026(): Program[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT id, name, funder, deadline_2026, category, relevance, status
       FROM programs
       WHERE deadline_2026 IS NOT NULL
         AND deadline_2026 LIKE '2026-%'
       ORDER BY deadline_2026 ASC`
    )
    .all() as Program[];
}
