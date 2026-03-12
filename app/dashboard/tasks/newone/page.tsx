"use client";
import { useState} from "react";
export default function newtask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, dueDate }),
        });
        const data = await response.json();
        console.log("Task created:", data);
    };

    return (
        <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
            <main className="flex-1 p-16 bg-white">
                <h1 className="text-3xl font-semibold mb-6 text-black">
                    <i>Create a New Task</i>
                </h1>
                <form className="mt-10 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">
                            Task Title
                        </label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 text-black border border-gray-300 rounded-lg"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">
                            Description
                        </label>
                        <textarea placeholder="Write here...." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 text-black border border-gray-300 rounded-lg" rows={4}></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">
                            Due Date
                        </label>
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 text-black border border-gray-300 rounded-lg"/>
                    </div>
                    <button type="submit" className="p-2 bg-gray-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow">
                        Add Task
                    </button>
                </form>
            </main>
        </div>
    );
}