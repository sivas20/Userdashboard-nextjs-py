"use client";
import { useState } from "react";

export default function Memorysection() {
  const [place, setPlace] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages((prev) => [...prev, ...filesArray]);
  };

  // Handle drag drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
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

  // Save
  const handleSave = () => {
    if (!place || !text) return;

    const newEntry = {
      place,
      text,
      images,
    };

    console.log(newEntry);

    setPlace("");
    setText("");
    setImages([]);
  };

  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl text-black font-semibold mb-6 text-center">
          <i>Place your memories</i>
        </h2>
        <input
          placeholder="Enter place..."
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="w-full text-black p-3 mb-4 border rounded-md"
        />
        <textarea
          placeholder="Write about your memories here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full text-black p-3 h-32 border rounded-md mb-4"
        />
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition mb-6 ${
            dragging
              ? "bg-blue-100 border-blue-500"
              : "border-gray-400 hover:bg-gray-100"
          }`}
        >
          <p className="text-gray-600">
            Drag & drop images here or click to upload
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
            className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700"
          >
            Save Entry
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard/memories")}
            className="px-5 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-500"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
