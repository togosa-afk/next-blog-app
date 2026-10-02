import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { generateApiToken } from "../actions/users";
import { markAsReadAction } from "../actions/reading-list";
import { getReadingListItemsByUserId } from "../services/reading-list";
import Link from "next/link";

export default async function MePage() {
  const user = await getCurrentUser();
  const items = user ? await getReadingListItemsByUserId(user.id) : [];
  const unreadBlogs = items.filter((item) => !item.read);
  const readBlogs = items.filter((item) => item.read);

  if (!user) {
    redirect("/login");
  }

  const token = user.token?.trim() || null;

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-12 text-slate-900 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-4xl">
        <header className="border-b border-slate-200 pb-8">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Your account
          </p>
          <div className="flex items-center gap-4 sm:gap-5">
            <div
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-semibold text-emerald-900 ring-4 ring-white sm:size-16"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="break-words text-3xl font-semibold tracking-tight sm:text-4xl">
                {user.name}
              </h1>
              <p className="mt-1 text-slate-600">@{user.username}</p>
            </div>
          </div>
          <dl className="mt-8 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-4">
            <div className="px-3 first:pl-0 sm:px-5">
              <dt className="text-xs font-medium text-slate-500 sm:text-sm">
                Saved
              </dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
                {items.length}
              </dd>
            </div>
            <div className="px-3 sm:px-5">
              <dt className="text-xs font-medium text-slate-500 sm:text-sm">
                To read
              </dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-emerald-800">
                {unreadBlogs.length}
              </dd>
            </div>
            <div className="px-3 last:pr-0 sm:px-5">
              <dt className="text-xs font-medium text-slate-500 sm:text-sm">
                Read
              </dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
                {readBlogs.length}
              </dd>
            </div>
          </dl>
        </header>

        <section aria-labelledby="reading-list-heading" className="pt-8">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              Keep your place
            </p>
            <h2
              id="reading-list-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Reading list
            </h2>
          </div>

          <section aria-labelledby="unread-heading">
            <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3">
              <h3 id="unread-heading" className="font-semibold text-slate-900">
                To read
              </h3>
              <span className="text-sm tabular-nums text-slate-500">
                {unreadBlogs.length}
              </span>
            </div>
            {unreadBlogs.length > 0 ? (
              <ul className="divide-y divide-slate-200">
                {unreadBlogs.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <Link
                        href={`/blogs/${item.blog.id}`}
                        className="break-words font-medium text-slate-900 decoration-emerald-700 decoration-2 underline-offset-4 hover:text-emerald-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
                      >
                        {item.blog.title}
                      </Link>
                      <p className="mt-1 text-sm text-slate-500">
                        by {item.blog.author}
                      </p>
                    </div>
                    <form action={markAsReadAction} className="shrink-0">
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-emerald-800 hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                      >
                        Mark as read
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-6">
                <p className="text-slate-600">
                  You&apos;re all caught up. Nothing left to read.
                </p>
                <Link
                  href="/blogs"
                  className="mt-3 inline-flex text-sm font-semibold text-emerald-800 underline decoration-emerald-700/40 underline-offset-4 hover:text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
                >
                  Explore blogs
                </Link>
              </div>
            )}
          </section>

          <section aria-labelledby="read-heading" className="mt-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3">
              <h3 id="read-heading" className="font-semibold text-slate-900">
                Finished
              </h3>
              <span className="text-sm tabular-nums text-slate-500">
                {readBlogs.length}
              </span>
            </div>
            {readBlogs.length > 0 ? (
              <ul className="divide-y divide-slate-200">
                {readBlogs.map((item) => (
                  <li key={item.id} className="py-4">
                    <Link
                      href={`/blogs/${item.blog.id}`}
                      className="break-words font-medium text-slate-700 decoration-emerald-700 decoration-2 underline-offset-4 hover:text-emerald-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
                    >
                      {item.blog.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-6 text-slate-600">
                Articles you finish will show up here.
              </p>
            )}
          </section>
        </section>

        <section
          aria-labelledby="api-token-heading"
          className="mt-10 border-t border-slate-200 pt-8"
        >
          <h2 id="api-token-heading" className="text-xl font-semibold">
            API token
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Keep this token private. Generating a new one replaces the current
            token.
          </p>
          {token ? (
            <p className="mt-4 break-all rounded-md border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-800 shadow-sm">
              {token}
            </p>
          ) : (
            <p className="mt-4 text-sm text-slate-600">
              No token has been generated yet.
            </p>
          )}

          <form action={generateApiToken} className="mt-5">
            <button
              type="submit"
              className="rounded-md bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
              {token ? "Regenerate token" : "Generate token"}
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
