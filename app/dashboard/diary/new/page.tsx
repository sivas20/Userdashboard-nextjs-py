"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DiarySection() {
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const router = useRouter();

  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const validate = () => {
    let err: any = {};

    if (!date) err.date = "Date is required";
    if (!text) err.text = "Text is required";

    return err;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (images.length + files.length > 3) {
      alert("You can upload maximum 3 images only");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    if (images.length + files.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...files]);
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleSave = async () => {
    setSuccess("");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const formData = new FormData();

      formData.append("date", date);
      formData.append("description", text);

      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch("http://localhost:5000/newdiary", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        setSuccess("Diary saved successfully !");

        setTimeout(() => {
          router.push("/dashboard/diary");
        }, 1000);
      } else {
        alert("Failed to save diary");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="mt-10 p-6 bg-zinc-100 rounded-lg shadow max-w-3xl mx-auto">
      
      <h2 className="text-2xl text-black font-semibold mb-6 text-center">
        <i>My Diary</i>
      </h2>

      {success && (
        <p className="text-green-600 text-center mb-3">{success}</p>
      )}

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full text-black p-2 mb-2 border rounded-md"
      />
      {errors.date && (
        <p className="text-red-500 text-sm mb-3">{errors.date}</p>
      )}

      <textarea
        placeholder="Write your thoughts here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full text-black p-3 h-40 border rounded-md mb-2"
      />
      {errors.text && (
        <p className="text-red-500 text-sm mb-3">{errors.text}</p>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition mb-4 ${
          dragging
            ? "bg-blue-100 border-blue-500"
            : "border-gray-400 hover:bg-gray-100"
        }`}
      >
        <p className="text-gray-600">
          Drag & drop images (max 3) or click to upload
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="fileUpload"
        />

        <label
          htmlFor="fileUpload"
          className="block mt-2 text-blue-600 underline cursor-pointer"
        >
          Browse Files
        </label>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {images.length}/3 images selected
      </p>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(img)}
                alt="preview"
                className="h-24 w-full object-cover rounded-md"
              />

              <button
                onClick={() =>
                  setImages(images.filter((_, i) => i !== index))
                }
                className="absolute top-1 right-1 bg-black text-white text-xs px-2 rounded-full"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-green-700"
        >
          Save Entry
        </button>

        <button
          onClick={() => (window.location.href = "/dashboard/diary")}
          className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-500"
        >
          Back
        </button>
      </div>
    </div>
  );
}