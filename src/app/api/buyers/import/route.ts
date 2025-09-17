import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buyers } from "@/lib/schema";
import { buyerLeadSchema } from "@/lib/validators";
import Papa from "papaparse";
import { InferModel } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const text = await file.text();
    const results = Papa.parse<Record<string, string>>(text, { header: true });

    // const validRows = [];
    const validRows: InferModel<typeof buyers, "insert">[] = [];
    // const validRows: InferModel<typeof buyers, "insert">[] = [];
    const rowErrors: { row: number; message: string }[] = [];

    results.data.forEach((row, i) => {
      try {
        const parsed = buyerLeadSchema.parse({
          ...row,
          budgetMin: row.budgetMin ? Number(row.budgetMin) : undefined,
          budgetMax: row.budgetMax ? Number(row.budgetMax) : undefined,
          tags: row.tags ? row.tags.split(",") : [],
        });

        validRows.push({
          id: crypto.randomUUID(),
          ...parsed,
          ownerId: "demo-user-id", // replace with actual user ID
          updatedAt: new Date(),
        });
      } catch (err: unknown) {
        let message = "Unknown error";
        if (err instanceof Error) {
          message = err.message;
          rowErrors.push({ row: i + 2, message: err.message });
        }
        return NextResponse.json({ error: message }, { status: 500 });
      }

      // } catch (err: any) {
      //   rowErrors.push({ row: i + 2, message: err.message });
      // }
    });

    if (validRows.length > 0) {
      await db.insert(buyers).values(validRows);
    }

    return NextResponse.json({
      message: `${validRows.length} rows imported successfully`,
      errors: rowErrors,
    });
  } catch (err: unknown) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
