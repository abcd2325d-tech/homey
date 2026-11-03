import { prisma } from "../../src/lib/prisma.js";
import { hashSecret } from "../../src/lib/hash.js";
import { signAccessToken } from "../../src/lib/jwt.js";
import type { Role } from "@pos/shared";

let counter = 0;
function unique(prefix: string) {
  counter += 1;
  return `${prefix}-${Date.now()}-${counter}`;
}

export async function createTestUser(overrides: {
  role?: Role;
  email?: string;
  password?: string;
  pin?: string;
  name?: string;
} = {}) {
  const role = overrides.role ?? "CASHIER";
  const email = overrides.email ?? `${unique("user")}@example.com`;
  const password = overrides.password ?? "password123";
  const name = overrides.name ?? `Test ${role}`;

  const user = await prisma.user.create({
    data: {
      email,
      name,
      role,
      passwordHash: await hashSecret(password),
      pinHash: overrides.pin ? await hashSecret(overrides.pin) : null
    }
  });

  const accessToken = signAccessToken({ sub: user.id, role: role, name: user.name });
  return { user, password, accessToken };
}

export async function createTestLocation(name = "Main Store") {
  return prisma.location.create({ data: { name: unique(name) } });
}

export async function createTestTaxRate(rateBasisPoints = 825) {
  return prisma.taxRate.create({ data: { name: "Standard", rateBasisPoints } });
}

export async function createTestProduct(overrides: Partial<{
  sku: string;
  name: string;
  costPriceCents: number;
  sellPriceCents: number;
  taxRateId: string | null;
  priceIncludesTax: boolean;
  unit: string;
}> = {}) {
  return prisma.product.create({
    data: {
      sku: overrides.sku ?? unique("SKU"),
      name: overrides.name ?? "Test Product",
      costPriceCents: overrides.costPriceCents ?? 500,
      sellPriceCents: overrides.sellPriceCents ?? 1000,
      taxRateId: overrides.taxRateId,
      priceIncludesTax: overrides.priceIncludesTax ?? false,
      unit: overrides.unit ?? "EACH"
    }
  });
}
