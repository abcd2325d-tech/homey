import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { formatCents } from "../../lib/format.js";
import type { Location } from "../../lib/types.js";

interface DailySales {
  grossSalesCents: number;
  discountCents: number;
  taxCents: number;
  refundsCents: number;
  netSalesCents: number;
  transactionCount: number;
  paymentBreakdown: Record<string, number>;
  cashierBreakdown: { cashierId: string; name: string; salesCents: number; transactionCount: number }[];
}
interface ProductLine {
  productId: string;
  sku: string;
  name: string;
  quantitySold: number;
  revenueCents: number;
}
interface ValuationLine {
  productId: string;
  sku: string;
  name: string;
  quantityOnHand: number;
  valueCents: number;
}

export function ReportsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationId, setLocationId] = useState("");
  const [summary, setSummary] = useState<DailySales | null>(null);
  const [topProducts, setTopProducts] = useState<ProductLine[]>([]);
  const [slowMoving, setSlowMoving] = useState<ProductLine[]>([]);
  const [valuation, setValuation] = useState<{ method: string; totalCents: number; lines: ValuationLine[] } | null>(null);
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    api.get<Location[]>("/locations").then((res) => {
      setLocations(res.data);
      if (res.data[0]) setLocationId(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!locationId) return;
    api.get<DailySales>(`/reports/daily-sales?locationId=${locationId}`).then((r) => setSummary(r.data));
    api.get<ProductLine[]>(`/reports/top-products?locationId=${locationId}&limit=5`).then((r) => setTopProducts(r.data));
    api.get<ProductLine[]>(`/reports/slow-moving?locationId=${locationId}&limit=5`).then((r) => setSlowMoving(r.data));
    api
      .get<{ method: string; totalCents: number; lines: ValuationLine[] }>(`/reports/inventory-valuation?locationId=${locationId}`)
      .then((r) => setValuation(r.data));
    api.get<{ id: string }[]>(`/stock/low-stock?locationId=${locationId}`).then((r) => setLowStockCount(r.data.length));
  }, [locationId]);

  function exportCsv() {
    window.open(`${import.meta.env.VITE_API_URL || "/api"}/reports/daily-sales/export.csv?locationId=${locationId}`, "_blank");
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Reports &amp; Dashboard</h1>
        <div className="flex items-center gap-2">
          <select value={locationId} onChange={(e) => setLocationId(e.target.value)} className="rounded border border-slate-300 px-2 py-2 text-sm">
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <button onClick={exportCsv} className="rounded border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">
            Export today's sales (CSV)
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        <StatCard label="Today's sales" value={summary ? formatCents(summary.netSalesCents) : "—"} />
        <StatCard label="Transactions" value={summary ? String(summary.transactionCount) : "—"} />
        <StatCard label="Tax collected" value={summary ? formatCents(summary.taxCents) : "—"} />
        <StatCard label="Low stock alerts" value={String(lowStockCount)} highlight={lowStockCount > 0} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <section className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 font-semibold">Payment breakdown</h2>
          {summary &&
            Object.entries(summary.paymentBreakdown).map(([method, cents]) => (
              <div key={method} className="flex justify-between text-sm">
                <span>{method}</span>
                <span>{formatCents(cents)}</span>
              </div>
            ))}
        </section>

        <section className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 font-semibold">Cashier performance</h2>
          {summary?.cashierBreakdown.map((c) => (
            <div key={c.cashierId} className="flex justify-between text-sm">
              <span>{c.name}</span>
              <span>
                {formatCents(c.salesCents)} ({c.transactionCount})
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 font-semibold">Top sellers</h2>
          {topProducts.map((p) => (
            <div key={p.productId} className="flex justify-between text-sm">
              <span>{p.name}</span>
              <span>{formatCents(p.revenueCents)}</span>
            </div>
          ))}
        </section>

        <section className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 font-semibold">Slow-moving stock</h2>
          {slowMoving.map((p) => (
            <div key={p.productId} className="flex justify-between text-sm">
              <span>{p.name}</span>
              <span>{p.quantitySold / 1000} sold</span>
            </div>
          ))}
        </section>

        <section className="col-span-2 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 font-semibold">
            Inventory value ({valuation?.method}): {valuation ? formatCents(valuation.totalCents) : "—"}
          </h2>
          <div className="max-h-48 overflow-y-auto">
            {valuation?.lines.map((l) => (
              <div key={l.productId} className="flex justify-between text-sm">
                <span>{l.name}</span>
                <span>{formatCents(l.valueCents)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-4 shadow-sm ${highlight ? "bg-red-50" : "bg-white"}`}>
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? "text-red-600" : "text-slate-800"}`}>{value}</p>
    </div>
  );
}
