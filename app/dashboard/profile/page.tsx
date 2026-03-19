export default function Profile() {
  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4">
      <main className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-black">
              My Profile
            </h1>
            <p className="text-zinc-500 mt-1">
              your personal information.
            </p>
          </div>
          <div>
            <img
              src="/images/User.png"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-zinc-200"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <div>
            <p className="text-sm text-zinc-500">Name</p>
            <p className="font-medium px-3">Avis</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Gender</p>
            <p className="font-medium px-3">Male</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Phone</p>
            <p className="font-medium px-3">123-456-7890</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Email</p>
            <p className="font-medium px-3">avis@example.com</p>
          </div>
          <div className="md:col-span-2 mb-4">
            <p className="text-sm text-zinc-500">About</p>
            <p className="font-medium px-4">
              I am a software developer passionate about creating user-friendly applications.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}