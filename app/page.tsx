"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white flex flex-col">

      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold">MySpace</h1>
        <div className="space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-black transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
      <div className="flex flex-1 items-center justify-center text-center px-6">
        <div className="max-w-3xl">

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold mb-6"
          >
            Organize Your Life, Beautifully ✨
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-zinc-300 mb-8"
          >
            Manage tasks, write your diary, store memories, and keep your thoughts safe — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/register">
              <button className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition">
                Get Started
              </button>
            </Link>
          </motion.div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10 pb-16">
        
        {[
          { title: "Tasks", desc: "Track your daily goals" },
          { title: "Diary", desc: "Write your daily thoughts" },
          { title: "Memories", desc: "Save special moments" },
          { title: "Secure Notes", desc: "Keep secrets safe" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-zinc-800 rounded-xl hover:scale-105 hover:bg-zinc-700 transition shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-zinc-400 text-sm">{item.desc}</p>
          </motion.div>
        ))}

      </div>
    </div>
  );
}