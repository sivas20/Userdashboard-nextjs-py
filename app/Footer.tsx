"use client";
import { Mail, Phone, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
             <i>Avis</i>
          </h2>
          <p className="text-zinc-400">
            Capture your memories, manage tasks, and stay organized easily.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="flex items-center gap-2 text-zinc-400 mb-2">
            <Mail size={16} /> support@myapp.com
          </p>
          <p className="flex items-center gap-2 text-zinc-400">
            <Phone size={16} /> +91 98765 43210
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-5">
            <a href="#" className="hover:text-blue-500 flex items-center gap-1">
              <Facebook size={18} /> Facebook
            </a>
            <a href="#" className="hover:text-sky-400 flex items-center gap-1">
              <Twitter size={18} /> Twitter
            </a>
            <a href="#" className="hover:text-blue-300 flex items-center gap-1">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href="#" className="hover:text-green-400 flex items-center gap-1">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-700 text-center py-4 text-zinc-400 text-sm flex items-center justify-center gap-2">
        © <i>Avis</i> 2026. All rights reserved.
      </div>
    </footer>
  );
}