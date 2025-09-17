// import { z } from "zod";

// export const cityEnum = z.enum([
//   "Chandigarh",
//   "Mohali",
//   "Zirakpur",
//   "Panchkula",
//   "Other",
// ]);
// export const propertyTypeEnum = z.enum([
//   "Apartment",
//   "Villa",
//   "Plot",
//   "Office",
//   "Retail",
// ]);
// export const bhkEnum = z.enum(["1", "2", "3", "4", "Studio"]);
// export const purposeEnum = z.enum(["Buy", "Rent"]);
// export const timelineEnum = z.enum(["0-3m", "3-6m", ">6m", "Exploring"]);
// export const sourceEnum = z.enum([
//   "Website",
//   "Referral",
//   "Walk-in",
//   "Call",
//   "Other",
// ]);
// export const statusEnum = z.enum([
//   "New",
//   "Qualified",
//   "Contacted",
//   "Visited",
//   "Negotiation",
//   "Converted",
//   "Dropped",
// ]);

// export const buyerLeadSchema = z
//   .object({
//     fullName: z.string().min(2).max(80),
//     email: z.string().email().optional().or(z.literal("")),
//     phone: z
//       .string()
//       .regex(/^\d{10,15}$/, "Phone must be numeric 10-15 digits"),
//     city: cityEnum,
//     propertyType: propertyTypeEnum,
//     bhk: z.string().optional(),
//     purpose: purposeEnum,
//     budgetMin: z.number().int().nonnegative().optional(),
//     budgetMax: z.number().int().nonnegative().optional(),
//     timeline: timelineEnum,
//     source: sourceEnum,
//     status: statusEnum.optional(),
//     notes: z.string().max(1000).optional(),
//     tags: z.array(z.string()).optional(),
//   })
//   .refine(
//     (data) => {
//       if (data.propertyType === "Apartment" || data.propertyType === "Villa") {
//         return data.bhk !== undefined && data.bhk !== "";
//       }
//       return true;
//     },
//     { message: "BHK is required for Apartment or Villa", path: ["bhk"] }
//   )
//   .refine(
//     (data) => {
//       if (data.budgetMin !== undefined && data.budgetMax !== undefined) {
//         return data.budgetMax >= data.budgetMin;
//       }
//       return true;
//     },
//     {
//       message: "budgetMax must be greater than or equal to budgetMin",
//       path: ["budgetMax"],
//     }
//   );
// src/lib/validators.ts
import { z } from "zod";

// Enums
export const cityEnum = z.enum([
  "Chandigarh",
  "Mohali",
  "Zirakpur",
  "Panchkula",
  "Other",
]);

export const propertyTypeEnum = z.enum([
  "Apartment",
  "Villa",
  "Plot",
  "Office",
  "Retail",
]);

export const bhkEnum = z.enum(["1", "2", "3", "4", "Studio"]);

export const purposeEnum = z.enum(["Buy", "Rent"]);

export const timelineEnum = z.enum(["0-3m", "3-6m", ">6m", "Exploring"]);

export const sourceEnum = z.enum([
  "Website",
  "Referral",
  "Walk-in",
  "Call",
  "Other",
]);

export const statusEnum = z.enum([
  "New",
  "Qualified",
  "Contacted",
  "Visited",
  "Negotiation",
  "Converted",
  "Dropped",
]);

// Buyer Lead Schema
export const buyerLeadSchema = z
  .object({
    fullName: z.string().min(2).max(80),
    email: z.string().email().nullable().optional(),
    phone: z
      .string()
      .regex(/^\d{10,15}$/, "Phone must be numeric 10-15 digits"),
    city: cityEnum,
    propertyType: propertyTypeEnum,
    bhk: bhkEnum.optional(), // strictly match DB enum
    purpose: purposeEnum,
    budgetMin: z.number().int().nonnegative().optional(),
    budgetMax: z.number().int().nonnegative().optional(),
    timeline: timelineEnum,
    source: sourceEnum,
    status: statusEnum.optional(),
    notes: z.string().max(1000).optional(),
    tags: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.propertyType === "Apartment" || data.propertyType === "Villa") {
        return data.bhk !== undefined;
      }
      return true;
    },
    { message: "BHK is required for Apartment or Villa", path: ["bhk"] }
  )
  .refine(
    (data) => {
      if (data.budgetMin !== undefined && data.budgetMax !== undefined) {
        return data.budgetMax >= data.budgetMin;
      }
      return true;
    },
    {
      message: "budgetMax must be greater than or equal to budgetMin",
      path: ["budgetMax"],
    }
  );
