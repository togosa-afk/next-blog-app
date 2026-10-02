"use server"

import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { db } from "@/db";
import { readingList } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export const markAsReadAction = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id");
  if (typeof id !== "string") return;

  const readingListId = Number(id);
  if (!Number.isInteger(readingListId) || readingListId <= 0) return;

  await db.update(readingList)
    .set({ read: true })
    .where(eq(readingList.id, readingListId) && eq(readingList.userId, user.id));

  revalidatePath(`/me`);
  
}