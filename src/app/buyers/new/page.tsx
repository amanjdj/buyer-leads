// // src/app/buyers/new/page.tsx
// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { buyerLeadSchema } from "@/lib/validators";
// import { z } from "zod";
// import { db } from "@/lib/db";
// import { buyers } from "@/lib/schema";
// import { v4 as uuidv4 } from "uuid";

// type BuyerFormData = z.infer<typeof buyerLeadSchema>;

// export default function NewBuyerPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//   } = useForm<BuyerFormData>({
//     resolver: zodResolver(buyerLeadSchema),
//   });

//   const propertyType = watch("propertyType");

//   const onSubmit = async (data: BuyerFormData) => {
//     try {
//       await db.insert(buyers).values({
//         id: uuidv4(),
//         ...data,
//         ownerId: "00000000-0000-0000-0000-000000000000", // replace with current user
//         updatedAt: new Date(),
//       });
//       alert("Buyer lead created successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create buyer lead.");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Create Buyer Lead</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block font-medium">Full Name</label>
//           <input {...register("fullName")} className="border p-2 w-full" />
//           {errors.fullName && (
//             <p className="text-red-500">{errors.fullName.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Email</label>
//           <input {...register("email")} className="border p-2 w-full" />
//           {errors.email && (
//             <p className="text-red-500">{errors.email.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Phone</label>
//           <input {...register("phone")} className="border p-2 w-full" />
//           {errors.phone && (
//             <p className="text-red-500">{errors.phone.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">City</label>
//           <select {...register("city")} className="border p-2 w-full">
//             <option value="">Select City</option>
//             <option value="Chandigarh">Chandigarh</option>
//             <option value="Mohali">Mohali</option>
//             <option value="Zirakpur">Zirakpur</option>
//             <option value="Panchkula">Panchkula</option>
//             <option value="Other">Other</option>
//           </select>
//           {errors.city && <p className="text-red-500">{errors.city.message}</p>}
//         </div>

//         <div>
//           <label className="block font-medium">Property Type</label>
//           <select {...register("propertyType")} className="border p-2 w-full">
//             <option value="">Select Type</option>
//             <option value="Apartment">Apartment</option>
//             <option value="Villa">Villa</option>
//             <option value="Plot">Plot</option>
//             <option value="Office">Office</option>
//             <option value="Retail">Retail</option>
//           </select>
//           {errors.propertyType && (
//             <p className="text-red-500">{errors.propertyType.message}</p>
//           )}
//         </div>

//         {propertyType === "Apartment" || propertyType === "Villa" ? (
//           <div>
//             <label className="block font-medium">BHK</label>
//             <select {...register("bhk")} className="border p-2 w-full">
//               <option value="">Select BHK</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="Studio">Studio</option>
//             </select>
//             {errors.bhk && <p className="text-red-500">{errors.bhk.message}</p>}
//           </div>
//         ) : null}

