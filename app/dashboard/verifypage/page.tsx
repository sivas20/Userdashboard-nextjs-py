"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function VerifyPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

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
          <form action="/RegisterMessagePassword" method="POST">
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
                className="w-full text-black p-3 pr-10 border rounded-md"
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
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password..."
                className="w-full text-black p-3 pr-10 border rounded-md"
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

          <p className="text-center mt-4 text-zinc-500">
            Already have password?{" "}
            <span
              onClick={() => setIsNewUser(false)}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>

      ) : (
        <div className="max-w-120 mx-auto p-10 bg-gray-500/25 rounded-xl shadow-md">
          <h2 className="text-2xl text-black font-semibold mb-2 text-center">
            <i>Message Login</i>
          </h2>
          <p className="text-center text-zinc-500 mb-6">
            Enter your password to access messages.
          </p>

          <form action="/VerifyMessagePassword" method="POST">
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
                className="w-100 mr-3 text-black p-3 border rounded-md"
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
                <input type="checkbox"
                       className="mr-2 hover:cursor-pointer hover:text-gray-700 transition"
                />
                <label className="text-zinc-500">
                  Remember me
                </label>
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