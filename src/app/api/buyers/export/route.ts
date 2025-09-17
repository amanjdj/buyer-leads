import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buyers } from "@/lib/schema";
import Papa from "papaparse";

export async function GET() {
  try {
    const rows = await db.select().from(buyers);
    const csvData = rows.map((r) => ({
      fullName: r.fullName,
      email: r.email ?? "",
      phone: r.phone,
      city: r.city,
      propertyType: r.propertyType,
      bhk: r.bhk ?? "",
      purpose: r.purpose,
      budgetMin: r.budgetMin ?? "",
      budgetMax: r.budgetMax ?? "",
      timeline: r.timeline,
      source: r.source,
      notes: r.notes ?? "",
      tags: r.tags?.join(",") ?? "",
      status: r.status,
    }));

    const csv = Papa.unparse(csvData);
    return new Response(csv, {
      headers: { "Content-Type": "text/csv" },
    });
  } catch (err: unknown) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
