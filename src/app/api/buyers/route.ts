import { NextRequest, NextResponse } from "next/server";
import { db, buyers, buyerHistory } from "@/lib/db";
import { createBuyerSchema } from "@/lib/validators";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = createBuyerSchema.parse(json);

    const buyerId = uuid();
    const now = new Date();

    await db.insert(buyers).values({
      id: buyerId,
      ...parsed,
      ownerId: "demo-user",
      updatedAt: now,
    });

    await db.insert(buyerHistory).values({
      id: uuid(),
      buyerId,
      changedBy: "demo-user",
      changedAt: now,
      diff: JSON.stringify(parsed),
    });

    return NextResponse.json({ success: true, id: buyerId });
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
