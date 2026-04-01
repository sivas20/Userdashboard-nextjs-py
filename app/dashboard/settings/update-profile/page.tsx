"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    about: "",
  });

  const router = useRouter();
  const [file, setFile] = useState(null);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        setFormData({
          name: data.full_name || "",
          gender: data.gender || "",
          email: data.email || "",
          about: data.about || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("full_name", formData.name);
    data.append("gender", formData.gender);
    data.append("email", formData.email);
    data.append("about", formData.about);

    if (file) {
      data.append("profile_picture", file);
    }

    try {
      const res = await fetch("http://localhost:5000/profile/update", {
        method: "PATCH",
        body: data,
        credentials: "include",
      });

        if (res.ok) {
            router.push("/dashboard/profile");
        } else {
            const errorData = await res.json();
            alert(errorData.message || "Error updating profile");
        }
    } catch (err) {
        alert("Server error");
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
      <main className="flex-1 p-10 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-black">
          <i>Profile</i>
        </h1>

        <div className="items-center max-w-180 md:grid-cols-2 gap-6 mt-8">
          <form onSubmit={handleSubmit} className="p-6 bg-zinc-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black mb-2">
              Update Profile
            </h2>

            <div className="mb-4">
              <label className="block text-zinc-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border text-black rounded-md border-gray-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-zinc-600 mb-1">Gender</label>

              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label className="mr-4 ml-1 text-black">Male</label>

              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label className="ml-1 text-black">Female</label>
            </div>

            <div className="mb-4">
              <label className="block text-zinc-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-black border-gray-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-zinc-600 mb-1">Profile Picture</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-md text-black border-gray-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-zinc-600 mb-1">About Me</label>
              <textarea
                name="about"
                rows={4}
                value={formData.about}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-black border-gray-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-green-700 transition"
            >
              Save Changes
            </button>

            <Link href="/dashboard/settings">
              <button
                type="button"
                className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Back
              </button>
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
}