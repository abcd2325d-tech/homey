import "dotenv/config";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isTest: process.env.NODE_ENV === "test",
  port: Number(process.env.PORT ?? 4000),
  clientOrigin: (process.env.CLIENT_ORIGIN ?? "http://localhost:5173").split(","),
  logLevel: process.env.LOG_LEVEL ?? "info",

  jwtAccessSecret: required("JWT_ACCESS_SECRET", "dev-access-secret-change-me"),
  jwtRefreshSecret: required("JWT_REFRESH_SECRET", "dev-refresh-secret-change-me"),
  jwtAccessTtl: process.env.JWT_ACCESS_TTL ?? "15m",
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL ?? "30d",

  barcodeLookupProviders: (process.env.BARCODE_LOOKUP_PROVIDERS ?? "openfoodfacts,amazon")
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean),
  barcodeLookupTimeoutMs: Number(process.env.BARCODE_LOOKUP_TIMEOUT_MS ?? 4000),
  upcItemDbApiKey: process.env.UPCITEMDB_API_KEY ?? "",
  amazon: {
    accessKey: process.env.AMAZON_PAAPI_ACCESS_KEY ?? "",
    secretKey: process.env.AMAZON_PAAPI_SECRET_KEY ?? "",
    partnerTag: process.env.AMAZON_PAAPI_PARTNER_TAG ?? "",
    region: process.env.AMAZON_PAAPI_REGION ?? "us-east-1",
    host: process.env.AMAZON_PAAPI_HOST ?? "webservices.amazon.com"
  }
};
