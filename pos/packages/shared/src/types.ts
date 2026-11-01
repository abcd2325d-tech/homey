// Types shared between the API and the web client.
// Kept intentionally small: the source of truth for shapes is the Prisma
// schema on the backend; this file only holds cross-cutting enums/DTOs that
// both sides need to agree on without importing Prisma client into the browser.

export const ROLES = ["ADMIN", "MANAGER", "CASHIER"] as const;
export type Role = (typeof ROLES)[number];

export const PAYMENT_METHODS = ["CASH", "CARD", "OTHER"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const DISCOUNT_TYPES = ["PERCENT", "FIXED"] as const;
export type DiscountType = (typeof DISCOUNT_TYPES)[number];

export const UNITS_OF_MEASURE = ["EACH", "KG", "G", "LB", "OZ", "LITER", "ML"] as const;
export type UnitOfMeasure = (typeof UNITS_OF_MEASURE)[number];

export const BARCODE_TYPES = ["UPC_A", "UPC_E", "EAN_13", "EAN_8", "CODE128", "OTHER"] as const;
export type BarcodeType = (typeof BARCODE_TYPES)[number];

export const STOCK_MOVEMENT_TYPES = [
  "SALE",
  "REFUND",
  "PURCHASE_RECEIPT",
  "ADJUSTMENT",
  "TRANSFER_IN",
  "TRANSFER_OUT",
  "DAMAGE",
  "COUNT_ADJUSTMENT"
] as const;
export type StockMovementType = (typeof STOCK_MOVEMENT_TYPES)[number];

export const PURCHASE_ORDER_STATUSES = [
  "DRAFT",
  "SENT",
  "PARTIALLY_RECEIVED",
  "RECEIVED",
  "CANCELLED"
] as const;
export type PurchaseOrderStatus = (typeof PURCHASE_ORDER_STATUSES)[number];

export const SALE_STATUSES = [
  "OPEN",
  "HELD",
  "COMPLETED",
  "VOIDED",
  "REFUNDED",
  "PARTIALLY_REFUNDED"
] as const;
export type SaleStatus = (typeof SALE_STATUSES)[number];

export const COSTING_METHODS = ["FIFO", "WEIGHTED_AVERAGE"] as const;
export type CostingMethod = (typeof COSTING_METHODS)[number];

export const STOCK_COUNT_STATUSES = ["OPEN", "COMPLETED", "CANCELLED"] as const;
export type StockCountStatus = (typeof STOCK_COUNT_STATUSES)[number];

export interface ApiErrorBody {
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}
