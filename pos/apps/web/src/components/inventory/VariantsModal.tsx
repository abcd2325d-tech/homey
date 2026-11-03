import { useEffect, useState } from "react";
import { Modal } from "../Modal.js";
import { posApi } from "../../lib/posApi.js";
import { ApiError } from "../../lib/api.js";
import { formatCents } from "../../lib/format.js";
import type { Product } from "../../lib/types.js";

interface Props {
  parent: Product;
  onClose: () => void;
  onChanged: () => void;
}

export function VariantsModal({ parent, onClose, onChanged }: Props) {
  const [variants, setVariants] = useState<Product[]>([]);
  const [sku, setSku] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [costPrice, setCostPrice] = useState((parent.costPriceCents / 100).toFixed(2));
  const [sellPrice, setSellPrice] = useState((parent.sellPriceCents / 100).toFixed(2));
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await posApi.listVariants(parent.id);
    setVariants(res.data);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parent.id]);

  async function addVariant() {
    setError(null);
    try {
      const variantAttributes: Record<string, string> = {};
      if (color) variantAttributes.color = color;
      if (size) variantAttributes.size = size;

      await posApi.createVariant(parent.id, {
        sku,
        costPriceCents: Math.round(Number(costPrice) * 100),
        sellPriceCents: Math.round(Number(sellPrice) * 100),
        variantAttributes: Object.keys(variantAttributes).length ? variantAttributes : undefined,
        barcodes: barcode ? [{ code: barcode }] : undefined
      });

      setSku("");
      setColor("");
      setSize("");
      setBarcode("");
      await load();
      onChanged();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create variant");
    }
  }

  return (
    <Modal title={`Variants of ${parent.name}`} onClose={onClose}>
      {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <ul className="mb-4 max-h-56 divide-y divide-slate-100 overflow-y-auto text-sm">
        {variants.length === 0 && <li className="py-2 text-slate-400">No variants yet.</li>}
        {variants.map((v) => {
          const attrs = v.variantAttributes ? JSON.parse(v.variantAttributes) : {};
          return (
            <li key={v.id} className="flex items-center justify-between py-2">
              <div>
                <span className="font-medium">{[attrs.color, attrs.size].filter(Boolean).join(", ") || v.sku}</span>
                <span className="ml-2 text-xs text-slate-400">{v.sku}</span>
              </div>
              <span className="font-medium text-slate-700">{formatCents(v.sellPriceCents)}</span>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-slate-200 pt-3">
        <p className="mb-2 text-sm font-medium text-slate-600">Add a variant</p>
        <div className="mb-2 flex gap-2">
          <input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} className="w-1/2 rounded border border-slate-300 px-2 py-1.5 text-sm" />
          <input placeholder="Barcode (optional)" value={barcode} onChange={(e) => setBarcode(e.target.value)} className="w-1/2 rounded border border-slate-300 px-2 py-1.5 text-sm" />
        </div>
        <div className="mb-2 flex gap-2">
          <input placeholder="Color (optional)" value={color} onChange={(e) => setColor(e.target.value)} className="w-1/2 rounded border border-slate-300 px-2 py-1.5 text-sm" />
          <input placeholder="Size (optional)" value={size} onChange={(e) => setSize(e.target.value)} className="w-1/2 rounded border border-slate-300 px-2 py-1.5 text-sm" />
        </div>
        <div className="mb-3 flex gap-2">
          <input type="number" step="0.01" placeholder="Cost" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} className="w-1/2 rounded border border-slate-300 px-2 py-1.5 text-sm" />
          <input type="number" step="0.01" placeholder="Sell" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} className="w-1/2 rounded border border-slate-300 px-2 py-1.5 text-sm" />
        </div>
        <button
          onClick={addVariant}
          disabled={!sku.trim()}
          className="w-full rounded bg-brand-600 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          Add variant
        </button>
      </div>
    </Modal>
  );
}
