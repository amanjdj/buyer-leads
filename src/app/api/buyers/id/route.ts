import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buyers } from "@/lib/schema";
import { buyerLeadSchema } from "@/lib/validators";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const data = await req.json();
  const parsed = buyerLeadSchema.partial().parse(data); // allow partial update

  const [buyer] = await db
    .select()
    .from(buyers)
    .where(eq(buyers.id, params.id));

  if (!buyer)
    return NextResponse.json({ error: "Buyer not found" }, { status: 404 });
  if (buyer.ownerId !== user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  // await db.update(buyers).set(parsed).where(eq(buyers.id, params.id));
  await db
    .update(buyers)
    .set({ ...parsed, updatedAt: new Date() })
    .where(eq(buyers.id, params.id));

  return NextResponse.json({ ...buyer, ...parsed });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const [buyer] = await db
    .select()
    .from(buyers)
    .where(eq(buyers.id, params.id));

  if (!buyer)
    return NextResponse.json({ error: "Buyer not found" }, { status: 404 });
  if (buyer.ownerId !== user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  await db.delete(buyers).where(eq(buyers.id, params.id));

  return NextResponse.json({ message: "Buyer deleted" });
}
