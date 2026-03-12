import Link from "next/link";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-100">
      <aside className="w-74 bg-gray-500 p-6 shadow-md">
        <div className="py-4">
          <img
            src="/images/User.png"
            alt="User Profile"
            className="w-30 h-30 rounded-full mx-auto"
          />
        </div>
        <h2 className="text-xl text-center pt-4 font-bold mb-10 text-black dark:text-white">
          User Name
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="block w-full space-x-6 px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/profile"
              className="block w-full px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="block w-full px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/logout"
              className="block w-full px-4 py-2 rounded-md hover:bg-gray-400 hover:text-white transition"
            >
              Logout
            </Link>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
  );
}
