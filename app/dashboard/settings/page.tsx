import Link from "next/link";
export default function DashboardSettings() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
      <main className="flex-1 p-16 bg-white">
        <h1 className="text-3xl font-semibold mb-6 text-black">
          <i>Dashboard Settings</i>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Here you can customize your dashboard preferences and manage your account settings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <Link href="/dashboard/settings/update-profile">
          <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black mb-2">Profile Settings</h2>
            <p className="text-zinc-600">Update your personal information and profile picture.</p>
          </div>
           </Link>
           <Link href="/dashboard/settings/notifications">
            <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black mb-2">Notification Preferences</h2>
            <p className="text-zinc-600">Manage your email and push notification settings.</p>
          </div>
           </Link>
            <Link href="/dashboard/settings/privacy">
            <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black mb-2">Privacy Settings</h2>
            <p className="text-zinc-600">Control who can see your information and activity.</p>
          </div>
            </Link>
            <Link href="/dashboard/settings/accountmanagement">
            <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black mb-2">Account Management</h2>
            <p className="text-zinc-600">Change your password, manage connected accounts, and more.</p>
          </div>
            </Link>
        </div>
        </main>
    </div>
  );
}