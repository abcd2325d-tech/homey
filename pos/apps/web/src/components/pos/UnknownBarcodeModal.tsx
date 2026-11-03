import { useEffect, useState } from "react";
import { Modal } from "../Modal.js";
import { ManagerPinModal } from "./ManagerPinModal.js";
import { posApi } from "../../lib/posApi.js";
import { ApiError } from "../../lib/api.js";
import { useAuthStore } from "../../store/auth.js";
import type { Product } from "../../lib/types.js";

interface Props {
  barcode: string;
  onCreated: (product: Product) => void;
  onClose: () => void;
}

/**
 * Shown when a scan doesn't match a local product: looks the barcode up
 * against the configured external providers, lets the cashier edit the
 * fetched data (or fill it in from scratch if nothing was found), and saves
 * it as a new product with the barcode prefilled — without leaving the
 * sale screen.
 */
export function UnknownBarcodeModal({ barcode, onCreated, onClose }: Props) {
  const role = useAuthStore((s) => s.user?.role);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [provider, setProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [needsPin, setNeedsPin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    posApi
      .lookupBarcode(barcode)
      .then((res) => {
        if (cancelled) return;
        setName(res.data.name ?? "");
        setProvider(res.data.found ? res.data.provider : null);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [barcode]);

  async function save(approverId?: string) {
    setError(null);
    if (!name.trim()) {
      setError("Enter a product name");
      return;
    }
    try {
      const res = await posApi.createProduct({
        sku: `BC-${barcode}`,
        name,
        costPriceCents: Math.round(Number(costPrice || 0) * 100),
        sellPriceCents: Math.round(Number(sellPrice || 0) * 100),
        barcodes: [{ code: barcode }],
        approverId
      });
      onCreated(res.data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        setNeedsPin(true);
        return;
      }
      setError(err instanceof ApiError ? err.message : "Could not save the product");
    }
  }

  if (needsPin) {
    return <ManagerPinModal onApproved={(approverId) => save(approverId)} onClose={() => setNeedsPin(false)} />;
  }

  return (
    <Modal title="Unknown barcode" onClose={onClose}>
      <p className="mb-3 text-sm text-slate-500">
        {barcode} isn&apos;t in the catalog yet.{" "}
        {loading ? "Looking it up…" : provider ? `Found via ${provider} — review before saving.` : "Nothing found; fill it in manually."}
      </p>
      {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <label className="mb-2 block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
        />
      </label>
      <div className="mb-3 flex gap-2">
        <label className="flex-1 text-sm">
          <span className="mb-1 block font-medium text-slate-700">Cost price</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
          />
        </label>
        <label className="flex-1 text-sm">
          <span className="mb-1 block font-medium text-slate-700">Sell price</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
          />
        </label>
      </div>
      <button onClick={() => save()} className="w-full rounded bg-brand-600 py-2 font-semibold text-white hover:bg-brand-700">
        {role === "CASHIER" ? "Save (needs manager approval)" : "Save product"}
      </button>
    </Modal>
  );
}
