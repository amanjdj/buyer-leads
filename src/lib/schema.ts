import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums for Postgres
export const cityEnum = pgEnum("city", [
  "Chandigarh",
  "Mohali",
  "Zirakpur",
  "Panchkula",
  "Other",
]);
export const propertyEnum = pgEnum("property_type", [
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

// buyers table
export const buyers = pgTable("buyers", {
  id: uuid("id").primaryKey(),
  fullName: varchar("full_name", { length: 80 }),
  email: varchar("email", { length: 255 }).default(""),
  phone: varchar("phone", { length: 15 }),
  city: cityEnum("city"),
  propertyType: propertyEnum("property_type"),
  bhk: bhkEnum("bhk").default("1"),
  purpose: purposeEnum("purpose"),
  budgetMin: serial("budget_min").default(0),
  budgetMax: serial("budget_max").default(0),
  timeline: timelineEnum("timeline"),
  source: sourceEnum("source"),
  status: statusEnum("status").default("New"),
  notes: text("notes").default(""),
  tags: text("tags").array().default([]),
  ownerId: uuid("owner_id"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// buyer_history table
export const buyerHistory = pgTable("buyer_history", {
  id: uuid("id").primaryKey(),
  buyerId: uuid("buyer_id"),
  changedBy: uuid("changed_by"),
  changedAt: timestamp("changed_at").defaultNow(),
  diff: text("diff"), // store JSON as string
});
