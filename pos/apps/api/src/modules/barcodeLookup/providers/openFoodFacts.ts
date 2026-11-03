import type { LookupProvider, NormalizedLookupResult } from "./types.js";

interface OffResponse {
  status: number;
  product?: {
    product_name?: string;
    brands?: string;
    categories?: string;
    image_url?: string;
    ingredients_text?: string;
    generic_name?: string;
  };
}

/** Open Food Facts: free, open, no API key — https://world.openfoodfacts.org/api */
export const openFoodFactsProvider: LookupProvider = {
  key: "openfoodfacts",
  isConfigured: () => true,
  async lookup(barcode, signal) {
    const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`, {
      signal,
      headers: { "User-Agent": "pos-system - https://example.com" }
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Open Food Facts responded ${res.status}`);
    }

    const data = (await res.json()) as OffResponse;
    if (data.status !== 1 || !data.product) return null;

    const result: NormalizedLookupResult = {
      name: data.product.product_name ?? null,
      brand: data.product.brands ?? null,
      category: data.product.categories?.split(",")[0]?.trim() ?? null,
      imageUrl: data.product.image_url ?? null,
      description: data.product.generic_name || data.product.ingredients_text || null
    };
    return result.name ? result : null;
  }
};
