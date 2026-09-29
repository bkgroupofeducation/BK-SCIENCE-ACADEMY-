/**
 * Centralized API configuration.
 * All fetch calls must use this base URL instead of hardcoded localhost.
 */
export const API_BASE = ''; // Use relative paths for production compatibility

/**
 * Resolves uploaded media URLs ensuring compatibility with Nginx reverse proxy.
 * Paths starting with /uploads/ are routed through /api/uploads/ to reach Express.
 */
export function getMediaUrl(path) {
  if (!path || typeof path !== 'string') return '';
  if (
    path.startsWith('blob:') || 
    path.startsWith('data:') || 
    path.startsWith('http://') || 
    path.startsWith('https://')
  ) {
    return path;
  }
  let clean = path;
  if (clean.startsWith('/uploads/')) {
    clean = `/api/uploads/${clean.replace(/^\/uploads\//, '')}`;
  }
  return `${API_BASE}${clean}`;
}

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
