# Buyer Lead Intake App

## Setup

# Buyer Lead Intake App

## Setup

1. **Install dependencies**

```bash
npm install
Environment variables
Create a .env file with:


DATABASE_URL=<your-supabase-db-url>
⚠️ Note: The .env file is also included in this repo for simplicity in running the app locally. In a real production setup, secrets should never be committed.

Database migration & seeding


npx drizzle-kit generate
npx drizzle-kit push
Run locally


npm run dev
Open http://localhost:3000 in your browser.

Design Notes
Validation:
All buyer fields are validated using zod in src/lib/validators.ts. Backend enforces correct types and required fields; client uses optional lightweight checks.

SSR vs Client:

/buyers page: Client-side fetching for live filtering and status updates.

/buyers/new & /buyers/import: Client-side forms for creating buyers and importing CSV.

Ownership Enforcement:
Backend checks ownerId for update/delete actions to ensure only the creator can modify their buyers.

Features Done
CRUD for buyer leads (create, read, update, delete)

Search and filter buyers by name

CSV import/export (with validation and error reporting)

Dynamic form fields (BHK for apartments/villas)

Status updates via dropdown on the table

Skipped / Notes
No full server-side pagination or advanced search yet (could be added for large datasets)

Authentication stubbed (ownerId hardcoded for demo purposes)

UI/UX basic; only uses TailwindCSS
```
