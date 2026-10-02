// app/users/[username]/page.tsx
// import Link from "next/link"
import { getUserWithBlogs } from "../../services/users";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);
  const user = await getUserWithBlogs(decodedUsername);

  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-12 text-slate-900 sm:px-8 sm:py-16">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/users"
          className="text-sm font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
        >
          All writers
        </Link>
        <header className="mt-7 border-b border-slate-200 pb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Writer profile
          </p>
          <h1 className="wrap-break-word text-4xl font-semibold tracking-tight sm:text-5xl">
            {user.name}
          </h1>
          <p className="mt-3 text-slate-600">@{user.username}</p>
        </header>
        <section aria-labelledby="writer-blogs-heading" className="pt-8">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="writer-blogs-heading" className="text-xl font-semibold">
              Blogs
            </h2>
            <p className="text-sm text-slate-500">
              {user.blogs.length} {user.blogs.length === 1 ? "post" : "posts"}
            </p>
          </div>
          {user.blogs.length > 0 ? (
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {user.blogs.map((blog) => (
                <li key={blog.id} className="py-5">
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="wrap-break-word text-lg font-semibold text-slate-900 hover:text-emerald-800 hover:underline hover:decoration-emerald-700 hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
                  >
                    {blog.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-500">
                    {blog.likes} {blog.likes === 1 ? "like" : "likes"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="border-y border-slate-200 py-8 text-slate-600">
              This writer has not shared any blogs yet.
            </p>
          )}
        </section>
      </article>
    </main>
  );
}
