import { z } from "zod";
import {
  cityEnum,
  propertyEnum,
  bhkEnum,
  purposeEnum,
  timelineEnum,
  sourceEnum,
  statusEnum,
} from "./schema";

export const createBuyerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\d{10,15}$/, "Phone must be 10-15 digits"),
  city: cityEnum,
  propertyType: propertyEnum,
  bhk: bhkEnum.optional(),
  purpose: purposeEnum,
  budgetMin: z.number().int().optional(),
  budgetMax: z.number().int().optional(),
  timeline: timelineEnum,
  source: sourceEnum,
  notes: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
});
