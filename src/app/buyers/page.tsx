// // src/app/buyers/page.tsx
// import { buyers } from "@/lib/schema";
// import { db } from "@/lib/db";

// interface BuyersPageProps {
//   searchParams?: {
//     page?: string;
//     city?: string;
//     propertyType?: string;
//     status?: string;
//     timeline?: string;
//     search?: string;
//   };
// }

// const PAGE_SIZE = 10;

// export default async function BuyersPage({ searchParams }: BuyersPageProps) {
//   const page = parseInt(searchParams?.page || "1", 10);
//   const offset = (page - 1) * PAGE_SIZE;

//   // Start query
//   let query = db.select().from(buyers);
//   let newQuery;
//   // Apply filters
//   if (searchParams?.city)
//     newQuery = query.where(buyers.city, searchParams.city);
//   if (searchParams?.propertyType)
//     query = query.where(buyers.propertyType, "=", searchParams.propertyType);
//   if (searchParams?.status)
//     query = query.where(buyers.status, "=", searchParams.status);
//   if (searchParams?.timeline)
//     query = query.where(buyers.timeline, "=", searchParams.timeline);

//   // Apply search (fullName, email, phone)
//   if (searchParams?.search) {
//     const q = `%${searchParams.search}%`;
//     query = query.where((b) =>
//       b.fullName.ilike(q).or(b.email.ilike(q)).or(b.phone.ilike(q))
//     );
//   }

//   // Fetch total count for pagination
//   const totalCountQuery = db.select({ count: db.count() }).from(buyers);
//   const totalCountResult = await totalCountQuery.execute();
//   const totalCount = totalCountResult[0].count;

//   // Apply sorting and pagination
//   const buyersList = await query
//     .orderBy(buyers.updatedAt, "desc")
//     .limit(PAGE_SIZE)
//     .offset(offset)
//     .execute();

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Buyers List</h1>

//       <table className="min-w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">City</th>
//             <th className="border p-2">Property Type</th>
//             <th className="border p-2">Budget</th>
//             <th className="border p-2">Timeline</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Updated At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {buyersList.map((b) => (
//             <tr key={b.id} className="hover:bg-gray-50">
//               <td className="border p-2">{b.fullName}</td>
//               <td className="border p-2">{b.phone}</td>
//               <td className="border p-2">{b.city}</td>
//               <td className="border p-2">{b.propertyType}</td>
//               <td className="border p-2">
//                 {b.budgetMin ?? "-"} - {b.budgetMax ?? "-"}
//               </td>
//               <td className="border p-2">{b.timeline}</td>
//               <td className="border p-2">{b.status}</td>
//               <td className="border p-2">
//                 {b.updatedAt ? new Date(b.updatedAt).toLocaleString() : "-"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="mt-4 flex justify-between">
//         {page > 1 && (
//           <a
//             href={`?page=${page - 1}`}
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             Previous
//           </a>
//         )}
//         {buyersList.length === PAGE_SIZE && (
//           <a
//             href={`?page=${page + 1}`}
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             Next
//           </a>
//         )}
//       </div>
//     </div>
//   );
// }
// src/app/buyers/page.tsx

// import { buyers } from "@/lib/schema";
// import { db } from "@/lib/db";

// export default async function BuyersPage({
//   searchParams,
// }: {
//   searchParams?: { [key: string]: string | undefined };
// }) {
//   const {
//     search = "",
//     city,
//     propertyType,
//     status,
//     timeline,
//     page = "1",
//   } = searchParams || {};

//   console.log(search, city, propertyType, status, timeline, page);
//   // Fetch all buyers (without filters/pagination)
//   const buyersList = await db.select().from(buyers).execute();

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Buyers List</h1>

//       <table className="min-w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-800">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">City</th>
//             <th className="border p-2">Property Type</th>
//             <th className="border p-2">Budget</th>
//             <th className="border p-2">Timeline</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Updated At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {buyersList.map((b) => (
//             <tr key={b.id} className="hover:bg-gray-50">
//               <td className="border p-2">{b.fullName}</td>
//               <td className="border p-2">{b.phone}</td>
//               <td className="border p-2">{b.city}</td>
//               <td className="border p-2">{b.propertyType}</td>
//               <td className="border p-2">
//                 {b.budgetMin ?? "-"} - {b.budgetMax ?? "-"}
//               </td>
//               <td className="border p-2">{b.timeline}</td>
//               <td className="border p-2">{b.status}</td>
//               <td className="border p-2">
//                 {b.updatedAt ? new Date(b.updatedAt).toLocaleString() : "-"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// src/app/buyers/page.tsx
// src/app/buyers/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Buyer = {
  id: string;
  fullName: string;
  email?: string | null;
  phone: string;
  city: string;
  propertyType: string;
  bhk?: string | null;
  purpose: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
  timeline: string;
  source: string;
  status: string;
  notes?: string | null;
  tags?: string[];
};

export default function BuyersPage() {
  const searchParams = useSearchParams();
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);

  const searchName = searchParams.get("name")?.toLowerCase() || "";

  useEffect(() => {
    const fetchBuyers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/buyers");
        const data: Buyer[] = await res.json();
        const filtered = data.filter((b) =>
          b.fullName.toLowerCase().includes(searchName)
        );
        setBuyers(filtered);
      } catch (err) {
        console.error("Failed to fetch buyers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBuyers();
  }, [searchName]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this buyer?")) return;
    try {
      await fetch(`/api/buyers/${id}`, { method: "DELETE" });
      setBuyers((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Failed to delete buyer", err);
      alert("Failed to delete buyer");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/buyers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setBuyers((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  if (loading) return <p className="p-6">Loading buyers...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Buyers</h1>

      {buyers.length === 0 ? (
        <p>No buyers found.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-700">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">Property</th>
              <th className="border px-4 py-2">BHK</th>
              <th className="border px-4 py-2">Purpose</th>
              <th className="border px-4 py-2">Budget</th>
              <th className="border px-4 py-2">Timeline</th>
              <th className="border px-4 py-2">Source</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{b.fullName}</td>
                <td className="border px-4 py-2">{b.email || "-"}</td>
                <td className="border px-4 py-2">{b.phone}</td>
                <td className="border px-4 py-2">{b.city}</td>
                <td className="border px-4 py-2">{b.propertyType}</td>
                <td className="border px-4 py-2">{b.bhk || "-"}</td>
                <td className="border px-4 py-2">{b.purpose}</td>
                <td className="border px-4 py-2">
                  {b.budgetMin ?? "-"} - {b.budgetMax ?? "-"}
                </td>
                <td className="border px-4 py-2">{b.timeline}</td>
                <td className="border px-4 py-2">{b.source}</td>
                <td className="border px-4 py-2">
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    className="border p-1"
                  >
                    {[
                      "New",
                      "Qualified",
                      "Contacted",
                      "Visited",
                      "Negotiation",
                      "Converted",
                      "Dropped",
                    ].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                  {/* Optionally, you can add Edit button here linking to /buyers/[id] */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
