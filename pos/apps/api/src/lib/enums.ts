import { z } from "zod";
import {
  BARCODE_TYPES,
  COSTING_METHODS,
  DISCOUNT_TYPES,
  PAYMENT_METHODS,
  PURCHASE_ORDER_STATUSES,
  ROLES,
  SALE_STATUSES,
  STOCK_COUNT_STATUSES,
  STOCK_MOVEMENT_TYPES,
  UNITS_OF_MEASURE
} from "@pos/shared";

export * from "@pos/shared";

export const zRole = z.enum(ROLES);
export const zPaymentMethod = z.enum(PAYMENT_METHODS);
export const zDiscountType = z.enum(DISCOUNT_TYPES);
export const zUnitOfMeasure = z.enum(UNITS_OF_MEASURE);
export const zBarcodeType = z.enum(BARCODE_TYPES);
export const zStockMovementType = z.enum(STOCK_MOVEMENT_TYPES);
export const zPurchaseOrderStatus = z.enum(PURCHASE_ORDER_STATUSES);
export const zSaleStatus = z.enum(SALE_STATUSES);
export const zCostingMethod = z.enum(COSTING_METHODS);
export const zStockCountStatus = z.enum(STOCK_COUNT_STATUSES);
