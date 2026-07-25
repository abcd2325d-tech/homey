import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  password: z.string().min(8).max(200),
  isHost: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const listingSchema = z.object({
  title: z.string().trim().min(3).max(150),
  description: z.string().trim().max(5000).optional().default(""),
  city: z.string().trim().min(1).max(100),
  country: z.string().trim().min(1).max(100),
  pricePerNight: z.number().positive().max(1000000),
  maxGuests: z.number().int().positive().max(50),
  bedrooms: z.number().int().min(0).max(50),
  beds: z.number().int().min(0).max(50),
  baths: z.number().int().min(0).max(50),
  amenities: z.array(z.string()).optional().default([]),
  // Either a normal image URL, or a data: URI produced by resizing a photo
  // client-side before upload (see client/src/components/ListingForm.jsx).
  imageUrl: z
    .string()
    .trim()
    .max(2_000_000, "Photo is too large")
    .refine(
      (val) => val === "" || /^https?:\/\//.test(val) || /^data:image\/(png|jpe?g|webp|gif);base64,/.test(val),
      { message: "Must be a valid image URL or an uploaded photo" }
    )
    .optional()
    .default(""),
  houseRules: z.string().trim().max(2000).optional().default(""),
  cancellationPolicy: z.string().trim().max(2000).optional().default(""),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(2000).optional().default(""),
});

export const messageSchema = z.object({
  body: z.string().trim().min(1).max(2000),
});

export const bookingSchema = z.object({
  listingId: z.number().int().positive(),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.number().int().positive().max(50),
  card: z.object({
    number: z.string().min(12).max(19),
    expiry: z.string().min(4).max(7),
    cvc: z.string().min(3).max(4),
    name: z.string().min(1).max(100),
  }),
});

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      });
    }
    req.validated = result.data;
    next();
  };
}
