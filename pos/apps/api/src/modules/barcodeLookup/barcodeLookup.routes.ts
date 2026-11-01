import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { lookupBarcode } from "./barcodeLookup.service.js";

export const barcodeLookupRouter = Router();
barcodeLookupRouter.use(requireAuth);

const paramsSchema = z.object({ code: z.string().min(1).max(64) });
const querySchema = z.object({ forceRefresh: z.coerce.boolean().optional() });

// Called when a scan at the register doesn't match a local product: the
// register shows the result as a confirmation screen (editable cost/sell
// price, quantity, category) before POSTing to /api/products to save it.
barcodeLookupRouter.get(
  "/:code",
  validate({ params: paramsSchema, query: querySchema }),
  async (req, res) => {
    const query = req.query as unknown as z.infer<typeof querySchema>;
    const result = await lookupBarcode(req.params.code, query.forceRefresh === true);
    res.json({ data: result });
  }
);
