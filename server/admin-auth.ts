import crypto from 'crypto';
import { createAdminSession, isDatabaseConfigured, validateAdminSession } from './db.js';

type EnvSource = Record<string, string | undefined>;

const SESSION_TTL_HOURS = 72;
const DEFAULT_ADMIN_PASSWORD = 'aliaskin123123';

function getFallbackToken(env: EnvSource) {
  const secret = readAdminPassword(env);
  return crypto.createHash('sha256').update(`lunara-admin:${secret}`).digest('hex');
}

export function readAdminPassword(env: EnvSource) {
  return env.ADMIN_PASSWORD?.trim() || DEFAULT_ADMIN_PASSWORD;
}

export function verifyAdminPassword(env: EnvSource, password: string) {
  const expected = readAdminPassword(env);
  if (!expected) {
    throw new Error('ADMIN_PASSWORD_MISSING');
  }

  const input = Buffer.from(password);
  const target = Buffer.from(expected);
  if (input.length !== target.length) {
    return false;
  }
  return crypto.timingSafeEqual(input, target);
}

export async function createSession(env: EnvSource) {
  if (!isDatabaseConfigured(env)) {
    return {
      token: getFallbackToken(env),
      expiresAt: new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000),
    };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000);
  await createAdminSession(env, token, expiresAt);

  return { token, expiresAt };
}

export async function requireAdmin(env: EnvSource, token?: string | null) {
  if (!token) {
    return false;
  }

  if (!isDatabaseConfigured(env)) {
    return token === getFallbackToken(env);
  }

  try {
    return await validateAdminSession(env, token);
  } catch {
    return false;
  }
}
