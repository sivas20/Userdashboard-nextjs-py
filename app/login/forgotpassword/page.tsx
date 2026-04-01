"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");
  const validatePhone = (phone: string) => {
    const errors: string[] = [];
    if (!/^\d{10}$/.test(phone)) errors.push("Phone number must be 10 digits");
    return errors;
  };

  const handleSendOTP = async (e: any) => {
    e.preventDefault();

    if (!phone) {
      alert("Enter phone number");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2); 
      } else {
        setErrors(data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  const handleVerifyOTP = async (e: any) => {
    e.preventDefault();

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/changepassword");
      } else {
        setErrors(data.error || "Invalid OTP");
      }
    } catch (err) {
      console.log(err);
      alert("Server error - try again later");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 py-20 px-4">
      <main className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">

        <h1 className="text-2xl font-semibold text-black mb-6">
          Forgot Password
        </h1>

        <p className="text-gray-600 mb-6">
          Enter your phone number to receive an OTP.
        </p>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-green-600 hover:bg-green-800 text-white rounded-lg"
            >
              Verify OTP
            </button>

          </form>
        )}

      </main>
    </div>
  );
}