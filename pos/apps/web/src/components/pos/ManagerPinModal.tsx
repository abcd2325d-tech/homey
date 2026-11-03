import { useState } from "react";
import { Modal } from "../Modal.js";
import { posApi } from "../../lib/posApi.js";
import { ApiError } from "../../lib/api.js";

interface Props {
  title?: string;
  onApproved: (approverId: string) => void;
  onClose: () => void;
}

export function ManagerPinModal({ title = "Manager approval required", onApproved, onClose }: Props) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError(null);
    try {
      const res = await posApi.verifyPin(pin);
      onApproved(res.data.approverId);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not verify PIN");
    } finally {
      setChecking(false);
    }
  }

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit}>
        {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Manager PIN"
          className="w-full rounded border border-slate-300 px-3 py-2 text-center text-xl tracking-widest focus:border-brand-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={checking || pin.length < 4}
          className="mt-4 w-full rounded bg-brand-600 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {checking ? "Checking…" : "Approve"}
        </button>
      </form>
    </Modal>
  );
}
