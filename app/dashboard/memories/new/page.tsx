"use client";
import { useState } from "react";

export default function Memorysection() {
  const [place, setPlace] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setImages(filesArray);
  };

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
    <div className="mt-10 max-w-170 p-10 bg-zinc-100 rounded-lg shadow">
      <h2 className="text-2xl text-black font-semibold mb-6"><i>Place your memories</i></h2>
      <input
        placeholder="Place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        className="w-50 text-black p-2 mb-3 border rounded-md"
      />
      <div>
        <textarea
          placeholder="Write about your memories here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-150 text-black p-3 h-32 border rounded-md mb-3"
        />
      </div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Images (You can select multiple pictures)
      </label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="w-full text-black mb-6"
      />
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={URL.createObjectURL(img)}
              alt="preview"
              className="h-24 w-full object-cover rounded-md"
            />
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-800 text-white mr-2 rounded-md hover:bg-gray-700"
        >
          Save Entry
        </button>
        <button
          onClick={() => (window.location.href = "/dashboard/memories")}
          className="px-4 py-2 bg-orange-400 text-white rounded-md hover:text-black hover:bg-gray-400"
        >
          Back
        </button>
      </div>
    </div>
  );
}
