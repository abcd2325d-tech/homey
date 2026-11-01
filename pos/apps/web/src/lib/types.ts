import type { DiscountType, PaymentMethod, SaleStatus } from "@pos/shared";

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  sellPriceCents: number;
  costPriceCents: number;
  unit: string;
  imageUrl: string | null;
  isActive: boolean;
  categoryId: string | null;
  category?: { id: string; name: string } | null;
  taxRate?: { id: string; name: string; rateBasisPoints: number } | null;
  barcodes: { id: string; code: string; type: string; isPrimary: boolean }[];
}

export interface SaleLine {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPriceCents: number;
  unitCostCents: number;
  discountCents: number;
  discountType: DiscountType | null;
  taxCents: number;
  lineTotalCents: number;
  isVoided: boolean;
}

export interface Payment {
  id: string;
  method: PaymentMethod;
  amountCents: number;
  tenderedCents: number | null;
  changeCents: number | null;
  providerRef: string | null;
}

export interface Sale {
  id: string;
  receiptNumber: string | null;
  locationId: string;
  cashierId: string;
  status: SaleStatus;
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
  heldLabel: string | null;
  createdAt: string;
  completedAt: string | null;
  lines: SaleLine[];
  payments: Payment[];
  refunds: { id: string; amountCents: number; reason: string }[];
}

export interface Location {
  id: string;
  name: string;
  address: string | null;
  isActive: boolean;
}

export interface StockItem {
  id: string;
  productId: string;
  locationId: string;
  quantityOnHand: number;
  reorderPoint: number;
  reorderQuantity: number;
  averageCostCents: number;
  product: Product;
  location: Location;
}
