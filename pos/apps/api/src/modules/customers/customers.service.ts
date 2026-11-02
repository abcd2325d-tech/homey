import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";

export interface ListCustomersParams {
  search?: string;
  take?: number;
  skip?: number;
}

export async function listCustomers(params: ListCustomersParams) {
  const where: Prisma.CustomerWhereInput = params.search
    ? { OR: [{ name: { contains: params.search } }, { phone: { contains: params.search } }, { email: { contains: params.search } }] }
    : {};

  return prisma.customer.findMany({ where, orderBy: { name: "asc" }, take: params.take ?? 50, skip: params.skip ?? 0 });
}

export async function getCustomer(id: string) {
  const customer = await prisma.customer.findUnique({ where: { id } });
  if (!customer) throw Errors.notFound("Customer", id);
  return customer;
}

export interface CreateCustomerInput {
  name: string;
  phone?: string | null;
  email?: string | null;
}

export async function createCustomer(input: CreateCustomerInput) {
  if (input.phone) {
    const existing = await prisma.customer.findUnique({ where: { phone: input.phone } });
    if (existing) throw Errors.conflict("A customer with this phone number already exists");
  }
  return prisma.customer.create({ data: input });
}

export async function updateCustomer(id: string, input: Partial<CreateCustomerInput>) {
  const existing = await prisma.customer.findUnique({ where: { id } });
  if (!existing) throw Errors.notFound("Customer", id);
  return prisma.customer.update({ where: { id }, data: input });
}
