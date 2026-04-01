"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [errors, setErrors] = useState<any>({});

  // ✅ Simple validation (LOGIN should be simple)
  const validate = (username: string, password: string) => {
    let err: any = {};
    if (!username) err.username = "Username is required";
    if (!password) err.password = "Password is required";
    return err;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const validateErrors = validate(username, password);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    setErrors({});

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
      } else {
        setErrors({ general: data.message || "Invalid credentials" });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Server error. Try again." });
    }
  };

  return (
    <div className="relative min-h-screen py-20 px-4 overflow-hidden">

      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <motion.div
        className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl top-10 left-10"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <main className="max-w-md mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-8">

        <h1 className="text-3xl text-center font-semibold text-white mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div>
            <label className="text-white">Username</label>
            <input
              name="username"
              type="text"
              className="w-full p-2 text-white bg-transparent border border-gray-400 rounded-lg"
            />
            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-white">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pr-10 text-white bg-transparent border border-gray-400 rounded-lg"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>

            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <p className="text-red-400 text-sm text-center">
              {errors.general}
            </p>
          )}

          <button
            type="submit"
            className="w-full p-2 bg-purple-600 hover:bg-purple-800 text-white rounded-lg"
          >
            Login
          </button>

          <p className="text-center text-gray-300">
            <a href="/login/forgotpassword" className="text-purple-400">
              Forgot password?
            </a>
          </p>

        </form>
      </main>
    </div>
  );
}

