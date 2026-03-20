import { Italic } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen bg-zinc-100 py-20 px-4">
      <main className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl text-center font-semibold text-black mb-6">
          Register
        </h1>
        <form action="/register" method="POST" className="space-y-6">
          <div>
            <label className="block text-m font-medium text-black mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Your nickname"
              className="w-full p-2 text-black border border-gray-300 rounded-lg placeholder:italic placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full p-2 text-black border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 text-black border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-gray-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow"
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
}
