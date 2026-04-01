"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");
  const validatepassword = (password: string) => {
    let errors: string[] = [];
    if (password.length < 6) errors.push("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Password must contain at least one special character");
    return errors;
  };

  const validate = () => {
    let err: any = {};
    if (!password) err.password = "Password is required";
    if (password && password.length < 6) err.password = "Password must be at least 6 characters";
    if (password !== confirm && confirm !== password) err.confirm = "Passwords do not match";
    return err;
  }

  const handleSubmit = async (e: any) => {
    setSuccess("");
    const validationErrors = validate();
    const passwordErrors = validatepassword(password);
    if (passwordErrors.length > 0) {
      setErrors({
        ...errors,
        password: passwordErrors.join(", "),
      });
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/resetpassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
      } else {
        setErrors(data.error || "Error updating password");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-white font-semibold mb-6 text-center">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pr-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-2 pr-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-gray-300"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-lg shadow transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>
      </div>
    </div>
  );
}