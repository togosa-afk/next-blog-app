import Link from "next/link";
import { getBlogs } from "../services/blogs";

interface PageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const { filter = "" } = await searchParams;
  const blogs = await getBlogs();
  const filteredBlogs = blogs
    .filter((b) => b.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.likes - a.likes);

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-12 text-slate-900 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-9 flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              The journal
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Blogs
            </h1>
            <p className="mt-3 max-w-xl text-slate-600">
              Ideas, stories, and notes from our community.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500">
            {filteredBlogs.length}{" "}
            {filteredBlogs.length === 1 ? "post" : "posts"}
          </p>
        </header>

        <form
          action="/blogs"
          method="GET"
          role="search"
          className="mb-8 flex gap-2"
        >
          <label htmlFor="blog-filter" className="sr-only">
            Search blogs by title
          </label>
          <input
            id="blog-filter"
            type="search"
            name="filter"
            defaultValue={filter}
            placeholder="Search blog titles"
            className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
          />
          <button
            type="submit"
            className="rounded-md bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Search
          </button>
        </form>

        {filteredBlogs.length > 0 ? (
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {filteredBlogs.map((blog) => (
              <li
                key={blog.id}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="break-words text-xl font-semibold text-slate-900 decoration-emerald-700 decoration-2 underline-offset-4 hover:text-emerald-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
                  >
                    {blog.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600">
                    by {blog.author}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-medium text-slate-500">
                  <span className="text-emerald-800">{blog.likes}</span>{" "}
                  {blog.likes === 1 ? "like" : "likes"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="border-y border-slate-200 py-10 text-center text-slate-600">
            {filter
              ? "No blogs match your search."
              : "No blogs have been published yet."}
          </p>
        )}
      </div>
    </main>
  );
}
