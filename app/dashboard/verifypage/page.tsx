"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function VerifyPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const router = useRouter();

  // ✅ CHECK PASSWORD EXISTS
  useEffect(() => {
    const checkPassword = async () => {
      try {
        const res = await fetch("http://localhost:5000/checkmessagepassword", {
          method: "GET", // ✅ FIXED
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.exists) {
          setIsNewUser(false); // existing user → login
        } else {
          setIsNewUser(true); // new user → create password
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkPassword();
  }, []);

  // -------------------------
  // CREATE PASSWORD
  // -------------------------
  const handleCreatePassword = async (e: any) => {
    e.preventDefault();

    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/createmessagepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password created successfully");
        setIsNewUser(false); // switch to login
      } else {
        alert(data.error || "Error creating password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // -------------------------
  // VERIFY PASSWORD
  // -------------------------
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5000/verifymessagepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard/secret");
      } else {
        alert(data.error || "Invalid password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 py-20 px-4">

      {isNewUser ? (
        <div className="max-w-xl mx-auto p-10 bg-gray-500/25 rounded-xl shadow-md">
          <h2 className="text-2xl text-black font-semibold mb-2 text-center">
            <i>Create Password</i>
          </h2>
          <p className="text-center text-zinc-500 mb-8">
            Please create a password to secure Message storage.
          </p>

          <form onSubmit={handleCreatePassword}>
            <div className="relative mb-6">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
                className="w-full text-black p-3 pr-10 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-black right-3 top-3"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative mb-6">
              <input
                name="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password..."
                className="w-full text-black p-3 pr-10 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute text-black right-3 top-3"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className="w-full bg-gray-700 text-white p-3 rounded-md">
              Create Password
            </button>
          </form>
        </div>

      ) : (
        <div className="max-w-120 mx-auto p-10 bg-gray-500/25 rounded-xl shadow-md">
          <h2 className="text-2xl text-black font-semibold mb-2 text-center">
            <i>Message Login</i>
          </h2>
          <p className="text-center text-zinc-500 mb-6">
            Enter your password to access messages.
          </p>

          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
                className="w-full text-black p-3 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-black right-3 top-3"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="text-center mb-4">
              <input type="checkbox" className="mr-2 cursor-pointer" />
              <label className="text-zinc-500">Remember me</label>
            </div>

            <button className="w-full bg-gray-700 text-white p-3 rounded-md">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}