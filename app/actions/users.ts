"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "../services/session"

export const registerUser = async (
  _previousState: { errors: string; success: boolean },
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string

  if (!username || username.length < 8) {
    return {
      errors: "Username must be at least 8 characters",
      success: false,
    }
  }

  if (!password || password.length < 8) {
    return {
      errors: "Password must be at least 8 characters",
      success: false,
    }
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (existingUser) {
    return {
      errors: "Username is already taken",
      success: false,
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  revalidatePath("/register")
  redirect("/login")
}

export const generateApiToken = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const token = crypto.randomUUID()

  await db.update(users).set({ token }).where(eq(users.id, user.id))

  revalidatePath("/me")
}