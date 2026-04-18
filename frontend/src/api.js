/**
 * Centralized API configuration.
 * All fetch calls must use this base URL instead of hardcoded localhost.
 */
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Lightweight fetch wrapper with default JSON headers.
 * Throws on non-2xx responses with the server's message.
 */
export async function apiFetch(path, options = {}) {
  const token = sessionStorage.getItem('bk_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
