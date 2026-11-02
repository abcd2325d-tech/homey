import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import * as customersService from "./customers.service.js";

export const customersRouter = Router();
// Any authenticated role can look up/attach a customer at the register;
// only the lookup/attach actions need to be this open — cashiers use this
// to find a customer mid-sale, not to manage the customer list at large.
customersRouter.use(requireAuth);

const listQuerySchema = z.object({
  search: z.string().max(200).optional(),
  take: z.coerce.number().int().min(1).max(200).default(50),
  skip: z.coerce.number().int().min(0).default(0)
});

customersRouter.get("/", validate({ query: listQuerySchema }), async (req, res) => {
  res.json({ data: await customersService.listCustomers(req.query as unknown as z.infer<typeof listQuerySchema>) });
});

const idParamsSchema = z.object({ id: z.string().min(1) });

customersRouter.get("/:id", validate({ params: idParamsSchema }), async (req, res) => {
  res.json({ data: await customersService.getCustomer(req.params.id) });
});

const createSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().max(30).nullable().optional(),
  email: z.string().email().max(200).nullable().optional()
});

customersRouter.post("/", validate({ body: createSchema }), async (req, res) => {
  const customer = await customersService.createCustomer(req.body);
  res.status(201).json({ data: customer });
});

customersRouter.patch(
  "/:id",
  validate({ params: idParamsSchema, body: createSchema.partial() }),
  async (req, res) => {
    const customer = await customersService.updateCustomer(req.params.id, req.body);
    res.json({ data: customer });
  }
);
