import { useState } from "react";
import { Modal } from "../Modal.js";
import { ManagerPinModal } from "./ManagerPinModal.js";
import { posApi } from "../../lib/posApi.js";
import { ApiError } from "../../lib/api.js";
import type { DiscountType } from "@pos/shared";
import type { Sale } from "../../lib/types.js";

interface Props {
  saleId: string;
  lineId: string;
  onApplied: (sale: Sale) => void;
  onClose: () => void;
}

export function DiscountModal({ saleId, lineId, onApplied, onClose }: Props) {
  const [type, setType] = useState<DiscountType>("PERCENT");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [needsPin, setNeedsPin] = useState(false);

  async function apply(approverId?: string) {
    setError(null);
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric < 0) {
      setError("Enter a valid amount");
      return;
    }
    const discountValue = type === "PERCENT" ? Math.round(numeric * 100) : Math.round(numeric * 100);
    try {
      const res = await posApi.applyDiscount(saleId, lineId, type, discountValue, approverId);
      onApplied(res.data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        setNeedsPin(true);
        return;
      }
      setError(err instanceof ApiError ? err.message : "Could not apply discount");
    }
  }

  if (needsPin) {
    return (
      <ManagerPinModal
        title="Discount needs manager approval"
        onApproved={(approverId) => apply(approverId)}
        onClose={() => setNeedsPin(false)}
      />
    );
  }

  return (
    <Modal title="Apply discount" onClose={onClose}>
      {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setType("PERCENT")}
          className={`flex-1 rounded border px-3 py-2 text-sm font-medium ${type === "PERCENT" ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-300 text-slate-600"}`}
        >
          Percent %
        </button>
        <button
          onClick={() => setType("FIXED")}
          className={`flex-1 rounded border px-3 py-2 text-sm font-medium ${type === "FIXED" ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-300 text-slate-600"}`}
        >
          Fixed $
        </button>
      </div>
      <input
        type="number"
        min="0"
        step="0.01"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={type === "PERCENT" ? "e.g. 10 for 10%" : "e.g. 2.00"}
        className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
      />
      <button
        onClick={() => apply()}
        className="mt-4 w-full rounded bg-brand-600 py-2 font-semibold text-white hover:bg-brand-700"
      >
        Apply
      </button>
    </Modal>
  );
}
