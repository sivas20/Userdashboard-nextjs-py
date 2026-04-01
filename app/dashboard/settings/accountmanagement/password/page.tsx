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
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");
  const validatepassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 6) errors.push("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Password must contain at least one special character");
    return errors;
  };
  const validate = () => {
    let err: any = {};
    if (!currentPassword) err.currentPassword = "Current password is required";
    if (!newPassword) err.newPassword = "New password is required";
    if (newPassword && newPassword.length < 6) err.newPassword = "New password must be at least 6 characters";
    if (newPassword !== confirmPassword && confirmPassword !== newPassword) err.confirmPassword = "Passwords do not match";
    return err;
  };

  const handleSubmit = async (e: any) => {
    setSuccess("");
    const validationErrors = validate();
    const passwordErrors = validatepassword(newPassword);
    if (passwordErrors.length > 0) {
      setErrors({
        ...errors,
        newPassword: passwordErrors.join(", "),
      });
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
      setErrors({});

    try {
      const res = await fetch("http://localhost:5000/changepassword", {
        method: "PATCH",
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
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccess("Password updated successfully");
      } else {
        setErrors(
         data.message || "Error updating password",
        );
      }

    } catch (err) {
      console.log(err);
      alert("Server error - try again later");
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