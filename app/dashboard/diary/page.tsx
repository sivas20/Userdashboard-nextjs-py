"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Diary() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const fetchedData: any[] = [];
    setEntries(fetchedData);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4">
      <main className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-black">
             <i>My Diary</i>
            </h1>
            <p className="text-zinc-500 mt-1">
              Capture your daily thoughts and memories.
            </p>
          </div>

         <Link href="/dashboard/diary/new">
          <button className="px-5 py-2 bg-green-800 text-white rounded-md hover:bg-gray-700 transition">
            Write New Entry
          </button>
         </Link>        
         </div>
        {entries.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-zinc-50">
            <p className="text-zinc-600">
              No diary entries yet. Start writing your first memory ✍
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Entries</h2>

            <ul className="space-y-3">
              {entries.map((entry, index) => (
                <li
                  key={index}
                  className="p-4 bg-zinc-100 rounded-md shadow-sm hover:bg-zinc-200 transition cursor-pointer"
                >
                  {entry.date}
                </li>
              ))}
            </ul>
          </div>
        )}

      </main>
    </div>
  );
}