import Link from "next/link";
export default function tasks() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black font-sans">
      <main className="flex-1 p-16 bg-white">
        <h1 className="text-3xl font-semibold mb-6 text-black">
          <i>Your Tasks</i>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Here you can view and manage your pending tasks.
        </p>
        <div className="mt-10 space-y-4">
            <Link href="/dashboard/tasks/newone">
              <button className="p-2 bg-gray-700 mb-3 hover:bg-green-700 text-white font-semibold rounded-lg shadow">
                New task
              </button>
            </Link>
          <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black mb-2">
              Task 1: Finish Project Report
            </h2>
            <p className="text-zinc-600">Due: Tomorrow</p>
          </div>
          <div className="p-6 bg-zinc-100 hover:bg-zinc-300 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black mb-2">
              Task 2: Prepare Presentation
            </h2>
            <p className="text-zinc-600">Due: In 2 days</p>
          </div>
        </div>
      </main>
    </div>
  );
}
