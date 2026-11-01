import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.js";
import type { Role } from "@pos/shared";

export function ProtectedRoute({ roles }: { roles?: Role[] }) {
  const { user, status } = useAuthStore();

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center text-slate-500">Loading…</div>;
  }
  if (status === "unauthenticated" || !user) {
    return <Navigate to="/login" replace />;
  }
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2 text-slate-600">
        <p className="text-lg font-semibold">Not authorized</p>
        <p>Your role ({user.role}) can&apos;t access this page.</p>
      </div>
    );
  }
  return <Outlet />;
}
