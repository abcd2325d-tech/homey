import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { ApiError } from "../../lib/api.js";
import type { Customer } from "../../lib/types.js";

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await api.get<Customer[]>(`/customers?search=${encodeURIComponent(search)}`);
    setCustomers(res.data);
  }

  useEffect(() => {
    const t = setTimeout(load, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function createCustomer() {
    setError(null);
    try {
      await api.post("/customers", { name, phone: phone || undefined, email: email || undefined });
      setCreating(false);
      setName("");
      setPhone("");
      setEmail("");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create customer");
    }
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Customers</h1>
        <button onClick={() => setCreating(true)} className="rounded bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          New customer
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, phone, or email"
        className="mb-4 w-80 rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
      />

      <table className="w-full rounded-lg bg-white text-sm shadow-sm">
        <thead className="border-b border-slate-200 text-left text-slate-500">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Email</th>
            <th className="p-3">Loyalty points</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-b border-slate-100">
              <td className="p-3">{c.name}</td>
              <td className="p-3 text-slate-500">{c.phone ?? "—"}</td>
              <td className="p-3 text-slate-500">{c.email ?? "—"}</td>
              <td className="p-3 font-medium text-brand-600">{c.loyaltyPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">New customer</h2>
            {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-2 w-full rounded border border-slate-300 px-3 py-2" />
            <input placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-2 w-full rounded border border-slate-300 px-3 py-2" />
            <input placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 w-full rounded border border-slate-300 px-3 py-2" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setCreating(false)} className="rounded border border-slate-300 px-4 py-2 text-sm font-medium">
                Cancel
              </button>
              <button onClick={createCustomer} disabled={!name.trim()} className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
