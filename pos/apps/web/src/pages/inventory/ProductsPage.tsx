import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { ApiError } from "../../lib/api.js";
import { formatCents } from "../../lib/format.js";
import type { Product } from "../../lib/types.js";

interface Category {
  id: string;
  name: string;
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await api.get<Product[]>(`/products?search=${encodeURIComponent(search)}&take=100`);
    setProducts(res.data);
  }

  useEffect(() => {
    api.get<Category[]>("/categories").then((res) => setCategories(res.data));
  }, []);
  useEffect(() => {
    const t = setTimeout(load, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function save() {
    if (!editing) return;
    setError(null);
    try {
      const payload = {
        sku: editing.sku,
        name: editing.name,
        categoryId: editing.categoryId || null,
        costPriceCents: editing.costPriceCents ?? 0,
        sellPriceCents: editing.sellPriceCents ?? 0,
        unit: editing.unit || "EACH"
      };
      if (editing.id) {
        await api.patch(`/products/${editing.id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed");
    }
  }

  function exportCsv() {
    window.open(`${import.meta.env.VITE_API_URL || "/api"}/products/export.csv`, "_blank");
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Products</h1>
        <div className="flex gap-2">
          <button onClick={exportCsv} className="rounded border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">
            Export CSV
          </button>
          <button
            onClick={() => setEditing({ unit: "EACH" })}
            className="rounded bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            New product
          </button>
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, SKU, or barcode"
        className="mb-4 w-80 rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
      />

      <table className="w-full rounded-lg bg-white text-sm shadow-sm">
        <thead className="border-b border-slate-200 text-left text-slate-500">
          <tr>
            <th className="p-3">SKU</th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Cost</th>
            <th className="p-3">Sell</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="p-3 font-mono text-xs">{p.sku}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.category?.name ?? "—"}</td>
              <td className="p-3">{formatCents(p.costPriceCents)}</td>
              <td className="p-3">{formatCents(p.sellPriceCents)}</td>
              <td className="p-3 text-right">
                <button onClick={() => setEditing(p)} className="text-brand-600 hover:underline">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">{editing.id ? "Edit product" : "New product"}</h2>
            {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <div className="space-y-3">
              <input
                placeholder="SKU"
                value={editing.sku ?? ""}
                onChange={(e) => setEditing({ ...editing, sku: e.target.value })}
                className="w-full rounded border border-slate-300 px-3 py-2"
              />
              <input
                placeholder="Name"
                value={editing.name ?? ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full rounded border border-slate-300 px-3 py-2"
              />
              <select
                value={editing.categoryId ?? ""}
                onChange={(e) => setEditing({ ...editing, categoryId: e.target.value })}
                className="w-full rounded border border-slate-300 px-3 py-2"
              >
                <option value="">No category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Cost price"
                  value={editing.costPriceCents !== undefined ? editing.costPriceCents / 100 : ""}
                  onChange={(e) => setEditing({ ...editing, costPriceCents: Math.round(Number(e.target.value) * 100) })}
                  className="w-1/2 rounded border border-slate-300 px-3 py-2"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Sell price"
                  value={editing.sellPriceCents !== undefined ? editing.sellPriceCents / 100 : ""}
                  onChange={(e) => setEditing({ ...editing, sellPriceCents: Math.round(Number(e.target.value) * 100) })}
                  className="w-1/2 rounded border border-slate-300 px-3 py-2"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded border border-slate-300 px-4 py-2 text-sm font-medium">
                Cancel
              </button>
              <button onClick={save} className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
