import { openFoodFactsProvider } from "./openFoodFacts.js";
import { upcItemDbProvider } from "./upcItemDb.js";
import { amazonPaapiProvider } from "./amazonPaapi.js";
import type { LookupProvider } from "./types.js";

export * from "./types.js";

/** Add a new provider by implementing LookupProvider and registering it here. */
export const ALL_PROVIDERS: LookupProvider[] = [upcItemDbProvider, openFoodFactsProvider, amazonPaapiProvider];

export function getProviderByKey(key: string): LookupProvider | undefined {
  return ALL_PROVIDERS.find((p) => p.key === key);
}
