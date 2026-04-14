const SESSION_KEY = 'lunara_session_id';

function getSessionId() {
  if (typeof window === 'undefined') {
    return 'server';
  }

  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) {
    return existing;
  }

  const fresh = typeof crypto?.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(SESSION_KEY, fresh);
  return fresh;
}

export type LogEventPayload = {
  eventType: string;
  eventName: string;
  page?: string;
  metadata?: Record<string, unknown>;
};

export function logEvent(payload: LogEventPayload) {
  if (typeof window === 'undefined') {
    return;
  }

  const body = {
    ...payload,
    sessionId: getSessionId(),
    page: payload.page ?? `${window.location.pathname}${window.location.hash}`,
  };

  const data = JSON.stringify(body);

  if (navigator.sendBeacon) {
    const blob = new Blob([data], { type: 'application/json' });
    navigator.sendBeacon('/api/log', blob);
    return;
  }

  fetch('/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    keepalive: true,
  }).catch(() => undefined);
}
