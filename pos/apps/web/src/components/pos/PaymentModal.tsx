import { useState } from "react";
import { Modal } from "../Modal.js";
import { formatCents } from "../../lib/format.js";
import { posApi } from "../../lib/posApi.js";
import { ApiError } from "../../lib/api.js";
import type { PaymentMethod } from "@pos/shared";
import type { Sale } from "../../lib/types.js";

interface Props {
  sale: Sale;
  onCompleted: (sale: Sale) => void;
  onClose: () => void;
}

function remainingCents(sale: Sale): number {
  const paid = sale.payments.reduce((sum, p) => sum + p.amountCents, 0);
  return Math.max(sale.totalCents - paid, 0);
}

export function PaymentModal({ sale: initialSale, onCompleted, onClose }: Props) {
  const [sale, setSale] = useState(initialSale);
  const [method, setMethod] = useState<PaymentMethod>("CASH");
  const [tendered, setTendered] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [lastChange, setLastChange] = useState<number | null>(null);

  const remaining = remainingCents(sale);

  async function pay(amountCents: number) {
    setBusy(true);
    setError(null);
    try {
      const tenderedCents = method === "CASH" && tendered ? Math.round(Number(tendered) * 100) : undefined;
      const payment = await posApi.addPayment(sale.id, method, amountCents, tenderedCents);
      setLastChange(payment.data.changeCents ?? null);
      const refreshed = await posApi.getSale(sale.id);
      setSale(refreshed.data);
      setTendered("");

      if (remainingCents(refreshed.data) <= 0) {
        const completed = await posApi.complete(sale.id);
        onCompleted(completed.data);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Payment failed");
    } finally {
      setBusy(false);
    }
  }

  const tenderedCents = tendered ? Math.round(Number(tendered) * 100) : remaining;
  const projectedChange = method === "CASH" ? Math.max(tenderedCents - remaining, 0) : 0;

  return (
    <Modal title="Take payment" onClose={onClose}>
      <div className="mb-4 flex justify-between text-lg font-bold text-slate-900">
        <span>Remaining</span>
        <span>{formatCents(remaining)}</span>
      </div>

      {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {lastChange !== null && lastChange > 0 && (
        <p className="mb-3 rounded bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          Change due: {formatCents(lastChange)}
        </p>
      )}

      <div className="mb-3 flex gap-2">
        {(["CASH", "CARD", "OTHER"] as PaymentMethod[]).map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`flex-1 rounded border px-3 py-2 text-sm font-medium ${method === m ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-300 text-slate-600"}`}
          >
            {m}
          </button>
        ))}
      </div>

      {method === "CASH" && (
        <div className="mb-3">
          <label className="mb-1 block text-sm text-slate-600">Cash tendered</label>
          <input
            type="number"
            min="0"
            step="0.01"
            autoFocus
            value={tendered}
            onChange={(e) => setTendered(e.target.value)}
            placeholder={(remaining / 100).toFixed(2)}
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
          />
          {projectedChange > 0 && <p className="mt-1 text-sm text-slate-500">Change: {formatCents(projectedChange)}</p>}
        </div>
      )}

      <div className="flex gap-2">
        <button
          disabled={busy || remaining <= 0}
          onClick={() => pay(remaining)}
          className="flex-1 rounded bg-brand-600 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          Pay {formatCents(remaining)}
        </button>
        {method !== "CARD" && (
          <button
            disabled={busy}
            onClick={() => {
              const half = Math.round(remaining / 2);
              pay(half);
            }}
            className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Split half
          </button>
        )}
      </div>
    </Modal>
  );
}
