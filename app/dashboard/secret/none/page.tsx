"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Secretone() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (!title || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/secrets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, message }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Saved successfully ✅");

        // clear fields
        setTitle("");
        setMessage("");

        // redirect to list page
        router.push("/dashboard/secret");
      } else {
        alert(data.error || "Error saving message");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-black mb-2 text-center">
          🔒 Message Storage
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Keep your private thoughts safe and secure.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter message title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Write your secret message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-48 p-3 text-black border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-900 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
            >
              Save Message
            </button>

            <button
              onClick={() => router.push("/dashboard/secret")}
              className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-md transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}