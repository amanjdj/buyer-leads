"use client";

import React, { useState } from "react";

export default function BuyerImportExportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ row: number; message: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
    setMessage("");
    setErrors([]);
  };

  const handleImport = async () => {
    if (!file) return alert("Please select a CSV file");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/buyers/import", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
      setErrors(data.errors || []);
    } else {
      setMessage(data.error || "Import failed");
    }
  };

  const handleExport = async () => {
    const res = await fetch("/api/buyers/export");
    if (!res.ok) return alert("Failed to export CSV");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `buyers_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold">Import / Export Buyers CSV</h1>

      <div className="space-y-2">
        <input
          className="bg-gray-500 p-3 m-3"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
        <button
          onClick={handleImport}
          className="px-4 py-2 bg-blue-500 text-white rounded "
        >
          Import CSV
        </button>
        <button
          onClick={handleExport}
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Export CSV
        </button>
      </div>

      {message && <p className="mt-2">{message}</p>}

      {errors.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold text-red-600">Errors</h2>
          <ul className="list-disc pl-6 text-red-600">
            {errors.map((e) => (
              <li key={e.row}>
                Row {e.row}: {e.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
