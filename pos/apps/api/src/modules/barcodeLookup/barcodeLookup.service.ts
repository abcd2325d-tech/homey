import { prisma } from "../../lib/prisma.js";
import { env } from "../../lib/env.js";
import { logger } from "../../lib/logger.js";
import { getProviderByKey, type NormalizedLookupResult } from "./providers/index.js";

export interface LookupResponse extends NormalizedLookupResult {
  barcode: string;
  found: boolean;
  provider: string | null;
  cached: boolean;
}

function withTimeout<T>(fn: (signal: AbortSignal) => Promise<T>, ms: number): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fn(controller.signal).finally(() => clearTimeout(timer));
}

/**
 * Looks up a barcode against the configured providers, in order, stopping
 * at the first hit. Every outcome — found or not — is cached by barcode so
 * the same code never triggers a second external request. Pass
 * `forceRefresh` to bypass a cached miss (e.g. the product may have since
 * been added to a provider's database).
 */
export async function lookupBarcode(barcode: string, forceRefresh = false): Promise<LookupResponse> {
  if (!forceRefresh) {
    const cached = await prisma.barcodeLookupCache.findUnique({ where: { barcode } });
    if (cached) {
      return {
        barcode,
        found: cached.found,
        provider: cached.provider,
        cached: true,
        name: cached.normalizedName,
        brand: cached.normalizedBrand,
        category: cached.normalizedCategory,
        imageUrl: cached.normalizedImageUrl,
        description: cached.normalizedDesc
      };
    }
  }

  for (const providerKey of env.barcodeLookupProviders) {
    const provider = getProviderByKey(providerKey);
    if (!provider) {
      logger.warn(`Unknown barcode lookup provider in config: ${providerKey}`);
      continue;
    }
    if (!provider.isConfigured()) {
      continue;
    }

    try {
      const result = await withTimeout((signal) => provider.lookup(barcode, signal), env.barcodeLookupTimeoutMs);
      if (result) {
        await cacheResult(barcode, true, provider.key, result);
        return { barcode, found: true, provider: provider.key, cached: false, ...result };
      }
    } catch (err) {
      logger.warn({ err, provider: provider.key, barcode }, "Barcode lookup provider failed; trying next");
    }
  }

  await cacheResult(barcode, false, null, null);
  return {
    barcode,
    found: false,
    provider: null,
    cached: false,
    name: null,
    brand: null,
    category: null,
    imageUrl: null,
    description: null
  };
}

async function cacheResult(barcode: string, found: boolean, provider: string | null, result: NormalizedLookupResult | null) {
  await prisma.barcodeLookupCache.upsert({
    where: { barcode },
    create: {
      barcode,
      found,
      provider,
      normalizedName: result?.name ?? null,
      normalizedBrand: result?.brand ?? null,
      normalizedCategory: result?.category ?? null,
      normalizedImageUrl: result?.imageUrl ?? null,
      normalizedDesc: result?.description ?? null
    },
    update: {
      found,
      provider,
      normalizedName: result?.name ?? null,
      normalizedBrand: result?.brand ?? null,
      normalizedCategory: result?.category ?? null,
      normalizedImageUrl: result?.imageUrl ?? null,
      normalizedDesc: result?.description ?? null,
      lookedUpAt: new Date()
    }
  });
}
