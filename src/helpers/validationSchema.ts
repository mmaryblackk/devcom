import { z } from "zod";

export const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(15, "Card number too short")
    .max(16, "Card number too long")
    .regex(/^\d+$/, "Card number must contain only digits")
    .regex(/^[345]/, "Card number must start with 3, 4 or 5"),
  expiredMonth: z
    .string()
    .length(2, "Invalid format")
    .refine((val) => Number(val) >= 1 && Number(val) <= 12, {
      message: "Invalid month",
    }),
  expiredYear: z
    .string()
    .length(2, "Invalid format")
    .refine((val) => Number(val) >= 25 && Number(val) <= 35, {
      message: "Invalid year",
    }),
  cvcNumber: z
    .string()
    .length(3, "CVC must contain 3 digits")
    .regex(/^\d+$/, "CVC must contain only digits"),
});
