export interface NormalizedLookupResult {
  name: string | null;
  brand: string | null;
  category: string | null;
  imageUrl: string | null;
  description: string | null;
}

export interface LookupProvider {
  /** Lowercase key matching BARCODE_LOOKUP_PROVIDERS entries, e.g. "openfoodfacts". */
  readonly key: string;
  /** False when the provider's required config (API keys) isn't set — the orchestrator skips it. */
  isConfigured(): boolean;
  /** Returns null if the provider doesn't have this barcode (not an error). Throws on network/API errors. */
  lookup(barcode: string, signal: AbortSignal): Promise<NormalizedLookupResult | null>;
}
