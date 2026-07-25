// In dev, requests go to /api and Vite's proxy forwards them to the local server.
// In production, set VITE_API_URL (e.g. https://your-backend.onrender.com/api)
// at build time to point the built app at the deployed backend.
const BASE = import.meta.env.VITE_API_URL || "/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const message = data?.error || `Request failed (${res.status})`;
    const error = new Error(message);
    error.status = res.status;
    error.details = data?.details;
    throw error;
  }
  return data;
}

export const api = {
  signup: (payload) => request("/auth/signup", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  me: () => request("/auth/me", { auth: true }),

  listListings: (params = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v != null))
    ).toString();
    return request(`/listings${query ? `?${query}` : ""}`);
  },
  getListing: (id) => request(`/listings/${id}`),
  myListings: () => request("/listings/mine", { auth: true }),
  createListing: (payload) => request("/listings", { method: "POST", body: payload, auth: true }),
  updateListing: (id, payload) => request(`/listings/${id}`, { method: "PUT", body: payload, auth: true }),
  deleteListing: (id) => request(`/listings/${id}`, { method: "DELETE", auth: true }),

  createBooking: (payload) => request("/bookings", { method: "POST", body: payload, auth: true }),
  myBookings: () => request("/bookings/mine", { auth: true }),
  cancelBooking: (id) => request(`/bookings/${id}/cancel`, { method: "POST", auth: true }),
};

export { getToken };
