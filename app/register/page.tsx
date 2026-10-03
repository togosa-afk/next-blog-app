"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: "",
    fieldErrors: {},
    success: false,
  });
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-12 text-slate-900 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-md">
        <header className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Join the community
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="mt-3 text-slate-600">
            Set up your profile to share blogs with other readers.
          </p>
        </header>
        <form
          action={formAction}
          onSubmit={(event) => {
            const formData = new FormData(event.currentTarget);
            if (formData.get("password") !== formData.get("passwordConfirm")) {
              event.preventDefault();
              setPasswordConfirmError("Passwords do not match");
              return;
            }
            setPasswordConfirmError("");
          }}
          className="space-y-5 border-y border-slate-200 py-7"
        >
          {state.errors && (
            <p role="alert" className="text-sm text-red-700">
              {state.errors}
            </p>
          )}
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
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
            />
            {state.fieldErrors.username && (
              <p
                data-testid="username-error"
                role="alert"
                className="text-sm text-red-700"
              >
                {state.fieldErrors.username}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-slate-800"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              required
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
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
              autoComplete="new-password"
              required
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-semibold text-slate-800"
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              autoComplete="new-password"
              required
              aria-invalid={Boolean(
                passwordConfirmError || state.fieldErrors.passwordConfirm,
              )}
              aria-describedby={
                passwordConfirmError || state.fieldErrors.passwordConfirm
                  ? "passwordConfirm-error"
                  : undefined
              }
              onChange={() => setPasswordConfirmError("")}
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
            />
            {(passwordConfirmError || state.fieldErrors.passwordConfirm) && (
              <p
                id="passwordConfirm-error"
                data-testid="passwordConfirm-error"
                role="alert"
                className="text-sm text-red-700"
              >
                {passwordConfirmError || state.fieldErrors.passwordConfirm}
              </p>
            )}
          </div>
          <button
            type="submit"
            data-testid="register-button"
            className="w-full rounded-md bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Create account
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
