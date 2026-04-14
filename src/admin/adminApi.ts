const TOKEN_KEY = 'lunara_admin_token';

export function getAdminToken() {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(TOKEN_KEY);
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getAdminToken();
  const headers = new Headers(options.headers ?? {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }
  const response = await fetch(path, { ...options, headers });
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.ok === false) {
    throw new Error(data?.message || 'İşlem başarısız.');
  }
  return data;
}

export async function adminLogin(password: string) {
  const data = await apiFetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
  if (data?.token) {
    setAdminToken(data.token);
  }
  return data;
}

export async function fetchAdminContent() {
  return apiFetch('/api/admin/content');
}

export async function updateAdminContent(payload: unknown) {
  return apiFetch('/api/admin/content', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function fetchLogs(limit = 200) {
  return apiFetch(`/api/admin/logs?limit=${limit}`);
}

export async function fetchLeads(limit = 200) {
  return apiFetch(`/api/admin/leads?limit=${limit}`);
}

export async function fetchContacts(limit = 200) {
  return apiFetch(`/api/admin/contacts?limit=${limit}`);
}
