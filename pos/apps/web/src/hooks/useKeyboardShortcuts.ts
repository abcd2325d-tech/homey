import { useEffect } from "react";

export interface ShortcutMap {
  onNewSale?: () => void; // F2
  onFocusSearch?: () => void; // F3
  onPay?: () => void; // F4
  onVoid?: () => void; // F8
}

export function useKeyboardShortcuts(handlers: ShortcutMap) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "F2":
          e.preventDefault();
          handlers.onNewSale?.();
          break;
        case "F3":
          e.preventDefault();
          handlers.onFocusSearch?.();
          break;
        case "F4":
          e.preventDefault();
          handlers.onPay?.();
          break;
        case "F8":
          e.preventDefault();
          handlers.onVoid?.();
          break;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlers]);
}
