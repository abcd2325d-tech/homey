import { formatCents } from "../../lib/format.js";
import type { Product } from "../../lib/types.js";

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

export function ProductGrid({ products, onSelect }: Props) {
  if (products.length === 0) {
    return <p className="p-6 text-center text-slate-400">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 overflow-y-auto p-3 sm:grid-cols-3 md:grid-cols-4">
      {products.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p)}
          className="flex flex-col items-start rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm hover:border-brand-400 hover:shadow-md"
        >
          <span className="line-clamp-2 text-sm font-medium text-slate-800">{p.name}</span>
          <span className="mt-1 text-xs text-slate-400">{p.sku}</span>
          <span className="mt-2 text-lg font-bold text-brand-600">{formatCents(p.sellPriceCents)}</span>
        </button>
      ))}
    </div>
  );
}
