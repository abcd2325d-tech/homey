import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { ApiError } from "../../lib/api.js";
import { formatCents, fromMilliUnits, toMilliUnits } from "../../lib/format.js";
import type { Location, StockItem } from "../../lib/types.js";

export function StockPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationId, setLocationId] = useState("");
  const [items, setItems] = useState<StockItem[]>([]);
  const [adjusting, setAdjusting] = useState<StockItem | null>(null);
  const [delta, setDelta] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Location[]>("/locations").then((res) => {
      setLocations(res.data);
      if (res.data[0]) setLocationId(res.data[0].id);
    });
  }, []);

  async function load() {
    if (!locationId) return;
    const res = await api.get<StockItem[]>(`/stock?locationId=${locationId}`);
    setItems(res.data);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationId]);

  async function submitAdjustment() {
    if (!adjusting) return;
    setError(null);
    try {
      await api.post("/stock/adjustments", {
        productId: adjusting.productId,
        locationId: adjusting.locationId,
        deltaMilliUnits: toMilliUnits(Number(delta)),
        unitCostCents: unitCost ? Math.round(Number(unitCost) * 100) : undefined,
        reason: reason || "Manual adjustment"
      });
      setAdjusting(null);
      setDelta("");
      setUnitCost("");
      setReason("");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Adjustment failed");
    }
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <h1 className="text-xl font-bold text-slate-800">Stock</h1>
        <select value={locationId} onChange={(e) => setLocationId(e.target.value)} className="rounded border border-slate-300 px-2 py-1 text-sm">
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full rounded-lg bg-white text-sm shadow-sm">
        <thead className="border-b border-slate-200 text-left text-slate-500">
          <tr>
            <th className="p-3">SKU</th>
            <th className="p-3">Name</th>
            <th className="p-3">On hand</th>
            <th className="p-3">Reorder point</th>
            <th className="p-3">Avg. cost</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const low = item.quantityOnHand <= item.reorderPoint;
            return (
              <tr key={item.id} className={`border-b border-slate-100 ${low ? "bg-red-50" : ""}`}>
                <td className="p-3 font-mono text-xs">{item.product.sku}</td>
                <td className="p-3">{item.product.name}</td>
                <td className="p-3">
                  {fromMilliUnits(item.quantityOnHand)} {low && <span className="ml-1 text-xs font-semibold text-red-600">LOW</span>}
                </td>
                <td className="p-3 text-slate-500">{fromMilliUnits(item.reorderPoint)}</td>
                <td className="p-3">{formatCents(item.averageCostCents)}</td>
                <td className="p-3 text-right">
                  <button onClick={() => setAdjusting(item)} className="text-brand-600 hover:underline">
                    Adjust
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {adjusting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">Adjust {adjusting.product.name}</h2>
            {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <input
              type="number"
              placeholder="Quantity change (negative to remove)"
              value={delta}
              onChange={(e) => setDelta(e.target.value)}
              className="mb-2 w-full rounded border border-slate-300 px-3 py-2"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Unit cost (optional, for stock-in)"
              value={unitCost}
              onChange={(e) => setUnitCost(e.target.value)}
              className="mb-2 w-full rounded border border-slate-300 px-3 py-2"
            />
            <input
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mb-4 w-full rounded border border-slate-300 px-3 py-2"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setAdjusting(null)} className="rounded border border-slate-300 px-4 py-2 text-sm font-medium">
                Cancel
              </button>
              <button onClick={submitAdjustment} className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
