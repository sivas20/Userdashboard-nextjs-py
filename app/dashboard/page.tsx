"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/tasks", {
          credentials: "include",
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  const pendingTasks = tasks.filter((task) => {
    if (!task.date) return false;

    const today = new Date();
    const due = new Date(task.date);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    return due < today;
  }).length;

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
      <main className="flex-1 p-16 bg-white">
        <h1 className="text-3xl font-semibold mb-6 text-black">
          <i>Welcome to your dashboard !</i>
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Organize your tasks, capture memories, and manage your daily thoughts
          in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Link href="/dashboard/tasks">
            <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-black mb-2">Tasks</h2>
              <p className="text-zinc-600">
                You have {pendingTasks} pending tasks.
              </p>
            </div>
          </Link>

          <Link href="/dashboard/diary">
            <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-black mb-2">Diary</h2>
              <p className="text-zinc-600">Write your beautiful day here...</p>
            </div>
          </Link>

          <Link href="/dashboard/memories">
            <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-black mb-2">
                Memories
              </h2>
              <p className="text-zinc-600">Capture your precious moments...</p>
            </div>
          </Link>

          <Link href="/dashboard/verifypage">
            <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-black mb-2">
                Message Storage
              </h2>
              <p className="text-zinc-600">
                Keep your private thoughts safe here...
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
