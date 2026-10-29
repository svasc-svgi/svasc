import axios from 'axios';

const getBaseApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    const raw = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
    return raw.endsWith('/api') ? raw : `${raw}/api`;
  }
  const base = (import.meta.env.VITE_BASE_URL || 'http://localhost:5000').trim().replace(/\/+$/, '');
  return `${base}/api`;
};

const apiClient = axios.create({
  baseURL: getBaseApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// ─── In-flight request deduplication ────────────────────────────────────────
// Prevents the same GET endpoint from being called multiple times simultaneously
const pendingRequests = new Map();

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Deduplicate concurrent GET requests to the same URL
    if (config.method === 'get') {
      const key = config.url + JSON.stringify(config.params || {});
      if (pendingRequests.has(key)) {
        const source = axios.CancelToken.source();
        config.cancelToken = source.token;
        source.cancel('Deduplicated request');
      } else {
        const source = axios.CancelToken.source();
        config.cancelToken = source.token;
        config._dedupeKey = key;
        pendingRequests.set(key, source);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.config._dedupeKey) {
      pendingRequests.delete(response.config._dedupeKey);
    }
    return response.data;
  },
  (error) => {
    if (error.config && error.config._dedupeKey) {
      pendingRequests.delete(error.config._dedupeKey);
    }

    if (axios.isCancel(error)) {
      return new Promise(() => {});
    }

    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }
    const errorMsg =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(errorMsg));
  }
);

/**
 * Non-blocking warm-up ping to wake Render backend from sleep on user entry
 */
export const warmUpBackend = () => {
  try {
    const base = (import.meta.env.VITE_API_URL || import.meta.env.VITE_BASE_URL || 'http://localhost:5000').trim().replace(/\/+$/, '');
    const healthUrl = base.endsWith('/api') ? `${base}/health` : `${base}/api/health`;
    fetch(healthUrl, { mode: 'cors' }).catch(() => {});
  } catch (e) {
    // Ignore warm-up failure
  }
};

export default apiClient;
