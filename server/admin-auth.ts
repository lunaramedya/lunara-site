import crypto from 'crypto';
import { createAdminSession, isDatabaseConfigured, validateAdminSession } from './db';

type EnvSource = Record<string, string | undefined>;

const SESSION_TTL_HOURS = 72;

export function readAdminPassword(env: EnvSource) {
  return env.ADMIN_PASSWORD?.trim();
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
    throw new Error('DATABASE_URL_MISSING');
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

  return validateAdminSession(env, token);
}
