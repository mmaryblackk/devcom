import { z } from "zod";
import { cardBrand } from "./cardBrand";

export const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(15, "Card number too short")
    .max(16, "Card number too long")
    .regex(/^\d+$/, "Card number must contain only digits")
    .refine(cardBrand, {
      message: "Invalid card brand",
    }),
  date: z.string(),
  cvc: z
    .string()
    .length(3, "CVC must be 3 digits")
    .regex(/^\d{3}$/, "CVC must contain only digits"),
});

export type CardFormData = z.infer<typeof cardSchema>;
