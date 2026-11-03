import { useEffect, useRef, useState } from "react";

const ELEMENT_ID = "camera-scanner-region";

interface Props {
  onScan: (code: string) => void;
}

/** Camera-based scanning for tablets/phones without a USB scanner, using html5-qrcode. */
export function CameraScanner({ onScan }: Props) {
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<import("html5-qrcode").Html5Qrcode | null>(null);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    (async () => {
      const { Html5Qrcode } = await import("html5-qrcode");
      if (cancelled) return;
      const scanner = new Html5Qrcode(ELEMENT_ID);
      scannerRef.current = scanner;
      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 220 },
          (decodedText) => onScan(decodedText),
          () => {
            /* per-frame decode failures are normal while aiming the camera */
          }
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not start the camera");
      }
    })();

    return () => {
      cancelled = true;
      scannerRef.current?.stop().catch(() => {});
      scannerRef.current = null;
    };
  }, [active, onScan]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setActive((v) => !v)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        {active ? "Stop camera scan" : "Scan with camera"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {active && <div id={ELEMENT_ID} className="mt-2 w-64 overflow-hidden rounded-lg" />}
    </div>
  );
}
