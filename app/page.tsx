import Link from "next/link";
import { getBlogs } from "./services/blogs";

const Home = async () => {
  const blogs = await getBlogs();
  const latestBlogs = [...blogs].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-12 text-slate-900 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-slate-200 pb-10 sm:pb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            A community journal
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Good ideas deserve to be shared.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Read notes and stories from the community, or add a useful link of
            your own.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/blogs"
              className="rounded-md bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
              Browse blogs
            </Link>
            <Link
              href="/blogs/new"
              className="rounded-md border border-emerald-900/25 px-5 py-3 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
              Create a blog
            </Link>
          </div>
        </header>

        <section
          aria-labelledby="latest-heading"
          className="grid gap-8 py-10 sm:grid-cols-[minmax(0,1fr)_15rem] sm:gap-12 sm:py-12"
        >
          <div>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 id="latest-heading" className="text-xl font-semibold">
                Popular blogs
              </h2>
              <Link
                href="/blogs"
                className="text-sm font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
              >
                View all
              </Link>
            </div>
            {latestBlogs.length > 0 ? (
              <ul className="divide-y divide-slate-200 border-y border-slate-200">
                {latestBlogs.map((blog) => (
                  <li
                    key={blog.id}
                    className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div className="min-w-0">
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="wrap-break-word text-lg font-semibold text-slate-900 hover:text-emerald-800 hover:underline hover:decoration-emerald-700 hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
                      >
                        {blog.title}
                      </Link>
                      <p className="mt-1 text-sm text-slate-600">
                        by {blog.author}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm text-slate-500">
                      {blog.likes} {blog.likes === 1 ? "like" : "likes"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-y border-slate-200 py-8 text-slate-600">
                No blogs yet. Be the first to contribute.
              </p>
            )}
          </div>

          <aside className="border-t border-slate-200 pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Explore
            </h2>
            <Link
              href="/users"
              className="mt-3 inline-flex text-base font-semibold text-emerald-900 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
            >
              Meet the writers
            </Link>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Find community members and browse the blogs they have shared.
            </p>
          </aside>
        </section>

        <footer className="border-t border-slate-200 pt-5 text-sm text-slate-500">
          Built with{" "}
          <a
            href="https://nextjs.org/learn"
            className="text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Next.js
          </a>
        </footer>
      </div>
    </main>
  );
};
export default Home;
