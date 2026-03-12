import Link from "next/link";
export default function Acccountmanagement() {
    return (
        <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
            <main className="flex-1 p-16 bg-white">
                <h1 className="text-3xl font-semibold mb-6 text-black">
                    <i>Account Management</i>
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Here you can change your password, manage connected accounts, and more.
                </p>
                <div className="mt-10 space-y-6">
                    <Link href="/dashboard/settings/accountmanagement/password">
                        <div className="p-6 bg-zinc-100 mb-6 hover:bg-zinc-300 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-black mb-2">Change Password</h2>
                            <p className="text-zinc-600">Update your password to keep your account secure.</p>
                        </div>
                    </Link>
                    <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-black mb-2">Connected Accounts</h2>
                        <p className="text-zinc-600">Manage your connections with third-party services.</p>
                    </div>
                    <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-black mb-2">Two-Factor Authentication</h2>
                        <p className="text-zinc-600">Enable two-factor authentication for added security.</p>
                    </div>
                    <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-black mb-2">Account Deletion</h2>
                        <p className="text-zinc-600">Permanently delete your account and all associated data.</p>
                    </div>
                </div>
            </main>
        </div>
    );
    
}