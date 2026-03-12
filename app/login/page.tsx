export default function Login() {
  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4">
        <main className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl text-center font-semibold text-black mb-6">
                Login
            </h1>
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-black mb-1">
                        User Name
                    </label>
                    <input type="text" className="w-full p-2 text-black border border-gray-300 rounded-lg"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-black mb-1">
                        Password
                    </label>
                    <input type="password" className="w-full p-2 text-black border border-gray-300 rounded-lg"/>
                </div>
                <button type="submit" className="w-full p-2 bg-gray-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow">
                    Login
                </button>
            </form>
        </main>
    </div>
  );
}