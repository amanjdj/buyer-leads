import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./src/lib/schema.ts", // path to your schema file
  out: "./drizzle", // folder where migrations will be generated
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
