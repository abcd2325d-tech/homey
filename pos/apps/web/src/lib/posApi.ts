import { api } from "./api.js";
import type { Product, Sale } from "./types.js";
import type { DiscountType, PaymentMethod } from "@pos/shared";

export const posApi = {
  searchProducts: (search: string) => api.get<Product[]>(`/products?search=${encodeURIComponent(search)}&take=24`),
  findByBarcode: (code: string) => api.get<Product>(`/products/by-barcode/${encodeURIComponent(code)}`),

  createSale: (locationId: string) => api.post<Sale>("/sales", { locationId }),
  getSale: (id: string) => api.get<Sale>(`/sales/${id}`),
  listHeld: (locationId: string) => api.get<Sale[]>(`/sales/held?locationId=${locationId}`),

  addLine: (saleId: string, productId: string, quantityMilliUnits: number) =>
    api.post<Sale>(`/sales/${saleId}/lines`, { productId, quantityMilliUnits }),
  updateLineQty: (saleId: string, lineId: string, quantityMilliUnits: number) =>
    api.patch<Sale>(`/sales/${saleId}/lines/${lineId}`, { quantityMilliUnits }),
  removeLine: (saleId: string, lineId: string) => api.del<Sale>(`/sales/${saleId}/lines/${lineId}`),
  applyDiscount: (
    saleId: string,
    lineId: string,
    discountType: DiscountType,
    discountValue: number,
    approverId?: string
  ) => api.post<Sale>(`/sales/${saleId}/lines/${lineId}/discount`, { discountType, discountValue, approverId }),

  hold: (saleId: string, label?: string) => api.post<Sale>(`/sales/${saleId}/hold`, { label }),
  recall: (saleId: string) => api.post<Sale>(`/sales/${saleId}/recall`),

  addPayment: (saleId: string, method: PaymentMethod, amountCents: number, tenderedCents?: number) =>
    api.post<{ id: string; changeCents: number | null }>(`/sales/${saleId}/payments`, {
      method,
      amountCents,
      tenderedCents
    }),
  complete: (saleId: string) => api.post<Sale>(`/sales/${saleId}/complete`),
  void: (saleId: string, reason: string, approverId?: string) =>
    api.post<Sale>(`/sales/${saleId}/void`, { reason, approverId }),
  refund: (
    saleId: string,
    reason: string,
    lines: { saleLineId: string; quantityMilliUnits: number }[],
    approverId?: string
  ) => api.post<Sale>(`/sales/${saleId}/refund`, { reason, lines, approverId }),

  verifyPin: (pin: string) => api.post<{ approverId: string; approverName: string; role: string }>("/auth/verify-pin", { pin }),

  lookupBarcode: (code: string) =>
    api.get<{
      barcode: string;
      found: boolean;
      provider: string | null;
      name: string | null;
      brand: string | null;
      category: string | null;
      imageUrl: string | null;
      description: string | null;
    }>(`/barcode-lookup/${encodeURIComponent(code)}`),

  createProduct: (input: Record<string, unknown>) => api.post<Product>("/products", input)
};
