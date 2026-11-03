import { useState } from "react";
import { Modal } from "../Modal.js";
import { posApi } from "../../lib/posApi.js";
import { ApiError } from "../../lib/api.js";
import type { Customer } from "../../lib/types.js";

interface Props {
  onSelect: (customer: Customer) => void;
  onClose: () => void;
}

export function CustomerModal({ onSelect, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Customer[]>([]);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function runSearch(value: string) {
    setSearch(value);
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }
    const res = await posApi.searchCustomers(value);
    setResults(res.data);
  }

  async function createAndSelect() {
    setError(null);
    try {
      const res = await posApi.createCustomer({ name: newName, phone: newPhone || undefined });
      onSelect(res.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create customer");
    }
  }

  return (
    <Modal title="Attach a customer" onClose={onClose}>
      {!creating ? (
        <>
          <input
            autoFocus
            value={search}
            onChange={(e) => void runSearch(e.target.value)}
            placeholder="Search by name or phone"
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
          />
          <ul className="mt-3 max-h-56 divide-y divide-slate-100 overflow-y-auto">
            {results.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => onSelect(c)}
                  className="flex w-full items-center justify-between py-2 text-left hover:bg-slate-50"
                >
                  <span>
                    {c.name} <span className="text-xs text-slate-400">{c.phone}</span>
                  </span>
                  <span className="text-xs font-medium text-brand-600">{c.loyaltyPoints} pts</span>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setCreating(true)} className="mt-3 text-sm font-medium text-brand-600 hover:underline">
            + New customer
          </button>
        </>
      ) : (
        <>
          {error && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name"
            className="mb-2 w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
          />
          <input
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="Phone (optional)"
            className="mb-3 w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
          />
          <button
            onClick={createAndSelect}
            disabled={!newName.trim()}
            className="w-full rounded bg-brand-600 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            Create &amp; attach
          </button>
        </>
      )}
    </Modal>
  );
}
