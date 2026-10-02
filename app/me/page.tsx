import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateApiToken } from "../actions/users"

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const token = user.token?.trim() || null

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-stone-50 px-5 py-12 text-slate-900 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-2xl">
        <header className="border-b border-slate-200 pb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Account
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {user.name}
          </h1>
          <p className="mt-3 text-slate-600">@{user.username}</p>
        </header>

        <section aria-labelledby="api-token-heading" className="pt-8">
          <h2 id="api-token-heading" className="text-xl font-semibold">
            API token
          </h2>
          {token ? (
            <p className="mt-4 break-all rounded-md border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-800">
              {token}
            </p>
          ) : (
            <p className="mt-4 text-slate-600">
              No token has been generated yet.
            </p>
          )}
          <form action={generateApiToken} className="mt-6">
            <button
              type="submit"
              className="rounded-md bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
              Generate token
            </button>
          </form>
        </section>
      </section>
    </main>
  )
}
