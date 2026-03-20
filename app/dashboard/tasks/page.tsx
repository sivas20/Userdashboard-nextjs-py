"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  dueDate: string;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
      <main className="flex-1 p-16 bg-white">

        <h1 className="text-3xl font-semibold mb-6 text-black">
          <i>Your Tasks</i>
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Here you can view and manage your pending tasks.
        </p>

        <div className="mt-10 space-y-4">

          <Link href="/dashboard/tasks/newone">
            <button className="p-2 bg-gray-700 mb-3 hover:bg-green-700 text-white font-semibold rounded-lg shadow">
              New task
            </button>
          </Link>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks available</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow"
              >
                <h2 className="text-xl font-semibold text-black mb-2">
                  {task.title}
                </h2>
                <p className="text-zinc-600">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))
          )}

        </div>
      </main>
    </div>
  );
}