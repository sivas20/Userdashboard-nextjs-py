"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  date: string;
  status: string;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const markCompleted = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/updatetask/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          status: "completed",
        }),
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: "completed" } : task
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ check overdue
  const isOverdue = (date: string) => {
    if (!date) return false;

    const today = new Date();
    const due = new Date(date);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    return due < today;
  };

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
      <main className="flex-1 p-16 bg-white">

        <h1 className="text-3xl font-semibold mb-6 text-black">
          <i>Your Tasks</i>
        </h1>

        <p className="text-lg text-zinc-600">
          Manage your tasks and track progress easily.
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
            tasks.map((task) => {
              const overdue = isOverdue(task.date);

              return (
                <div
                  key={task.id}
                  className="p-6 flex justify-between items-center bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow"
                >
                 
                  <div>
                    <h2 className="text-xl font-semibold text-black mb-2">
                      {task.title}
                    </h2>

                    <p className="text-zinc-600">
                      Due:{" "}
                      {task.date
                        ? new Date(task.date).toLocaleDateString()
                        : "No date"}
                    </p>
                  </div>

                  <div className="flex gap-3">

                    {task.status !== "completed" && overdue && (
                      <span className="px-3 py-1 rounded-lg bg-yellow-300 text-black font-medium">
                        Pending
                      </span>
                    )}

                    <button
                      onClick={() => markCompleted(task.id)}
                      className={`px-3 py-1 rounded-lg font-medium text-white ${
                        task.status === "completed"
                          ? "bg-green-600"
                          : "bg-gray-500 hover:bg-green-600"
                      }`}
                    >
                      {task.status === "completed"
                        ? "Completed"
                        : "Mark Complete"}
                    </button>

                  </div>
                </div>
              );
            })
          )}

        </div>
      </main>
    </div>
  );
}