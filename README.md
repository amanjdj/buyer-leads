# Buyer Lead Intake App

## Setup

1. **Install dependencies**

````bash
npm install
Environment variables
Create a .env file with:

ini
Copy code
DATABASE_URL=<your-supabase-db-url>
Database migration & seeding

bash
Copy code
npx drizzle-kit generate
npx drizzle-kit push
Run locally

bash
Copy code
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

css
Copy code

I can also **write a version with a “Project Structure” section** showing all your main files and directories if you want—it helps reviewers quickly understand your code. Do you want me to do that?






You said:
give me one single text of all readme also mention that i pushed .env also


ChatGPT said:
Got it 👍 Here’s a single block of your full README.md text, with the note that .env was pushed too (so reviewers know).

markdown
Copy code
# Buyer Lead Intake App

## Setup

1. **Install dependencies**
```bash
npm install
Environment variables
Create a .env file with:

ini
Copy code
DATABASE_URL=<your-supabase-db-url>
⚠️ Note: The .env file is also included in this repo for simplicity in running the app locally. In a real production setup, secrets should never be committed.

Database migration & seeding

bash
Copy code
npx drizzle-kit generate
npx drizzle-kit push
Run locally

bash
Copy code
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
````
