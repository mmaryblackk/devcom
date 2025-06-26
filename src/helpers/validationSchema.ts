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
    .length(2)
    .min(1, "Invalid month")
    .max(12, "Invalid month")
    .regex(/^\d+$/, "Date must contain only digits"),
  expiredYear: z
    .string()
    .length(2)
    .min(25, "Invalid year")
    .max(35, "Invalid year")
    .regex(/^\d+$/, "Date must contain only digits"),
  cvcNumber: z
    .string()
    .length(3, "CVC must contain only 3 digits")
    .regex(/^\d+$/, "CVC must contain only digits"),
});
