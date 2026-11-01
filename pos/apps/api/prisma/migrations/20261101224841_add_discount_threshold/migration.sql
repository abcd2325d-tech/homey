-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StoreSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "storeName" TEXT NOT NULL DEFAULT 'My Store',
    "address" TEXT,
    "taxId" TEXT,
    "logoUrl" TEXT,
    "currencyCode" TEXT NOT NULL DEFAULT 'USD',
    "locale" TEXT NOT NULL DEFAULT 'en-US',
    "defaultTaxRateId" TEXT,
    "receiptFooterText" TEXT,
    "costingMethod" TEXT NOT NULL DEFAULT 'WEIGHTED_AVERAGE',
    "lowStockGlobalAlert" BOOLEAN NOT NULL DEFAULT true,
    "discountApprovalThresholdBasisPoints" INTEGER NOT NULL DEFAULT 2000
);
INSERT INTO "new_StoreSettings" ("address", "costingMethod", "currencyCode", "defaultTaxRateId", "id", "locale", "logoUrl", "lowStockGlobalAlert", "receiptFooterText", "storeName", "taxId") SELECT "address", "costingMethod", "currencyCode", "defaultTaxRateId", "id", "locale", "logoUrl", "lowStockGlobalAlert", "receiptFooterText", "storeName", "taxId" FROM "StoreSettings";
DROP TABLE "StoreSettings";
ALTER TABLE "new_StoreSettings" RENAME TO "StoreSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
