import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { ApiError } from "../../lib/api.js";
import { formatCents } from "../../lib/format.js";
import type { Location, Product } from "../../lib/types.js";

interface Supplier {
  id: string;
  name: string;
}
interface PoLine {
  id: string;
  productId: string;
  quantityOrdered: number;
  quantityReceived: number;
  unitCostCents: number;
  product?: Product;
}
interface PurchaseOrder {
  id: string;
  poNumber: string;
  status: string;
  supplier: Supplier;
  location: Location;
  lines: PoLine[];
}

export function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [creating, setCreating] = useState(false);
  const [receiving, setReceiving] = useState<PurchaseOrder | null>(null);
  const [receiveLot, setReceiveLot] = useState("");
  const [receiveExpiration, setReceiveExpiration] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<{ supplierId: string; locationId: string; lines: { productId: string; quantityOrdered: string; unitCostCents: string }[] }>({
    supplierId: "",
    locationId: "",
    lines: [{ productId: "", quantityOrdered: "", unitCostCents: "" }]
  });

  async function load() {
    const res = await api.get<PurchaseOrder[]>("/purchase-orders");
    setOrders(res.data);
  }

  useEffect(() => {
    void load();
    api.get<Supplier[]>("/suppliers").then((r) => setSuppliers(r.data));
    api.get<Location[]>("/locations").then((r) => setLocations(r.data));
    api.get<Product[]>("/products?take=200").then((r) => setProducts(r.data));
  }, []);

  async function createOrder() {
    setError(null);
    try {
      await api.post("/purchase-orders", {
        supplierId: form.supplierId,
        locationId: form.locationId,
        lines: form.lines
          .filter((l) => l.productId && l.quantityOrdered)
          .map((l) => ({
            productId: l.productId,
            quantityOrdered: Math.round(Number(l.quantityOrdered) * 1000),
            unitCostCents: Math.round(Number(l.unitCostCents || 0) * 100)
          }))
      });
      setCreating(false);
      setForm({ supplierId: "", locationId: "", lines: [{ productId: "", quantityOrdered: "", unitCostCents: "" }] });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create purchase order");
    }
  }

  async function send(id: string) {
    await api.post(`/purchase-orders/${id}/send`);
    await load();
  }

  async function receiveAll(po: PurchaseOrder) {
    const lines = po.lines
      .filter((l) => l.quantityReceived < l.quantityOrdered)
      .map((l) => ({
        lineId: l.id,
        quantityReceivedDelta: l.quantityOrdered - l.quantityReceived,
        lotNumber: receiveLot || undefined,
        expirationDate: receiveExpiration || undefined
      }));
    if (lines.length === 0) return;
    await api.post(`/purchase-orders/${po.id}/receive`, { lines });
    setReceiving(null);
    setReceiveLot("");
    setReceiveExpiration("");
    await load();
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Purchase Orders</h1>
        <button onClick={() => setCreating(true)} className="rounded bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          New purchase order
        </button>
      </div>

      <table className="w-full rounded-lg bg-white text-sm shadow-sm">
        <thead className="border-b border-slate-200 text-left text-slate-500">
          <tr>
            <th className="p-3">PO #</th>
            <th className="p-3">Supplier</th>
            <th className="p-3">Location</th>
            <th className="p-3">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((po) => (
            <tr key={po.id} className="border-b border-slate-100">
              <td className="p-3 font-mono text-xs">{po.poNumber}</td>
              <td className="p-3">{po.supplier.name}</td>
              <td className="p-3">{po.location.name}</td>
              <td className="p-3">{po.status}</td>
              <td className="p-3 text-right">
                {po.status === "DRAFT" && (
                  <button onClick={() => send(po.id)} className="mr-3 text-brand-600 hover:underline">
                    Send
                  </button>
                )}
                {(po.status === "SENT" || po.status === "PARTIALLY_RECEIVED") && (
                  <button onClick={() => setReceiving(po)} className="text-brand-600 hover:underline">
                    Receive
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">New purchase order</h2>
            {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <div className="mb-3 flex gap-2">
              <select
                value={form.supplierId}
                onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
                className="flex-1 rounded border border-slate-300 px-3 py-2"
              >
                <option value="">Supplier…</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <select
                value={form.locationId}
                onChange={(e) => setForm({ ...form, locationId: e.target.value })}
                className="flex-1 rounded border border-slate-300 px-3 py-2"
              >
                <option value="">Location…</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
            {form.lines.map((line, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <select
                  value={line.productId}
                  onChange={(e) => {
                    const lines = [...form.lines];
                    lines[i] = { ...lines[i], productId: e.target.value };
                    setForm({ ...form, lines });
                  }}
                  className="flex-1 rounded border border-slate-300 px-2 py-2 text-sm"
                >
                  <option value="">Product…</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.sku} — {p.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Qty"
                  value={line.quantityOrdered}
                  onChange={(e) => {
                    const lines = [...form.lines];
                    lines[i] = { ...lines[i], quantityOrdered: e.target.value };
                    setForm({ ...form, lines });
                  }}
                  className="w-20 rounded border border-slate-300 px-2 py-2 text-sm"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Unit cost"
                  value={line.unitCostCents}
                  onChange={(e) => {
                    const lines = [...form.lines];
                    lines[i] = { ...lines[i], unitCostCents: e.target.value };
                    setForm({ ...form, lines });
                  }}
                  className="w-24 rounded border border-slate-300 px-2 py-2 text-sm"
                />
              </div>
            ))}
            <button
              onClick={() => setForm({ ...form, lines: [...form.lines, { productId: "", quantityOrdered: "", unitCostCents: "" }] })}
              className="mb-4 text-sm text-brand-600 hover:underline"
            >
              + Add line
            </button>
            <div className="flex justify-end gap-2">
              <button onClick={() => setCreating(false)} className="rounded border border-slate-300 px-4 py-2 text-sm font-medium">
                Cancel
              </button>
              <button onClick={createOrder} className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {receiving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">Receive {receiving.poNumber}</h2>
            <ul className="mb-4 divide-y divide-slate-100 text-sm">
              {receiving.lines.map((l) => (
                <li key={l.id} className="py-2">
                  {l.quantityReceived / 1000} / {l.quantityOrdered / 1000} received @ {formatCents(l.unitCostCents)}
                </li>
              ))}
            </ul>
            <p className="mb-2 text-xs text-slate-400">This receives the full remaining quantity on every line.</p>
            <div className="mb-4 flex gap-2">
              <input
                placeholder="Lot number (optional, applied to all lines)"
                value={receiveLot}
                onChange={(e) => setReceiveLot(e.target.value)}
                className="w-1/2 rounded border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                type="date"
                title="Expiration date (optional)"
                value={receiveExpiration}
                onChange={(e) => setReceiveExpiration(e.target.value)}
                className="w-1/2 rounded border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setReceiving(null)} className="rounded border border-slate-300 px-4 py-2 text-sm font-medium">
                Cancel
              </button>
              <button
                onClick={() => receiveAll(receiving)}
                className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Receive all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
