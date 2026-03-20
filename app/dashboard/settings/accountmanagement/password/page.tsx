"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordChange() {

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Error updating password");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return(
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
      <main className="flex-1 p-16 bg-white">

        <h1 className="text-3xl font-semibold mb-3 text-black">
          <i>Change your password</i>
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          To change your password, enter your current password and choose a new secure password.
        </p>

        <div className="mt-8 space-y-3">

          <div className="p-2 text-black bg-zinc-100">
            <h2 className="text-xl font-semibold mb-2">Current Password</h2>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border border-zinc-300 rounded pr-10"
                placeholder="Enter your current password"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-2.5">
                {showCurrent ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
          </div>

          <div className="p-2 text-black bg-zinc-100">
            <h2 className="text-xl font-semibold mb-2">New Password</h2>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-zinc-300 rounded pr-10"
                placeholder="Enter your new password"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-2.5">
                {showNew ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
          </div>

          <div className="p-2 mb-2 text-black bg-zinc-100">
            <h2 className="text-xl font-semibold mb-2">Confirm New Password</h2>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-zinc-300 rounded pr-10"
                placeholder="Confirm your new password"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-2.5">
                {showConfirm ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-green-800"
          >
            Update Password
          </button>

        </div>
      </main>
    </div>
  )
}