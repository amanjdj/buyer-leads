CREATE TYPE "public"."bhk" AS ENUM('1', '2', '3', '4', 'Studio');--> statement-breakpoint
CREATE TYPE "public"."city" AS ENUM('Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other');--> statement-breakpoint
CREATE TYPE "public"."propertyType" AS ENUM('Apartment', 'Villa', 'Plot', 'Office', 'Retail');--> statement-breakpoint
CREATE TYPE "public"."purpose" AS ENUM('Buy', 'Rent');--> statement-breakpoint
CREATE TYPE "public"."source" AS ENUM('Website', 'Referral', 'Walk-in', 'Call', 'Other');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped');--> statement-breakpoint
CREATE TYPE "public"."timeline" AS ENUM('0-3m', '3-6m', '>6m', 'Exploring');--> statement-breakpoint
CREATE TABLE "buyer_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"buyerId" uuid NOT NULL,
	"changedBy" varchar(50) NOT NULL,
	"changedAt" timestamp DEFAULT now() NOT NULL,
	"diff" jsonb
);
--> statement-breakpoint
CREATE TABLE "buyers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullName" varchar(80) NOT NULL,
	"email" varchar(100),
	"phone" varchar(15) NOT NULL,
	"city" "city" NOT NULL,
	"propertyType" "propertyType" NOT NULL,
	"bhk" "bhk",
	"purpose" "purpose" NOT NULL,
	"budgetMin" integer,
	"budgetMax" integer,
	"timeline" timeline NOT NULL,
	"source" "source" NOT NULL,
	"status" "status" DEFAULT 'New' NOT NULL,
	"notes" text,
	"tags" text[],
	"ownerId" varchar(50) NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
