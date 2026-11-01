import { formatCents, fromMilliUnits } from "../../lib/format.js";
import type { Sale } from "../../lib/types.js";

interface Props {
  sale: Sale | null;
  onQtyChange: (lineId: string, newQuantityMilliUnits: number) => void;
  onRemoveLine: (lineId: string) => void;
  onDiscount: (lineId: string) => void;
}

export function CartPanel({ sale, onQtyChange, onRemoveLine, onDiscount }: Props) {
  if (!sale) {
    return <div className="flex h-full items-center justify-center text-slate-400">Start a new sale</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        {sale.lines.length === 0 && <p className="p-6 text-center text-slate-400">Cart is empty — scan or select an item</p>}
        <ul className="divide-y divide-slate-100">
          {sale.lines.map((line) => (
            <li key={line.id} className="flex items-center gap-2 px-3 py-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{line.product.name}</p>
                <p className="text-xs text-slate-400">
                  {formatCents(line.unitPriceCents)} × {fromMilliUnits(line.quantity)}
                  {line.discountCents > 0 && <span className="ml-2 text-amber-600">−{formatCents(line.discountCents)}</span>}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onQtyChange(line.id, line.quantity - 1000)}
                  className="h-7 w-7 rounded border border-slate-300 text-slate-600 hover:bg-slate-100"
                  disabled={fromMilliUnits(line.quantity) <= 1}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{fromMilliUnits(line.quantity)}</span>
                <button
                  onClick={() => onQtyChange(line.id, line.quantity + 1000)}
                  className="h-7 w-7 rounded border border-slate-300 text-slate-600 hover:bg-slate-100"
                >
                  +
                </button>
              </div>
              <span className="w-20 text-right text-sm font-semibold text-slate-800">
                {formatCents(line.lineTotalCents)}
              </span>
              <button onClick={() => onDiscount(line.id)} className="text-xs font-medium text-brand-600 hover:underline">
                %
              </button>
              <button onClick={() => onRemoveLine(line.id)} className="text-slate-400 hover:text-red-500" aria-label="Remove">
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-200 bg-white p-3 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span>{formatCents(sale.subtotalCents)}</span>
        </div>
        {sale.discountCents > 0 && (
          <div className="flex justify-between text-amber-600">
            <span>Discount</span>
            <span>−{formatCents(sale.discountCents)}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-500">
          <span>Tax</span>
          <span>{formatCents(sale.taxCents)}</span>
        </div>
        <div className="mt-1 flex justify-between text-lg font-bold text-slate-900">
          <span>Total</span>
          <span>{formatCents(sale.totalCents)}</span>
        </div>
      </div>
    </div>
  );
}
