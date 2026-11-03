import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.js";
import type { Role } from "@pos/shared";

const links: { to: string; label: string; roles: Role[] }[] = [
  { to: "/pos", label: "Register", roles: ["ADMIN", "MANAGER", "CASHIER"] },
  { to: "/inventory/products", label: "Products", roles: ["ADMIN", "MANAGER"] },
  { to: "/inventory/stock", label: "Stock", roles: ["ADMIN", "MANAGER"] },
  { to: "/inventory/purchase-orders", label: "Purchase Orders", roles: ["ADMIN", "MANAGER"] },
  { to: "/inventory/stock-counts", label: "Stock Counts", roles: ["ADMIN", "MANAGER"] },
  { to: "/customers", label: "Customers", roles: ["ADMIN", "MANAGER"] },
  { to: "/reports", label: "Reports", roles: ["ADMIN", "MANAGER"] },
  { to: "/settings", label: "Settings", roles: ["ADMIN"] }
];

export function Layout() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2 shadow-sm">
        <div className="flex items-center gap-6">
          <span className="text-lg font-bold text-brand-600">POS</span>
          <nav className="flex gap-1">
            {links
              .filter((l) => user && l.roles.includes(user.role))
              .map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded px-3 py-1.5 text-sm font-medium ${
                      isActive ? "bg-brand-500 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-500">
            {user?.name} <span className="text-slate-400">({user?.role})</span>
          </span>
          <button onClick={() => logout()} className="rounded bg-slate-100 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-200">
            Log out
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-auto bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
