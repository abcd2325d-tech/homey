import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { ApiError } from "../../lib/api.js";
import type { Role } from "@pos/shared";

interface StoreSettings {
  storeName: string;
  address: string | null;
  taxId: string | null;
  currencyCode: string;
  locale: string;
  receiptFooterText: string | null;
  costingMethod: "FIFO" | "WEIGHTED_AVERAGE";
  discountApprovalThresholdBasisPoints: number;
  loyaltyPointsPerDollar: number;
  loyaltyPointValueCents: number;
}
interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;
}

export function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ email: "", name: "", role: "CASHIER" as Role, password: "" });

  async function loadAll() {
    const [s, u] = await Promise.all([api.get<StoreSettings>("/settings"), api.get<User[]>("/users")]);
    setSettings(s.data);
    setUsers(u.data);
  }

  useEffect(() => {
    void loadAll();
  }, []);

  async function saveSettings() {
    if (!settings) return;
    setError(null);
    try {
      await api.patch("/settings", settings);
      await loadAll();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed");
    }
  }

  async function createUser() {
    setError(null);
    try {
      await api.post("/users", newUser);
      setNewUser({ email: "", name: "", role: "CASHIER", password: "" });
      await loadAll();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create user");
    }
  }

  async function toggleActive(user: User) {
    await api.patch(`/users/${user.id}`, { isActive: !user.isActive });
    await loadAll();
  }

  if (!settings) return <div className="p-6 text-slate-400">Loading…</div>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold text-slate-800">Settings</h1>
      {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid grid-cols-2 gap-6">
        <section className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-semibold">Store profile</h2>
          <div className="space-y-2 text-sm">
            <Field label="Store name" value={settings.storeName} onChange={(v) => setSettings({ ...settings, storeName: v })} />
            <Field label="Address" value={settings.address ?? ""} onChange={(v) => setSettings({ ...settings, address: v })} />
            <Field label="Tax ID" value={settings.taxId ?? ""} onChange={(v) => setSettings({ ...settings, taxId: v })} />
            <Field label="Currency code" value={settings.currencyCode} onChange={(v) => setSettings({ ...settings, currencyCode: v })} />
            <Field
              label="Receipt footer"
              value={settings.receiptFooterText ?? ""}
              onChange={(v) => setSettings({ ...settings, receiptFooterText: v })}
            />
            <label className="block">
              <span className="mb-1 block font-medium text-slate-600">Costing method</span>
              <select
                value={settings.costingMethod}
                onChange={(e) => setSettings({ ...settings, costingMethod: e.target.value as StoreSettings["costingMethod"] })}
                className="w-full rounded border border-slate-300 px-2 py-1.5"
              >
                <option value="WEIGHTED_AVERAGE">Weighted average</option>
                <option value="FIFO">FIFO</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block font-medium text-slate-600">Discount approval threshold (%)</span>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.discountApprovalThresholdBasisPoints / 100}
                onChange={(e) =>
                  setSettings({ ...settings, discountApprovalThresholdBasisPoints: Math.round(Number(e.target.value) * 100) })
                }
                className="w-full rounded border border-slate-300 px-2 py-1.5"
              />
            </label>
            <label className="block">
              <span className="mb-1 block font-medium text-slate-600">Loyalty points earned per dollar spent</span>
              <input
                type="number"
                min="0"
                value={settings.loyaltyPointsPerDollar}
                onChange={(e) => setSettings({ ...settings, loyaltyPointsPerDollar: Math.round(Number(e.target.value)) })}
                className="w-full rounded border border-slate-300 px-2 py-1.5"
              />
            </label>
            <label className="block">
              <span className="mb-1 block font-medium text-slate-600">Value of 1 redeemed loyalty point (cents)</span>
              <input
                type="number"
                min="1"
                value={settings.loyaltyPointValueCents}
                onChange={(e) => setSettings({ ...settings, loyaltyPointValueCents: Math.round(Number(e.target.value)) })}
                className="w-full rounded border border-slate-300 px-2 py-1.5"
              />
            </label>
            <button onClick={saveSettings} className="mt-2 rounded bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">
              Save settings
            </button>
          </div>
        </section>

        <section className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-semibold">Users</h2>
          <table className="mb-4 w-full text-sm">
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-slate-100">
                  <td className="py-1.5">{u.name}</td>
                  <td className="py-1.5 text-slate-500">{u.role}</td>
                  <td className="py-1.5">
                    <button onClick={() => toggleActive(u)} className={`text-xs font-medium ${u.isActive ? "text-red-600" : "text-emerald-600"}`}>
                      {u.isActive ? "Deactivate" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="space-y-2 border-t border-slate-200 pt-3 text-sm">
            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full rounded border border-slate-300 px-2 py-1.5"
            />
            <input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full rounded border border-slate-300 px-2 py-1.5"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as Role })}
              className="w-full rounded border border-slate-300 px-2 py-1.5"
            >
              <option value="CASHIER">Cashier</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
            <input
              type="password"
              placeholder="Temporary password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full rounded border border-slate-300 px-2 py-1.5"
            />
            <button onClick={createUser} className="w-full rounded bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">
              Add user
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium text-slate-600">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1.5" />
    </label>
  );
}
