import { getById } from "@/app/services/blogs";
import { addToReadingListAction, likeBlogAction } from "@/app/actions/blogs";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params;
  const blog = await getById(Number(id));

  if (!blog) {
    return (
      <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-16 text-center text-slate-600 sm:px-8">
        Blog not found
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-12 text-slate-900 sm:px-8 sm:py-16">
      <article data-testid="blog-detail" className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
          From the journal
        </p>
        <h1
          data-testid="blog-title"
          className="break-words text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
        >
          {blog.title}
        </h1>
        <p className="mt-5 border-b border-slate-200 pb-7 text-sm text-slate-600">
          Written by{" "}
          <span
            data-testid="blog-author"
            className="font-semibold text-slate-900"
          >
            {blog.author}
          </span>
        </p>
        <section
          aria-label="Blog details"
          className="grid gap-6 py-8 sm:grid-cols-[1fr_auto] sm:items-center"
        >
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Reference link
            </h2>
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block max-w-full break-all text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
            >
              {blog.url}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="sm:text-right">
            <p className="text-3xl font-semibold tabular-nums">{blog.likes}</p>
            <p className="text-sm text-slate-500">
              {blog.likes === 1 ? "like" : "likes"}
            </p>
          </div>
        </section>
        <form
          action={likeBlogAction}
          className="border-t border-slate-200 pt-6 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:space-y-0 "
        >
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            data-testid="like-blog-button"
            className="rounded-md bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Like this blog
          </button>
        </form>
        <form
          action={addToReadingListAction}
          className="border-t border-slate-200 pt-6 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:space-y-0 "
        >
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            data-testid="add-to-reading-list-button"
            className="rounded-md bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Add to reading list
          </button>
        </form>
      </article>
    </main>
  );
}