//         <div>
//           <label className="block font-medium">Purpose</label>
//           <select {...register("purpose")} className="border p-2 w-full">
//             <option value="">Select Purpose</option>
//             <option value="Buy">Buy</option>
//             <option value="Rent">Rent</option>
//           </select>
//           {errors.purpose && (
//             <p className="text-red-500">{errors.purpose.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Budget Min</label>
//           <input
//             type="number"
//             {...register("budgetMin")}
//             className="border p-2 w-full"
//           />
//           {errors.budgetMin && (
//             <p className="text-red-500">{errors.budgetMin.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Budget Max</label>
//           <input
//             type="number"
//             {...register("budgetMax")}
//             className="border p-2 w-full"
//           />
//           {errors.budgetMax && (
//             <p className="text-red-500">{errors.budgetMax.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Timeline</label>
//           <select {...register("timeline")} className="border p-2 w-full">
//             <option value="">Select Timeline</option>
//             <option value="0-3m">0-3m</option>
//             <option value="3-6m">3-6m</option>
//             <option value=">6m">&gt;6m</option>
//             <option value="Exploring">Exploring</option>
//           </select>
//           {errors.timeline && (
//             <p className="text-red-500">{errors.timeline.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Source</label>
//           <select {...register("source")} className="border p-2 w-full">
//             <option value="">Select Source</option>
//             <option value="Website">Website</option>
//             <option value="Referral">Referral</option>
//             <option value="Walk-in">Walk-in</option>
//             <option value="Call">Call</option>
//             <option value="Other">Other</option>
//           </select>
//           {errors.source && (
//             <p className="text-red-500">{errors.source.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Notes</label>
//           <textarea
//             {...register("notes")}
//             className="border p-2 w-full"
//             rows={4}
//           ></textarea>
//           {errors.notes && (
//             <p className="text-red-500">{errors.notes.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Tags (comma separated)</label>
//           <input
//             {...register("tags", {
//               setValueAs: (v) =>
//                 v ? v.split(",").map((t: string) => t.trim()) : [],
//             })}
//             className="border p-2 w-full"
//           />
//           {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           {isSubmitting ? "Saving..." : "Create Lead"}
//         </button>
//       </form>
//     </div>
//   );
// }
// src/app/buyers/new/page.tsx
"use client";

import { useState } from "react";

export default function NewBuyerPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    propertyType: "",
    bhk: "",
    purpose: "",
    budgetMin: "",
    budgetMax: "",
    timeline: "",
    source: "",
    notes: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setMessage("");

  //   try {
  //     const res = await fetch("/api/buyers", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         ...form,
  //         tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
  //       }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setMessage(data.error || "Failed to create buyer");
  //     } else {
  //       setMessage("Buyer lead created successfully!");
  //       setForm({
  //         fullName: "",
  //         email: "",
  //         phone: "",
  //         city: "",
  //         propertyType: "",
  //         bhk: "",
  //         purpose: "",
  //         budgetMin: "",
  //         budgetMax: "",
  //         timeline: "",
  //         source: "",
  //         notes: "",
  //         tags: "",
  //       });
  //     }
  //   } catch (err) {
  //     setMessage("Failed to create buyer");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          budgetMin: form.budgetMin ? Number(form.budgetMin) : undefined,
          budgetMax: form.budgetMax ? Number(form.budgetMax) : undefined,
          tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to create buyer");
      } else {
        setMessage("Buyer lead created successfully!");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          city: "",
          propertyType: "",
          bhk: "",
          purpose: "",
          budgetMin: "",
          budgetMax: "",
          timeline: "",
          source: "",
          notes: "",
          tags: "",
        });
      }
    } catch (err) {
      setMessage("Failed to create buyer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Buyer Lead</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select City</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Mohali">Mohali</option>
          <option value="Zirakpur">Zirakpur</option>
          <option value="Panchkula">Panchkula</option>
          <option value="Other">Other</option>
        </select>
        <select
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Office">Office</option>
          <option value="Retail">Retail</option>
        </select>
        {(form.propertyType === "Apartment" ||
          form.propertyType === "Villa") && (
          <select
            name="bhk"
            value={form.bhk}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select BHK</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="Studio">Studio</option>
          </select>
        )}
        <select
          name="purpose"
          value={form.purpose}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Purpose</option>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>
        <input
          type="number"
          name="budgetMin"
          placeholder="Budget Min"
          value={form.budgetMin}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="budgetMax"
          placeholder="Budget Max"
          value={form.budgetMax}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select
          name="timeline"
          value={form.timeline}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Timeline</option>
          <option value="0-3m">0-3m</option>
          <option value="3-6m">3-6m</option>
          <option value=">6m">&gt;6m</option>
          <option value="Exploring">Exploring</option>
        </select>
        <select
          name="source"
          value={form.source}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Source</option>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Walk-in">Walk-in</option>
          <option value="Call">Call</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="border p-2 w-full"
          rows={4}
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Create Lead"}
        </button>
      </form>
    </div>
  );
}
