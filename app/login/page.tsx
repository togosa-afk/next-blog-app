"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "../components/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      showNotification("Login successful");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-12 text-slate-900 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-md">
        <header className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Welcome back
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-3 text-slate-600">
            Continue to the community journal.
          </p>
        </header>
        {error && (
          <p
            role="alert"
            data-testid="error-message"
            className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 border-y border-slate-200 py-7"
        >
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-slate-800"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              autoCapitalize="none"
              required
              aria-invalid={Boolean(error)}
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 aria-invalid:border-red-700"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-800"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              aria-invalid={Boolean(error)}
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 aria-invalid:border-red-700"
            />
          </div>
          <button
            type="submit"
            id="login-button"
            data-testid="login-button"
            className="w-full rounded-md bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-600">
          New here?{" "}
          <a
            href="/register"
            className="font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Create an account
          </a>
        </p>
      </section>
    </main>
  );
}
