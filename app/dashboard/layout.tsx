"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  profileImage?: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] = useState<User>({
    name: "Loading...",
    profileImage: "/images/User.png",
  });

  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile/data", {
          credentials: "include", 
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();

        setUser({
          name: data.username,
          profileImage: data.image || "/images/User.png",
        });

      } catch (err) {
        console.error("Auth error:", err);
        router.push("/login");
      } finally {
        setLoading(false); 
      }
    };

    loadUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/"); 
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-100">

      <aside className="w-72 bg-gray-500 p-6 shadow-md">
        <div className="py-4 text-center">
          <img
            src={user.profileImage}
            alt="User Profile"
            className="w-28 h-28 rounded-full mx-auto object-cover border-2 border-white"
          />
          <h2 className="text-xl pt-4 font-bold text-black">
            {user.name}
          </h2>
        </div>

        <ul className="space-y-2 mt-8">
          <li>
            <Link
              href="/dashboard"
              className="block px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/profile"
              className="block px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition"
            >
              Profile
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition"
            >
              Settings
            </Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-6 bg-white">
        {children}
      </main>
    </div>
  );
}