// // app/buyers/[id]/page.tsx
// import { db } from "@/lib/db";
// import { buyers, buyerHistory } from "@/lib/schema";
// import { buyerLeadSchema } from "@/lib/validators";
// import { z } from "zod";
// import { notFound } from "next/navigation";
// import { revalidatePath } from "next/cache";
// import { eq, desc } from "drizzle-orm";
// export default async function BuyerPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } = params;

//   // 1️⃣ Fetch buyer
//   const buyer = (
//     await db
//       .select()
//       .from(buyers)
//       .where(eq(buyers.id, id)) // works fine because id is uuid
//       .limit(1)
//   )[0];

//   if (!buyer) return notFound();

//   // 2️⃣ Fetch last 5 history entries
//   const history = await db
//     .select()
//     .from(buyerHistory)
//     .where(eq(buyerHistory.buyerId, id))
//     .orderBy(desc(buyerHistory.changedAt))
//     .limit(5);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Edit Buyer</h1>

//       <form
//         action={async (formData: FormData) => {
//           "use server";

//           try {
//             const formObj = Object.fromEntries(formData);
//             const parsed = buyerLeadSchema.parse({
//               fullName: formObj.fullName,
//               email: formObj.email,
//               phone: formObj.phone,
//               city: formObj.city,
//               propertyType: formObj.propertyType,
//               bhk: formObj.bhk,
//               purpose: formObj.purpose,
//               budgetMin: formObj.budgetMin
//                 ? Number(formObj.budgetMin)
//                 : undefined,
//               budgetMax: formObj.budgetMax
//                 ? Number(formObj.budgetMax)
//                 : undefined,
//               timeline: formObj.timeline,
//               source: formObj.source,
//               notes: formObj.notes,
//               tags: formObj.tags ? (formObj.tags as string).split(",") : [],
//               status: formObj.status,
//             });

//             // 3️⃣ Concurrency check
//             const [current] = await db
//               .select({ updatedAt: buyers.updatedAt })
//               .from(buyers)
//               .where(eq(buyers.id, id));

//             if (!current) return notFound();

//             const formUpdatedAt = formObj.updatedAt as string;
//             if (
//               new Date(formUpdatedAt).getTime() !==
//               new Date(current.updatedAt || "").getTime()
//             ) {
//               throw new Error("Record changed, please refresh");
//             }

//             // 4️⃣ Update buyer
//             await db
//               .update(buyers)
//               .set({ ...parsed, updatedAt: new Date() })
//               .where(eq(buyers.id, id));

//             // 5️⃣ Insert into buyer_history
//             await db.insert(buyerHistory).values({
//               id: crypto.randomUUID(),
//               buyerId: id,
//               changedBy: "demo-user-id", // replace with session user id
//               changedAt: new Date(),
//               diff: JSON.stringify(parsed),
//             });

//             revalidatePath("/buyers"); // optional: revalidate list
//           } catch (err: unknown) {
//             if (err instanceof Error) {
//               // TypeScript now knows `err.message` exists
//               console.error(err);
//               alert(err.message);
//             } else {
//               console.error(err);
//               alert("Something went wrong");
//             }
//           }
//         }}
//         className="space-y-4"
//       >
//         <input
//           type="hidden"
//           name="updatedAt"
//           value={buyer?.updatedAt?.toISOString()}
//         />

//         <div>
//           <label className="block font-medium">Full Name</label>
//           <input
//             name="fullName"
//             defaultValue={buyer?.fullName || ""}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Email</label>
//           <input
//             name="email"
//             defaultValue={buyer.email ?? ""}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Phone</label>
//           <input
//             name="phone"
//             defaultValue={buyer?.phone || ""}
//             className="border p-2 w-full"
//           />
//         </div>

//         {/* Add other fields similarly: city, propertyType, bhk, purpose, budgets, timeline, source, notes, tags, status */}

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Save
//         </button>
//       </form>

//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-2">Last 5 Changes</h2>
//         <ul className="space-y-2">
//           {history.map((h) => (
//             <li key={h.id} className="border p-2">
//               <p>
//                 <strong>Changed At:</strong>{" "}
//                 {new Date(h.changedAt || "").toLocaleString()}
//               </p>
//               <p>
//                 <strong>Changed By:</strong> {h.changedBy}
//               </p>
//               <pre>{h.diff}</pre>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// app/buyers/[id]/page.tsx
import { db } from "@/lib/db";
import { buyers, buyerHistory } from "@/lib/schema";
import { buyerLeadSchema } from "@/lib/validators";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq, desc } from "drizzle-orm";

