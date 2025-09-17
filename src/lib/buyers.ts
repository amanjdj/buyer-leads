// src/lib/buyers.ts
import { db } from "./db";
import { buyers } from "./schema";
import { buyerLeadSchema } from "./validators";
import { getCurrentUser } from "./auth";
import { eq } from "drizzle-orm";

export async function getBuyerById(id: string) {
  return await db.select().from(buyers).where(eq(buyers.id, id));
}

export async function updateBuyer(id: string, data: unknown) {
  const user = getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const parsed = buyerLeadSchema.parse(data);

  const [existing] = await getBuyerById(id);
  if (!existing) throw new Error("Buyer not found");

  if (user.role !== "admin" && existing.ownerId !== user.id) {
    throw new Error("You can only edit your own buyers");
  }

  return await db
    .update(buyers)
    .set({ ...parsed, updatedAt: new Date() })
    .where(eq(buyers.id, id));
}

export async function deleteBuyer(id: string) {
  const user = getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const [existing] = await getBuyerById(id);
  if (!existing) throw new Error("Buyer not found");

  if (user.role !== "admin" && existing.ownerId !== user.id) {
    throw new Error("You can only delete your own buyers");
  }

  return await db.delete(buyers).where(eq(buyers.id, id));
}
