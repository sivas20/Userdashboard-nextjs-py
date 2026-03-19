"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

type Message = {
  id: number;
  title: string;
  content: string;
};

export default function Secret() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, title: "My Secret 1", content: "This is secret message 1" },
    { id: 2, title: "Private Note", content: "Hidden thoughts here..." },
  ]);

  const handleView = (msg: Message) => {
    alert(msg.content); // later replace with modal/page
  };

  const handleEdit = (id: number) => {
    window.location.href = `/dashboard/secret/${id}`;
  };

  const handleDelete = (id: number) => {
    const updated = messages.filter((msg) => msg.id !== id);
    setMessages(updated);

    // 🔗 Backend API call later
    // fetch(`/api/messages/${id}`, { method: "DELETE" });
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center">
      <main className="w-full max-w-4xl mt-8 p-8 bg-white shadow rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-black">
            🔒 Message Storage
          </h1>
            <p className="text-zinc-500 ml-2 mt-1">
            Keep your private thoughts safe and organized.
          </p>
          </div>
          <Link href="/dashboard/secret/none">
            <button className="bg-gray-600 hover:bg-blue-900 text-white px-4 py-2 rounded-md">
              + New Message
            </button>
          </Link>
        </div>
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">
            No messages available.
          </p>
        ) : (
          <div className="space-y-4">

            {messages.map((msg) => (
              <div
                key={msg.id}
                className="flex justify-between items-center p-4 bg-zinc-100 rounded-lg shadow-sm hover:bg-zinc-200 transition"
              >
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    {msg.title}
                  </h2>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleView(msg)}
                    className="text-blue-600 hover:scale-110 transition"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => handleEdit(msg.id)}
                    className="text-yellow-600 hover:scale-110 transition"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-600 hover:scale-110 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </main>
    </div>
  );
}