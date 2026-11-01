import { env } from "../../../lib/env.js";
import type { LookupProvider, NormalizedLookupResult } from "./types.js";

interface UpcItemDbResponse {
  code: string;
  items?: {
    title?: string;
    brand?: string;
    category?: string;
    images?: string[];
    description?: string;
  }[];
}

/**
 * UPCitemdb (https://www.upcitemdb.com/api) — general consumer products.
 * The free "trial" endpoint needs no key but is rate-limited (100/day);
 * set UPCITEMDB_API_KEY to use a paid plan's higher-limit endpoint instead.
 */
export const upcItemDbProvider: LookupProvider = {
  key: "upcitemdb",
  isConfigured: () => true,
  async lookup(barcode, signal) {
    const url = env.upcItemDbApiKey
      ? `https://api.upcitemdb.com/prod/v1/lookup?upc=${encodeURIComponent(barcode)}`
      : `https://api.upcitemdb.com/prod/trial/lookup?upc=${encodeURIComponent(barcode)}`;

    const res = await fetch(url, {
      signal,
      headers: {
        Accept: "application/json",
        ...(env.upcItemDbApiKey ? { user_key: env.upcItemDbApiKey, key_type: "3scale" } : {})
      }
    });

    if (res.status === 429) {
      throw new Error("UPCitemdb rate limit exceeded");
    }
    if (!res.ok) {
      throw new Error(`UPCitemdb responded ${res.status}`);
    }

    const data = (await res.json()) as UpcItemDbResponse;
    const item = data.items?.[0];
    if (data.code !== "OK" || !item) return null;

    const result: NormalizedLookupResult = {
      name: item.title ?? null,
      brand: item.brand ?? null,
      category: item.category?.split(">")[0]?.trim() ?? null,
      imageUrl: item.images?.[0] ?? null,
      description: item.description ?? null
    };
    return result.name ? result : null;
  }
};
