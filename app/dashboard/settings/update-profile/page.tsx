import Link from "next/link";
export default function updateProfile() {
    return (
        <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
            <main className="flex-1 p-10 bg-white">
                <h1 className="text-3xl font-bold mb-6 text-black">
                    <i>Profile</i>
                </h1>
               
                <div className="items-center max-w-180 md:grid-cols-2 gap-6 mt-8">
                    <form action="/dashboard/settings/update-profile" method="POST" className="p-6 bg-zinc-100 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-black mb-2">Update Profile</h2>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-zinc-600 mb-1">Name</label>
                            <input type="text" id="name" name="name" className="w-full px-3 py-2 border text-bl rounded-md text-black border-gray-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-zinc-600 mb-1">Gender</label>
                            <input type="radio" id="male" name="gender" value="male" className="mr-2" />
                            <label htmlFor="male" className="text-zinc-600 mr-4">Male</label>
                            <input type="radio" id="female" name="gender" value="female" className="mr-2" />
                            <label htmlFor="female" className="text-zinc-600 mr-4">Female</label>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-zinc-600 mb-1">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md text-black border-gray-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profilePicture" className="block text-zinc-600 mb-1">Profile Picture</label>
                            <input type="file" id="profilePicture" name="profilePicture" className="w-full px-3 py-2 border rounded-md text-black border-gray-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="about" className="block text-zinc-600 mb-1">About Me</label>
                            <textarea id="about" name="about" rows={4} className="w-full px-3 py-2 border rounded-md text-black border-gray-500"></textarea>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-green-700 transition">Save Changes</button>
                        <Link href="/dashboard/settings">
                            <button type="button" className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">Back</button>
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    );
}