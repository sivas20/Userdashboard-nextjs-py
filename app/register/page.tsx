"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");

  // 🔐 password validation
  const validatepassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("Min 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("1 uppercase");
    if (!/[a-z]/.test(password)) errors.push("1 lowercase");
    if (!/[0-9]/.test(password)) errors.push("1 number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("1 special char");
    return errors;
  };

  const validate = (username: string, phone: string, password: string) => {
    let err: any = {};

    if (!username) err.username = "Username is required";
    if (!phone) err.phone = "Phone number is required";
    if (!password) {
      err.password = "Password is required";
    } else {
      const passwordErrors = validatepassword(password);
      if (passwordErrors.length > 0) {
        err.password = passwordErrors.join(", ");
      }
    }

    return err;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSuccess("");

    const username = e.target.username.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    const validateErrors = validate(username, phone, password);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    setErrors({});

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, phone, password }),
      });

      const data = await res.json();

      if (res.ok) { 
        router.push("/login");
      } else {
        setErrors({ general: data.message || "Registration failed" });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Server error" });
    }
  };

  return (
    <div className="relative min-h-screen py-20 px-4 overflow-hidden">

      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <main className="max-w-md mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-8">

        <h1 className="text-3xl text-center font-semibold text-white mb-6">
          Register
        </h1>

        {errors.general && (
          <p className="text-red-400 text-sm mb-3">{errors.general}</p>
        )}

        {success && (
          <p className="text-green-400 text-sm mb-3">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div>
            <label className="text-white">Username</label>
            <input
              name="username"
              className="w-full p-2 text-white bg-transparent border rounded-lg"
            />
            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-white">Phone</label>
            <input
              name="phone"
              className="w-full p-2 text-white bg-transparent border rounded-lg"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-white">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pr-10 text-white bg-transparent border rounded-lg"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button className="w-full p-2 bg-purple-600 text-white rounded-lg">
            Register
          </button>

        </form>
      </main>
    </div>
  );
}