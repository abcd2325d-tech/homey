import { useEffect, useRef } from "react";

interface Props {
  onScan: (code: string) => void;
  disabled?: boolean;
}

/**
 * A USB barcode scanner in keyboard-wedge mode just "types" the barcode
 * followed by Enter into whatever has focus. This field is focused by
 * default (on mount, after a completed scan, and when the browser window
 * regains focus — e.g. switching back from another app) so a scan lands
 * here without the cashier clicking into it first. It deliberately does
 * NOT steal focus back on blur: the cashier still needs to click into the
 * search box, cart, or a modal, and a scanner's keystrokes land wherever
 * the cashier put focus last, same as any real register.
 */
export function BarcodeInput({ onScan, disabled }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function refocus() {
      if (!disabled) ref.current?.focus();
    }
    refocus();
    window.addEventListener("focus", refocus);
    return () => window.removeEventListener("focus", refocus);
  }, [disabled]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const value = e.currentTarget.value.trim();
    e.currentTarget.value = "";
    if (value) onScan(value);
  }

  return (
    <input
      ref={ref}
      type="text"
      disabled={disabled}
      placeholder="Scan or type a barcode, then Enter…"
      onKeyDown={onKeyDown}
      className="w-full rounded-lg border-2 border-brand-200 bg-white px-4 py-3 text-lg focus:border-brand-500 focus:outline-none"
      autoComplete="off"
    />
  );
}
