import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buyers } from "@/lib/schema";
import { buyerLeadSchema } from "@/lib/validators";
import { getCurrentUser } from "@/lib/auth";
// import { updateBuyer, deleteBuyer } from "@/lib/buyers";

// GET -> list buyers (basic, no pagination/search for now)
export async function GET(req: NextRequest) {
  const allBuyers = await db.select().from(buyers);
  return NextResponse.json(allBuyers);
}

// POST -> create a new buyer
// // src/app/api/buyers/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { buyers } from "@/lib/schema";
// import { buyerLeadSchema } from "@/lib/validators";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = buyerLeadSchema.parse(data);

    const newBuyer = {
      id: uuidv4(),
      ...parsed,
      ownerId: "00000000-0000-0000-0000-000000000000", // replace with current user logic
      updatedAt: new Date(),
    };

    await db.insert(buyers).values(newBuyer);

    return NextResponse.json(newBuyer);
  } catch (err: unknown) {
    // err ko unknown declare karte hain, phir safe check karte hain
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { error: err.message || "Failed to create buyer" },
        { status: 400 }
      );
    } else {
      console.error(err);
      return NextResponse.json(
        { error: "Failed to create buyer" },
        { status: 400 }
      );
    }
  }
}
