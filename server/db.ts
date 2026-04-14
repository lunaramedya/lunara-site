import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';

type EnvSource = Record<string, string | undefined>;

let schemaReady = false;

export function isDatabaseConfigured(env: EnvSource) {
  return typeof env.DATABASE_URL === 'string' && env.DATABASE_URL.length > 0;
}

function getSql(env: EnvSource) {
  const databaseUrl = env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL_MISSING');
  }

  return neon(databaseUrl);
}

export async function ensureSchema(env: EnvSource) {
  if (!isDatabaseConfigured(env) || schemaReady) {
    return;
  }

  const sql = getSql(env);

  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_by TEXT
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS event_logs (
      id BIGSERIAL PRIMARY KEY,
      event_type TEXT NOT NULL,
      event_name TEXT NOT NULL,
      page TEXT,
      session_id TEXT,
      metadata JSONB,
      ip TEXT,
      user_agent TEXT,
      referrer TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      plan_id TEXT,
      plan_name TEXT,
      plan_price TEXT,
      source TEXT,
      payload JSONB NOT NULL,
      ip TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      instagram TEXT NOT NULL,
      interested_service TEXT NOT NULL,
      monthly_ad_budget TEXT NOT NULL,
      message TEXT NOT NULL,
      payload JSONB NOT NULL,
      ip TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token_hash TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL,
      last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_event_logs_created_at ON event_logs (created_at DESC);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_event_logs_type ON event_logs (event_type);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions (expires_at);`;

  schemaReady = true;
}

export async function runQuery(env: EnvSource, query: string, values: unknown[] = []) {
  const sql = getSql(env);
  return sql.query(query, values) as Promise<Record<string, unknown>[]>;
}

export async function getContent(env: EnvSource, key: string) {
  if (!isDatabaseConfigured(env)) {
    return null;
  }

  await ensureSchema(env);
  const sql = getSql(env);
  const rows = await sql`
    SELECT value
    FROM site_content
    WHERE key = ${key}
    LIMIT 1
  `;

  const first = (rows as { value?: unknown }[])[0];
  return first?.value ?? null;
}

export async function setContent(env: EnvSource, key: string, value: unknown, updatedBy?: string) {
  if (!isDatabaseConfigured(env)) {
    throw new Error('DATABASE_URL_MISSING');
  }

  await ensureSchema(env);
  const sql = getSql(env);
  await sql`
    INSERT INTO site_content (key, value, updated_by)
    VALUES (${key}, ${value}::jsonb, ${updatedBy ?? null})
    ON CONFLICT (key)
    DO UPDATE SET value = EXCLUDED.value, updated_at = NOW(), updated_by = EXCLUDED.updated_by
  `;
}

export async function insertEventLog(env: EnvSource, data: {
  eventType: string;
  eventName: string;
  page?: string | null;
  sessionId?: string | null;
  metadata?: unknown;
  ip?: string | null;
  userAgent?: string | null;
  referrer?: string | null;
}) {
  if (!isDatabaseConfigured(env)) {
    return;
  }

  await ensureSchema(env);
  const sql = getSql(env);
  await sql`
    INSERT INTO event_logs (event_type, event_name, page, session_id, metadata, ip, user_agent, referrer)
    VALUES (
      ${data.eventType},
      ${data.eventName},
      ${data.page ?? null},
      ${data.sessionId ?? null},
      ${data.metadata ?? null}::jsonb,
      ${data.ip ?? null},
      ${data.userAgent ?? null},
      ${data.referrer ?? null}
    )
  `;
}

export async function insertLead(env: EnvSource, data: {
  name: string;
  phone: string;
  service: string;
  planId?: string;
  planName?: string;
  planPrice?: string;
  source?: string;
  payload: unknown;
  ip?: string | null;
  userAgent?: string | null;
}) {
  if (!isDatabaseConfigured(env)) {
    return;
  }

  await ensureSchema(env);
  const sql = getSql(env);
  await sql`
    INSERT INTO leads (name, phone, service, plan_id, plan_name, plan_price, source, payload, ip, user_agent)
    VALUES (
      ${data.name},
      ${data.phone},
      ${data.service},
      ${data.planId ?? null},
      ${data.planName ?? null},
      ${data.planPrice ?? null},
      ${data.source ?? null},
      ${data.payload}::jsonb,
      ${data.ip ?? null},
      ${data.userAgent ?? null}
    )
  `;
}

export async function insertContact(env: EnvSource, data: {
  name: string;
  company: string;
  phone: string;
  email: string;
  instagram: string;
  interestedService: string;
  monthlyAdBudget: string;
  message: string;
  payload: unknown;
  ip?: string | null;
  userAgent?: string | null;
}) {
  if (!isDatabaseConfigured(env)) {
    return;
  }

  await ensureSchema(env);
  const sql = getSql(env);
  await sql`
    INSERT INTO contacts (
      name,
      company,
      phone,
      email,
      instagram,
      interested_service,
      monthly_ad_budget,
      message,
      payload,
      ip,
      user_agent
    )
    VALUES (
      ${data.name},
      ${data.company},
      ${data.phone},
      ${data.email},
      ${data.instagram},
      ${data.interestedService},
      ${data.monthlyAdBudget},
      ${data.message},
      ${data.payload}::jsonb,
      ${data.ip ?? null},
      ${data.userAgent ?? null}
    )
  `;
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function createAdminSession(env: EnvSource, token: string, expiresAt: Date) {
  if (!isDatabaseConfigured(env)) {
    throw new Error('DATABASE_URL_MISSING');
  }

  await ensureSchema(env);
  const sql = getSql(env);
  await sql`
    INSERT INTO admin_sessions (token_hash, expires_at)
    VALUES (${hashToken(token)}, ${expiresAt.toISOString()})
  `;
}

export async function validateAdminSession(env: EnvSource, token: string) {
  if (!isDatabaseConfigured(env)) {
    return false;
  }

  await ensureSchema(env);
  const sql = getSql(env);
  const rows = await sql`
    SELECT token_hash
    FROM admin_sessions
    WHERE token_hash = ${hashToken(token)} AND expires_at > NOW()
    LIMIT 1
  `;

  const typedRows = rows as { token_hash?: string }[];
  if (!typedRows.length) {
    return false;
  }

  await sql`
    UPDATE admin_sessions
    SET last_seen_at = NOW()
    WHERE token_hash = ${hashToken(token)}
  `;

  return true;
}
