/**
 * Centralized API configuration.
 * All fetch calls must use this base URL instead of hardcoded localhost.
 */
export const API_BASE = ''; // Use relative paths for production compatibility

/**
 * Lightweight fetch wrapper with default JSON headers.
 * Throws on non-2xx responses with the server's message.
 */
export async function apiFetch(path, options = {}) {
  const token = sessionStorage.getItem('bk_admin_token');
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'bypass-tunnel-reminder': 'true',
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}
