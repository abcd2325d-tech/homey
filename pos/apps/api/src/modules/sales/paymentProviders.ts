// Real card processing is out of scope here — this is the integration seam a
// real provider (Stripe Terminal, Square, Adyen, ...) would slot into. The
// mock approves everything except a magic test amount, mirroring how real
// test suites use reserved card numbers to exercise the decline path.

export interface ChargeResult {
  success: boolean;
  providerRef?: string;
  declineReason?: string;
}

export interface PaymentProvider {
  charge(amountCents: number): Promise<ChargeResult>;
}

export class MockCardProvider implements PaymentProvider {
  async charge(amountCents: number): Promise<ChargeResult> {
    if (amountCents <= 0) {
      return { success: false, declineReason: "Invalid amount" };
    }
    // Ending in exactly .13 simulates a decline, for testing the failure path.
    if (amountCents % 100 === 13) {
      return { success: false, declineReason: "Card declined (mock)" };
    }
    return { success: true, providerRef: `MOCK-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}` };
  }
}

export const cardProvider: PaymentProvider = new MockCardProvider();
