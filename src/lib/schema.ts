import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const cityEnum = pgEnum("city", [
  "Chandigarh",
  "Mohali",
  "Zirakpur",
  "Panchkula",
  "Other",
]);
export const propertyTypeEnum = pgEnum("property_type", [
  "Apartment",
  "Villa",
  "Plot",
  "Office",
  "Retail",
]);
export const bhkEnum = pgEnum("bhk", ["1", "2", "3", "4", "Studio"]);
export const purposeEnum = pgEnum("purpose", ["Buy", "Rent"]);
export const timelineEnum = pgEnum("timeline", [
  "0-3m",
  "3-6m",
  ">6m",
  "Exploring",
]);
export const sourceEnum = pgEnum("source", [
  "Website",
  "Referral",
  "Walk-in",
  "Call",
  "Other",
]);
export const statusEnum = pgEnum("status", [
  "New",
  "Qualified",
  "Contacted",
  "Visited",
  "Negotiation",
  "Converted",
  "Dropped",
]);

// Buyers table
export const buyers = pgTable("buyers", {
  id: uuid("id").primaryKey(),
  fullName: varchar("full_name", { length: 80 }),
  email: varchar("email", { length: 255 }).$type<string | null>(),
  phone: varchar("phone", { length: 15 }),
  city: cityEnum("city"),
  propertyType: propertyTypeEnum("property_type"),
  bhk: bhkEnum("bhk").$type<string | null>(),
  purpose: purposeEnum("purpose"),
  budgetMin: integer("budget_min").$type<number | null>(),
  budgetMax: integer("budget_max").$type<number | null>(),
  timeline: timelineEnum("timeline"),
  source: sourceEnum("source"),
  status: statusEnum("status").default("New"),
  notes: text("notes").$type<string | null>(),
  tags: text("tags").array().$type<string[] | null>(),
  ownerId: uuid("owner_id"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Buyer history
export const buyerHistory = pgTable("buyer_history", {
  id: uuid("id").primaryKey(),
  buyerId: uuid("buyer_id"),
  changedBy: uuid("changed_by"),
  changedAt: timestamp("changed_at").defaultNow(),
  diff: text("diff"), // JSON stored as text
});
