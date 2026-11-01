import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { ApiError } from "../../lib/api.js";
import { fromMilliUnits } from "../../lib/format.js";
import type { Location, Product } from "../../lib/types.js";

interface CountLine {
  id: string;
  productId: string;
  countedQuantity: number;
  expectedQuantity: number;
  varianceQuantity: number;
  product: Product;
}
interface Session {
  id: string;
  status: string;
  location: Location;
  lines: CountLine[];
}

export function StockCountsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationId, setLocationId] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [barcode, setBarcode] = useState("");
  const [qty, setQty] = useState("1");
  const [variance, setVariance] = useState<CountLine[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Location[]>("/locations").then((res) => {
      setLocations(res.data);
      if (res.data[0]) setLocationId(res.data[0].id);
    });
  }, []);

  async function start() {
    const res = await api.post<Session>("/stock-counts", { locationId });
    setSession(res.data);
    setVariance(null);
  }

  async function scan() {
    setError(null);
    try {
      const product = await api.get<Product>(`/products/by-barcode/${encodeURIComponent(barcode)}`);
      await api.post(`/stock-counts/${session!.id}/lines`, {
        productId: product.data.id,
        countedQuantity: Math.round(Number(qty) * 1000)
      });
      const refreshed = await api.get<Session>(`/stock-counts/${session!.id}`);
      setSession(refreshed.data);
      setBarcode("");
      setQty("1");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not record count");
    }
  }

  async function complete() {
    const res = await api.post<{ variance: CountLine[] }>(`/stock-counts/${session!.id}/complete`);
    setVariance(res.data.variance);
    setSession(null);
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold text-slate-800">Stock Counts</h1>

      {!session && !variance && (
        <div className="flex items-center gap-2">
          <select value={locationId} onChange={(e) => setLocationId(e.target.value)} className="rounded border border-slate-300 px-2 py-2 text-sm">
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <button onClick={start} className="rounded bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Start count session
          </button>
        </div>
      )}

      {session && (
        <div>
          {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <div className="mb-4 flex gap-2">
            <input
              autoFocus
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && scan()}
              placeholder="Scan barcode"
              className="flex-1 rounded border border-slate-300 px-3 py-2"
            />
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-24 rounded border border-slate-300 px-3 py-2"
            />
            <button onClick={scan} className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
              Record
            </button>
            <button onClick={complete} className="rounded border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
              Complete count
            </button>
          </div>
          <table className="w-full rounded-lg bg-white text-sm shadow-sm">
            <thead className="border-b border-slate-200 text-left text-slate-500">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Expected</th>
                <th className="p-3">Counted</th>
                <th className="p-3">Variance</th>
              </tr>
            </thead>
            <tbody>
              {session.lines.map((l) => (
                <tr key={l.id} className="border-b border-slate-100">
                  <td className="p-3">{l.product.name}</td>
                  <td className="p-3">{fromMilliUnits(l.expectedQuantity)}</td>
                  <td className="p-3">{fromMilliUnits(l.countedQuantity)}</td>
                  <td className={`p-3 font-medium ${l.varianceQuantity !== 0 ? "text-red-600" : "text-emerald-600"}`}>
                    {l.varianceQuantity > 0 ? "+" : ""}
                    {fromMilliUnits(l.varianceQuantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {variance && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Variance report</h2>
          <table className="w-full rounded-lg bg-white text-sm shadow-sm">
            <thead className="border-b border-slate-200 text-left text-slate-500">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Expected</th>
                <th className="p-3">Counted</th>
                <th className="p-3">Variance</th>
              </tr>
            </thead>
            <tbody>
              {variance.map((l) => (
                <tr key={l.id} className="border-b border-slate-100">
                  <td className="p-3">{l.product?.name ?? l.productId}</td>
                  <td className="p-3">{fromMilliUnits(l.expectedQuantity)}</td>
                  <td className="p-3">{fromMilliUnits(l.countedQuantity)}</td>
                  <td className={`p-3 font-medium ${l.varianceQuantity !== 0 ? "text-red-600" : "text-emerald-600"}`}>
                    {l.varianceQuantity > 0 ? "+" : ""}
                    {fromMilliUnits(l.varianceQuantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setVariance(null)} className="mt-4 rounded border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            Done
          </button>
        </div>
      )}
    </div>
  );
}
