const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL || '/api';

// PUBLIC_INTERFACE
export function apiClient(endpoint, { method = 'GET', body, token } = {}) {
  /** Simple fetch wrapper for WebUI that adds Authorization and JSON headers. */
  const headers = { 'Content-Type': 'application/json' };
  const t = token || localStorage.getItem('token');
  if (t) headers.Authorization = `Bearer ${t}`;
  return fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  }).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `Request failed (${res.status})`);
    }
    return data;
  });
}