export default async function BuyerPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // 1️⃣ Fetch buyer
  const buyer = (
    await db.select().from(buyers).where(eq(buyers.id, id)).limit(1)
  )[0];

  if (!buyer) return notFound();

  // 2️⃣ Fetch last 5 history entries
  const history = await db
    .select()
    .from(buyerHistory)
    .where(eq(buyerHistory.buyerId, id))
    .orderBy(desc(buyerHistory.changedAt))
    .limit(5);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Buyer</h1>

      <form
        action={async (formData: FormData) => {
          "use server";

          try {
            const formObj = Object.fromEntries(formData);

            const parsed = buyerLeadSchema.parse({
              fullName: formObj.fullName,
              email: formObj.email,
              phone: formObj.phone,
              city: formObj.city,
              propertyType: formObj.propertyType,
              bhk: formObj.bhk,
              purpose: formObj.purpose,
              budgetMin: formObj.budgetMin
                ? Number(formObj.budgetMin)
                : undefined,
              budgetMax: formObj.budgetMax
                ? Number(formObj.budgetMax)
                : undefined,
              timeline: formObj.timeline,
              source: formObj.source,
              notes: formObj.notes,
              tags: formObj.tags ? (formObj.tags as string).split(",") : [],
              status: formObj.status,
            });

            // 3️⃣ Concurrency check
            const [current] = await db
              .select({ updatedAt: buyers.updatedAt })
              .from(buyers)
              .where(eq(buyers.id, id));

            if (!current?.updatedAt) return notFound();

            const formUpdatedAt = formObj.updatedAt as string;
            if (
              new Date(formUpdatedAt).getTime() !==
              new Date(current.updatedAt).getTime()
            ) {
              throw new Error("Record changed, please refresh");
            }

            // 4️⃣ Update buyer
            await db
              .update(buyers)
              .set({ ...parsed, updatedAt: new Date() })
              .where(eq(buyers.id, id));

            // 5️⃣ Insert into buyer_history
            await db.insert(buyerHistory).values({
              id: crypto.randomUUID(),
              buyerId: id,
              changedBy: "demo-user-id", // replace with session user ID
              changedAt: new Date(),
              diff: JSON.stringify(parsed),
            });

            revalidatePath("/buyers");
          } catch (err: unknown) {
            if (err instanceof Error) {
              console.error(err);
              alert(err.message);
            } else {
              console.error(err);
              alert("Something went wrong");
            }
          }
        }}
        className="space-y-4"
      >
        <input
          type="hidden"
          name="updatedAt"
          value={buyer.updatedAt?.toISOString()}
        />

        {/* Render all fields */}
        {[
          { label: "Full Name", name: "fullName", value: buyer.fullName },
          { label: "Email", name: "email", value: buyer.email },
          { label: "Phone", name: "phone", value: buyer.phone },
          { label: "City", name: "city", value: buyer.city },
          {
            label: "Property Type",
            name: "propertyType",
            value: buyer.propertyType,
          },
          { label: "BHK", name: "bhk", value: buyer.bhk },
          { label: "Purpose", name: "purpose", value: buyer.purpose },
          { label: "Budget Min", name: "budgetMin", value: buyer.budgetMin },
          { label: "Budget Max", name: "budgetMax", value: buyer.budgetMax },
          { label: "Timeline", name: "timeline", value: buyer.timeline },
          { label: "Source", name: "source", value: buyer.source },
          { label: "Notes", name: "notes", value: buyer.notes },
          { label: "Tags", name: "tags", value: buyer.tags?.join(",") },
          { label: "Status", name: "status", value: buyer.status },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-medium">{field.label}</label>
            <input
              name={field.name}
              defaultValue={field.value ?? ""}
              className="border p-2 w-full"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Last 5 Changes</h2>
        <ul className="space-y-2">
          {history.map((h) => (
            <li key={h.id} className="border p-2">
              <p>
                <strong>Changed At:</strong>{" "}
                {h.changedAt ? new Date(h.changedAt).toLocaleString() : "N/A"}
              </p>
              <p>
                <strong>Changed By:</strong> {h.changedBy}
              </p>
              <pre>{JSON.stringify(JSON.parse(h.diff || "{}"), null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
