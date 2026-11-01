import { useCallback, useEffect, useRef, useState } from "react";
import { posApi } from "../../lib/posApi.js";
import { ApiError } from "../../lib/api.js";
import { api } from "../../lib/api.js";
import { BarcodeInput } from "../../components/pos/BarcodeInput.js";
import { CameraScanner } from "../../components/pos/CameraScanner.js";
import { ProductGrid } from "../../components/pos/ProductGrid.js";
import { CartPanel } from "../../components/pos/CartPanel.js";
import { PaymentModal } from "../../components/pos/PaymentModal.js";
import { DiscountModal } from "../../components/pos/DiscountModal.js";
import { ManagerPinModal } from "../../components/pos/ManagerPinModal.js";
import { UnknownBarcodeModal } from "../../components/pos/UnknownBarcodeModal.js";
import { Modal } from "../../components/Modal.js";
import { useScanSound } from "../../hooks/useScanSound.js";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts.js";
import { formatCents } from "../../lib/format.js";
import type { Location, Product, Sale } from "../../lib/types.js";

export function PosPage() {
  const { playSuccess, playError } = useScanSound();
  const searchRef = useRef<HTMLInputElement>(null);

  const [locations, setLocations] = useState<Location[]>([]);
  const [locationId, setLocationId] = useState<string>("");
  const [sale, setSale] = useState<Sale | null>(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const [unknownBarcode, setUnknownBarcode] = useState<string | null>(null);
  const [discountLineId, setDiscountLineId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showHeld, setShowHeld] = useState(false);
  const [heldSales, setHeldSales] = useState<Sale[]>([]);
  const [voidPrompt, setVoidPrompt] = useState(false);
  const [voidReason, setVoidReason] = useState("");
  const [lastReceipt, setLastReceipt] = useState<Sale | null>(null);

  useEffect(() => {
    api.get<Location[]>("/locations").then((res) => {
      setLocations(res.data);
      if (res.data[0]) setLocationId(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (search.trim().length < 2) {
      setResults([]);
      return;
    }
    const handle = setTimeout(() => {
      posApi.searchProducts(search).then((res) => setResults(res.data));
    }, 200);
    return () => clearTimeout(handle);
  }, [search]);

  const ensureSale = useCallback(async (): Promise<Sale> => {
    if (sale) return sale;
    const res = await posApi.createSale(locationId);
    setSale(res.data);
    return res.data;
  }, [sale, locationId]);

  const addToCart = useCallback(
    async (product: Product) => {
      try {
        const current = await ensureSale();
        const res = await posApi.addLine(current.id, product.id, 1000);
        setSale(res.data);
        playSuccess();
      } catch (err) {
        playError();
        setNotice(err instanceof ApiError ? err.message : "Could not add item");
      }
    },
    [ensureSale, playSuccess, playError]
  );

  const onScan = useCallback(
    async (code: string) => {
      try {
        const res = await posApi.findByBarcode(code);
        await addToCart(res.data);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          playError();
          setUnknownBarcode(code);
        } else {
          playError();
          setNotice(err instanceof ApiError ? err.message : "Scan failed");
        }
      }
    },
    [addToCart, playError]
  );

  async function startNewSale() {
    if (sale && sale.lines.length > 0 && (sale.status === "OPEN" || sale.status === "HELD")) {
      try {
        await posApi.hold(sale.id, "Auto-held (new sale started)");
      } catch {
        // The in-progress cart couldn't be held (e.g. already completed/voided
        // elsewhere) — starting a fresh sale still shouldn't be blocked by that.
      }
    }
    const res = await posApi.createSale(locationId);
    setSale(res.data);
  }

  async function openHeldCarts() {
    const res = await posApi.listHeld(locationId);
    setHeldSales(res.data);
    setShowHeld(true);
  }

  async function recall(id: string) {
    const res = await posApi.recall(id);
    setSale(res.data);
    setShowHeld(false);
  }

  async function changeQty(lineId: string, newQty: number) {
    if (!sale) return;
    if (newQty <= 0) {
      const res = await posApi.removeLine(sale.id, lineId);
      setSale(res.data);
      return;
    }
    const res = await posApi.updateLineQty(sale.id, lineId, newQty);
    setSale(res.data);
  }

  async function removeLine(lineId: string) {
    if (!sale) return;
    const res = await posApi.removeLine(sale.id, lineId);
    setSale(res.data);
  }

  async function doVoid(approverId?: string) {
    if (!sale) return;
    try {
      await posApi.void(sale.id, voidReason || "No reason given", approverId);
      setSale(null);
      setVoidPrompt(false);
      setVoidReason("");
    } catch (err) {
      if (!(err instanceof ApiError && err.status === 403)) {
        setNotice(err instanceof ApiError ? err.message : "Could not void sale");
      }
      throw err;
    }
  }

  useKeyboardShortcuts({
    onNewSale: () => void startNewSale(),
    onFocusSearch: () => searchRef.current?.focus(),
    onPay: () => sale && sale.lines.length > 0 && setShowPayment(true),
    onVoid: () => sale && setVoidPrompt(true)
  });

  if (lastReceipt) {
    return <ReceiptView sale={lastReceipt} onNewSale={() => { setLastReceipt(null); void startNewSale(); }} />;
  }

  return (
    <div className="grid h-full grid-cols-3">
      <div className="col-span-2 flex flex-col border-r border-slate-200">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white p-3">
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="rounded border border-slate-300 px-2 py-2 text-sm"
          >
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <div className="flex-1">
            <BarcodeInput onScan={onScan} disabled={!locationId} />
          </div>
          <CameraScanner onScan={onScan} />
        </div>
        <div className="border-b border-slate-200 bg-white p-3">
          <input
            ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name or SKU (F3)"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        {notice && (
          <p className="bg-amber-50 px-3 py-2 text-sm text-amber-800" onClick={() => setNotice(null)}>
            {notice}
          </p>
        )}
        <div className="flex-1 overflow-y-auto">
          <ProductGrid products={results} onSelect={addToCart} />
        </div>
      </div>

      <div className="flex flex-col bg-white">
        <CartPanel
          sale={sale}
          onQtyChange={changeQty}
          onRemoveLine={removeLine}
          onDiscount={(lineId) => setDiscountLineId(lineId)}
        />
        <div className="grid grid-cols-2 gap-2 border-t border-slate-200 p-3">
          <button onClick={() => void startNewSale()} className="rounded border border-slate-300 py-2 text-sm font-medium hover:bg-slate-50">
            New sale (F2)
          </button>
          <button onClick={() => void openHeldCarts()} className="rounded border border-slate-300 py-2 text-sm font-medium hover:bg-slate-50">
            Held carts
          </button>
          <button
            onClick={() => sale && posApi.hold(sale.id).then((res) => setSale(res.data))}
            disabled={!sale || sale.lines.length === 0}
            className="rounded border border-slate-300 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-40"
          >
            Hold
          </button>
          <button
            onClick={() => sale && setVoidPrompt(true)}
            disabled={!sale}
            className="rounded border border-red-200 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-40"
          >
            Void (F8)
          </button>
          <button
            onClick={() => setShowPayment(true)}
            disabled={!sale || sale.lines.length === 0}
            className="col-span-2 rounded bg-brand-600 py-3 text-lg font-bold text-white hover:bg-brand-700 disabled:opacity-40"
          >
            Pay (F4) {sale ? formatCents(sale.totalCents) : ""}
          </button>
        </div>
      </div>

      {showPayment && sale && (
        <PaymentModal
          sale={sale}
          onClose={() => setShowPayment(false)}
          onCompleted={(completed) => {
            setShowPayment(false);
            setSale(completed);
            setLastReceipt(completed);
          }}
        />
      )}

      {discountLineId && sale && (
        <DiscountModal
          saleId={sale.id}
          lineId={discountLineId}
          onClose={() => setDiscountLineId(null)}
          onApplied={(updated) => {
            setSale(updated);
            setDiscountLineId(null);
          }}
        />
      )}

      {unknownBarcode && (
        <UnknownBarcodeModal
          barcode={unknownBarcode}
          onClose={() => setUnknownBarcode(null)}
          onCreated={(product) => {
            setUnknownBarcode(null);
            void addToCart(product);
          }}
        />
      )}

      {showHeld && (
        <Modal title="Held carts" onClose={() => setShowHeld(false)}>
          {heldSales.length === 0 && <p className="text-sm text-slate-400">No held carts.</p>}
          <ul className="divide-y divide-slate-100">
            {heldSales.map((s) => (
              <li key={s.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">{s.heldLabel || "Held sale"}</p>
                  <p className="text-xs text-slate-400">{s.lines.length} items · {formatCents(s.totalCents)}</p>
                </div>
                <button onClick={() => recall(s.id)} className="rounded bg-brand-600 px-3 py-1 text-sm font-medium text-white hover:bg-brand-700">
                  Recall
                </button>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {voidPrompt && sale && (
        <VoidModal
          reason={voidReason}
          onReasonChange={setVoidReason}
          onVoid={doVoid}
          onClose={() => setVoidPrompt(false)}
        />
      )}
    </div>
  );
}

function VoidModal({
  reason,
  onReasonChange,
  onVoid,
  onClose
}: {
  reason: string;
  onReasonChange: (v: string) => void;
  onVoid: (approverId?: string) => Promise<void>;
  onClose: () => void;
}) {
  const [needsPin, setNeedsPin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function attempt(approverId?: string) {
    try {
      await onVoid(approverId);
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        setNeedsPin(true);
      } else {
        setError(err instanceof ApiError ? err.message : "Could not void");
      }
    }
  }

  if (needsPin) {
    return <ManagerPinModal title="Void requires manager approval" onApproved={(id) => attempt(id)} onClose={() => setNeedsPin(false)} />;
  }

  return (
    <Modal title="Void sale" onClose={onClose}>
      {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <input
        value={reason}
        onChange={(e) => onReasonChange(e.target.value)}
        placeholder="Reason for void"
        className="mb-3 w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
      />
      <button onClick={() => attempt()} className="w-full rounded bg-red-600 py-2 font-semibold text-white hover:bg-red-700">
        Void sale
      </button>
    </Modal>
  );
}

function ReceiptView({ sale, onNewSale }: { sale: Sale; onNewSale: () => void }) {
  return (
    <div className="flex h-full items-center justify-center bg-slate-100">
      <div className="w-96 rounded-xl bg-white p-6 shadow-lg" id="receipt">
        <h2 className="mb-1 text-center text-lg font-bold">Receipt #{sale.receiptNumber}</h2>
        <p className="mb-4 text-center text-xs text-slate-400">{new Date(sale.completedAt ?? Date.now()).toLocaleString()}</p>
        <ul className="mb-3 divide-y divide-slate-100 text-sm">
          {sale.lines.map((l) => (
            <li key={l.id} className="flex justify-between py-1">
              <span>
                {l.product.name} × {l.quantity / 1000}
              </span>
              <span>{formatCents(l.lineTotalCents)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-slate-200 pt-2 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Tax</span>
            <span>{formatCents(sale.taxCents)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatCents(sale.totalCents)}</span>
          </div>
        </div>
        <button onClick={onNewSale} className="mt-5 w-full rounded bg-brand-600 py-2 font-semibold text-white hover:bg-brand-700">
          New sale
        </button>
      </div>
    </div>
  );
}
