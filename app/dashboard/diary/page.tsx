"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

type Entry = {
  id: number;
  date: string;
  description: string;
  images: string[];
};

export default function Diary() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://localhost:5000/dairies", {
          credentials: "include",
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          setEntries([]);
        }

      } catch (err) {
        console.error("Error fetching diary entries:", err);
      }
    };

    fetchEntries();
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
              + New Entry
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
            <h2 className="text-xl text-black font-semibold mb-4">Your Entries</h2>

            <ul className="space-y-3">
              {entries.map((entry, index) => (
                <li
                  key={entry.id}
                  className="flex justify-between items-center p-4 bg-zinc-100 rounded-md shadow-sm hover:bg-zinc-200 transition"
                >
                  <span className="text-black font-medium">
                    {formatDate(entry.date).toLowerCase()}
                  </span>

                  <Link href={`/dashboard/diary/${entry.id}`}>
                    <button className="flex items-center gap-2 text-blue-600 hover:scale-105 transition">
                      <Eye size={18} />
                      View
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}