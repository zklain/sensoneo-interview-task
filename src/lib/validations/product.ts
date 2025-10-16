import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters")
    .trim(),
  packaging: z.enum(["pet", "can", "glass", "tetra", "other"]),
  deposit: z
    .number("Enter deposit value in cents")
    .positive("Deposit must be greater than 0")
    .int("Deposit must be a whole number"),
  volume: z.positive("Specify volume in ml"),
  companyId: z.number("Select a company"),
  registeredById: z.number("Select a user"),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
