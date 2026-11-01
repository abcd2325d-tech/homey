import { create } from "zustand";
import { api } from "../lib/api.js";
import { clearTokens, getAccessToken, setTokens } from "../lib/tokens.js";
import type { Role } from "@pos/shared";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthState {
  user: AuthUser | null;
  status: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  bootstrap: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",

  async login(email, password) {
    const res = await api.skipAuth.post<{ user: AuthUser; accessToken: string; refreshToken: string }>(
      "/auth/login",
      { email, password }
    );
    setTokens(res.data.accessToken, res.data.refreshToken);
    set({ user: res.data.user, status: "authenticated" });
  },

  async logout() {
    clearTokens();
    set({ user: null, status: "unauthenticated" });
  },

  async bootstrap() {
    if (!getAccessToken()) {
      set({ status: "unauthenticated" });
      return;
    }
    try {
      const res = await api.get<AuthUser>("/auth/me");
      set({ user: res.data, status: "authenticated" });
    } catch {
      clearTokens();
      set({ user: null, status: "unauthenticated" });
    }
  }
}));

window.addEventListener("pos:unauthorized", () => {
  useAuthStore.setState({ user: null, status: "unauthenticated" });
});
