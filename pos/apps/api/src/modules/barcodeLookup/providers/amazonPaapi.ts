import { env } from "../../../lib/env.js";
import { signSigV4Request } from "../../../lib/awsSigV4.js";
import type { LookupProvider, NormalizedLookupResult } from "./types.js";

interface SearchItemsResponse {
  SearchResult?: {
    Items?: {
      ItemInfo?: {
        Title?: { DisplayValue?: string };
        ByLineInfo?: { Brand?: { DisplayValue?: string } };
        Classifications?: { ProductGroup?: { DisplayValue?: string } };
        Features?: { DisplayValues?: string[] };
      };
      Images?: { Primary?: { Large?: { URL?: string } } };
    }[];
  };
  Errors?: { Message?: string }[];
}

/**
 * Amazon Product Advertising API v5 — requires an approved Associates
 * account. PA-API's GetItems operation needs an ASIN, not a UPC/EAN, so
 * this uses SearchItems with the barcode as a keyword search (Amazon
 * indexes UPC/EAN as searchable text for most listings); it's a
 * best-effort match, not a guaranteed exact lookup like the other
 * providers. Disabled automatically when no credentials are configured.
 */
export const amazonPaapiProvider: LookupProvider = {
  key: "amazon",
  isConfigured: () => Boolean(env.amazon.accessKey && env.amazon.secretKey && env.amazon.partnerTag),
  async lookup(barcode, signal) {
    const host = env.amazon.host;
    const path = "/paapi5/searchitems";
    const payload = JSON.stringify({
      Keywords: barcode,
      SearchIndex: "All",
      ItemCount: 1,
      PartnerTag: env.amazon.partnerTag,
      PartnerType: "Associates",
      Resources: [
        "ItemInfo.Title",
        "ItemInfo.ByLineInfo",
        "ItemInfo.Classifications",
        "ItemInfo.Features",
        "Images.Primary.Large"
      ]
    });

    const headers = signSigV4Request({
      accessKey: env.amazon.accessKey,
      secretKey: env.amazon.secretKey,
      region: env.amazon.region,
      service: "ProductAdvertisingAPI",
      host,
      path,
      payload,
      extraHeaders: {
        "x-amz-target": "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems",
        "content-encoding": "amz-1.0"
      }
    });

    const res = await fetch(`https://${host}${path}`, { method: "POST", headers, body: payload, signal });
    if (!res.ok) {
      throw new Error(`Amazon PA-API responded ${res.status}`);
    }

    const data = (await res.json()) as SearchItemsResponse;
    if (data.Errors?.length) {
      throw new Error(data.Errors[0].Message ?? "Amazon PA-API error");
    }

    const item = data.SearchResult?.Items?.[0];
    if (!item?.ItemInfo?.Title?.DisplayValue) return null;

    const result: NormalizedLookupResult = {
      name: item.ItemInfo.Title.DisplayValue,
      brand: item.ItemInfo.ByLineInfo?.Brand?.DisplayValue ?? null,
      category: item.ItemInfo.Classifications?.ProductGroup?.DisplayValue ?? null,
      imageUrl: item.Images?.Primary?.Large?.URL ?? null,
      description: item.ItemInfo.Features?.DisplayValues?.join(" ") ?? null
    };
    return result;
  }
};
