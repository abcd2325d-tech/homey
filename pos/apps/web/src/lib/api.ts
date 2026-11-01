import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "./tokens.js";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: unknown) {
    super(message);
  }
}

let refreshing: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  if (!refreshing) {
    refreshing = fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    })
      .then(async (res) => {
        if (!res.ok) return false;
        const body = await res.json();
        setTokens(body.data.accessToken, body.data.refreshToken);
        return true;
      })
      .catch(() => false)
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  rawBody?: string;
  contentType?: string;
  skipAuth?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}, isRetry = false): Promise<T> {
  const headers: Record<string, string> = {};
  let body: string | undefined;

  if (options.rawBody !== undefined) {
    headers["Content-Type"] = options.contentType ?? "text/plain";
    body = options.rawBody;
  } else if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.body);
  }

  if (!options.skipAuth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, { method: options.method ?? "GET", headers, body });

  if (res.status === 401 && !options.skipAuth && !isRetry) {
    const refreshed = await tryRefresh();
    if (refreshed) return request<T>(path, options, true);
    clearTokens();
    window.dispatchEvent(new CustomEvent("pos:unauthorized"));
  }

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  const json = text ? JSON.parse(text) : undefined;

  if (!res.ok) {
    const err = json?.error ?? { message: res.statusText, code: "UNKNOWN" };
    throw new ApiError(res.status, err.code, err.message, err.details);
  }

  return json as T;
}

export interface Envelope<T> {
  data: T;
  meta?: { total?: number };
}

export const api = {
  get: <T>(path: string) => request<Envelope<T>>(path),
  post: <T>(path: string, body?: unknown) => request<Envelope<T>>(path, { method: "POST", body }),
  patch: <T>(path: string, body?: unknown) => request<Envelope<T>>(path, { method: "PATCH", body }),
  del: <T>(path: string) => request<Envelope<T>>(path, { method: "DELETE" }),
  postRaw: <T>(path: string, rawBody: string, contentType: string) =>
    request<Envelope<T>>(path, { method: "POST", rawBody, contentType }),
  skipAuth: {
    post: <T>(path: string, body?: unknown) => request<Envelope<T>>(path, { method: "POST", body, skipAuth: true })
  }
};
