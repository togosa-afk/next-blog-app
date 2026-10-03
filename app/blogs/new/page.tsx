"use client";
import { createBlog } from "@/app/actions/blogs";
import { useActionState, useEffect, useRef } from "react";
import { useNotification } from "../../components/NotificationContext";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    success: false,
  });

  const { showNotification } = useNotification();
  const router = useRouter();
  const successHandled = useRef(false);

  useEffect(() => {
    if (state.success && !successHandled.current) {
      successHandled.current = true;
      showNotification("Blog created");
      router.push("/blogs");
    }
  }, [state.success, showNotification, router]);

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-12 text-slate-900 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Contribute
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Create a blog
          </h1>
          <p className="mt-3 text-slate-600">
            Add a title, author, and a link to share with the community.
          </p>
        </header>

        <form
          action={formAction}
          className="space-y-6 border-y border-slate-200 py-8"
        >
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-slate-800"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              required
              minLength={4}
              aria-invalid={Boolean(state.errors.title)}
              aria-describedby={state.errors.title ? "title-error" : undefined}
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 aria-invalid:border-red-700"
            />
            {state.errors.title && (
              <p id="title-error" role="alert" className="text-sm text-red-700">
                {state.errors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="author"
              className="block text-sm font-semibold text-slate-800"
            >
              Author
            </label>
            <input
              id="author"
              type="text"
              name="author"
              required
              minLength={4}
              aria-invalid={Boolean(state.errors.author)}
              aria-describedby={
                state.errors.author ? "author-error" : undefined
              }
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 aria-invalid:border-red-700"
            />
            {state.errors.author && (
              <p
                id="author-error"
                role="alert"
                className="text-sm text-red-700"
              >
                {state.errors.author}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="url"
              className="block text-sm font-semibold text-slate-800"
            >
              URL
            </label>
            <input
              id="url"
              type="url"
              name="url"
              required
              aria-invalid={Boolean(state.errors.url)}
              aria-describedby={state.errors.url ? "url-error" : undefined}
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 aria-invalid:border-red-700"
            />
            {state.errors.url && (
              <p id="url-error" role="alert" className="text-sm text-red-700">
                {state.errors.url}
              </p>
            )}
          </div>

          <button
            type="submit"
            data-testid="create-blog-button"
            className="rounded-md bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Create blog
          </button>
        </form>
      </div>
    </main>
  );
}
