"use client";

import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-emerald-950/10 bg-[#173b36] text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4 sm:px-8">
        <NavLink
          href="/"
          className="mr-2 text-lg font-bold tracking-wide text-[#d9f99d]"
        >
          Blog App
        </NavLink>
        <div className="flex items-center gap-5 text-sm font-medium text-emerald-50/80">
          <NavLink href="/blogs">blogs</NavLink>
          <NavLink href="/users">users</NavLink>
        </div>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-3 text-sm">
          {session ? (
            <>
              <NavLink href="/me">me</NavLink>
              <NavLink
                href="/blogs/new"
                className="rounded-md bg-[#d9f99d] px-3 py-2 font-semibold text-emerald-950 transition-colors hover:bg-white"
              >
                create blog
              </NavLink>
              <span className="hidden text-emerald-50/70 sm:inline">
                {session.user?.name} logged in
              </span>
              <button
                onClick={() => signOut()}
                className="rounded-md border border-white/20 px-3 py-2 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
              >
                logout
              </button>
            </>
          ) : (
            <>
              <NavLink href="/login">login</NavLink>
              <NavLink href="/register">register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
