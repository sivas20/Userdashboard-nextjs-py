import Link from "next/link";
export default function memories() {
  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4">
        <main className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
           <div className="flex items-center justify-between mb-8">
             <div>
                <h1 className="text-3xl font-semibold text-black">
                <i>My Memories</i>
            </h1>
            <p className="text-zinc-500 mt-1">
                Relive your cherished moments.
            </p>
            </div>
            <Link href="/dashboard/memories/new">
          <button className="px-5 py-2 bg-green-800 text-white rounded-md hover:bg-gray-700 transition">
            Create New Memory
          </button>
         </Link> 
           </div>
            <div className="text-center py-12 border rounded-lg bg-zinc-50 mt-10">
                <p className="text-zinc-600">
                    No memories yet. Start creating your first memory ✍
                </p>
                </div>
        </main>
    </div>
  );
}