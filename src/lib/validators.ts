import { z } from "zod";

// Zod enums for validation
export const cityZodEnum = z.enum([
  "Chandigarh",
  "Mohali",
  "Zirakpur",
  "Panchkula",
  "Other",
]);
export const propertyZodEnum = z.enum([
  "Apartment",
  "Villa",
  "Plot",
  "Office",
  "Retail",
]);
export const bhkZodEnum = z.enum(["1", "2", "3", "4", "Studio"]);
export const purposeZodEnum = z.enum(["Buy", "Rent"]);
export const timelineZodEnum = z.enum(["0-3m", "3-6m", ">6m", "Exploring"]);
export const sourceZodEnum = z.enum([
  "Website",
  "Referral",
  "Walk-in",
  "Call",
  "Other",
]);
export const statusZodEnum = z.enum([
  "New",
  "Qualified",
  "Contacted",
  "Visited",
  "Negotiation",
  "Converted",
  "Dropped",
]);

export const createBuyerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\d{10,15}$/),
  city: cityZodEnum,
  propertyType: propertyZodEnum,
  bhk: bhkZodEnum.optional(),
  purpose: purposeZodEnum,
  budgetMin: z.number().int().optional(),
  budgetMax: z.number().int().optional(),
  timeline: timelineZodEnum,
  source: sourceZodEnum,
  notes: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
});
