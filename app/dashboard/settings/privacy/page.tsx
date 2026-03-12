export default function Privacysettings() {
    return (
        <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
            <main className="flex-1 p-16 bg-white">
                <h1 className="text-3xl font-semibold mb-6 text-black">
                    <i>Privacy Settings</i>
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Here you can control who can see your information and activity on the dashboard.
                </p>
                <div className="mt-10 space-y-6">
                    <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-black mb-2">Profile Visibility</h2>
                        <p className="text-zinc-600">Choose who can see your profile information and activity.</p>
                    </div>
                    <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-black mb-2">Data Sharing</h2>
                        <p className="text-zinc-600">Manage your data sharing preferences with third-party services.</p>
                    </div>
                    <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-black mb-2">Blocked Users</h2>
                        <p className="text-zinc-600">View and manage the list of users you have blocked.</p>
                    </div>
                    <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-black mb-2">Activity Status</h2>
                        <p className="text-zinc-600">Control who can see your online status and activity.</p>
                    </div>
                </div>
            </main>
        </div>
    );
    
}