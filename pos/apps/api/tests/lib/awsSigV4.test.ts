import { describe, expect, it } from "vitest";
import { signSigV4Request } from "../../src/lib/awsSigV4.js";

describe("signSigV4Request", () => {
  const base = {
    accessKey: "AKIDEXAMPLE",
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    region: "us-east-1",
    service: "ProductAdvertisingAPI",
    host: "webservices.amazon.com",
    path: "/paapi5/searchitems"
  };

  it("produces a well-formed Authorization header", () => {
    const headers = signSigV4Request({ ...base, payload: '{"Keywords":"049000028911"}' });
    expect(headers.Authorization).toMatch(
      /^AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE\/\d{8}\/us-east-1\/ProductAdvertisingAPI\/aws4_request, SignedHeaders=.+, Signature=[0-9a-f]{64}$/
    );
    expect(headers["x-amz-date"]).toMatch(/^\d{8}T\d{6}Z$/);
  });

  it("produces a different signature for a different payload", () => {
    const a = signSigV4Request({ ...base, payload: '{"Keywords":"111"}' });
    const b = signSigV4Request({ ...base, payload: '{"Keywords":"222"}' });
    expect(a.Authorization).not.toBe(b.Authorization);
  });

  it("includes every custom header in the signed-headers list", () => {
    const headers = signSigV4Request({
      ...base,
      payload: "{}",
      extraHeaders: { "x-amz-target": "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems" }
    });
    expect(headers.Authorization).toContain("x-amz-target");
    expect(headers["x-amz-target"]).toBe("com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems");
  });
});
