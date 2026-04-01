"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

type Memory = {
  id: number;
  place: string;
  date: string;
};

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/memories", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMemories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4">
      <main className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-black">
              <i>My Memories</i>
            </h1>
            <p className="text-zinc-500 mt-1">Relive your cherished moments.</p>
          </div>

          <Link href="/dashboard/memories/new">
            <button className="px-5 py-2 bg-green-800 text-white rounded-md hover:bg-gray-700 transition">
              + New Memory
            </button>
          </Link>
        </div>

        {memories.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-zinc-50">
            <p className="text-zinc-600">
              No memories yet. Start creating your first memory ✍
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl text-black font-semibold mb-4">Your Memories</h2>

            <ul className="space-y-3">
              {memories.map((memory) => (
                <li
                  key={memory.id}
                  className="flex justify-between items-center p-4 bg-zinc-100 rounded-md shadow-sm hover:bg-zinc-200 transition"
                >
                  <div>
                    <p className="text-black font-medium">
                      {memory.place || "Untitled Memory"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {memory.date
                        ? new Date(memory.date).toLocaleDateString()
                        : "No date"}
                    </p>
                  </div>

                  <Link href={`/dashboard/memories/${memory.id}`}>
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