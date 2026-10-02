import Link from "next/link";
import { getUser } from "../services/users";

export default async function UserPage() {
  const users = await getUser();

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-12 text-slate-900 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-end justify-between gap-4 border-b border-slate-200 pb-7">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              Community
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Writers
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            {users.length} {users.length === 1 ? "member" : "members"}
          </p>
        </header>
        {users.length > 0 ? (
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {users.map((user) => (
              <li key={user.id} className="py-5">
                <Link
                  href={`/users/${encodeURIComponent(user.username)}`}
                  className="text-lg font-semibold text-slate-900 hover:text-emerald-800 hover:underline hover:decoration-emerald-700 hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
                >
                  {user.name}
                </Link>
                <p className="mt-1 text-sm text-slate-500">@{user.username}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="border-y border-slate-200 py-10 text-slate-600">
            No members yet.
          </p>
        )}
      </div>
    </main>
  );
}
