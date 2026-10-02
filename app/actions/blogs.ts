"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { createBlog as addBlog, likeBlog } from "../services/blogs";
import { getCurrentUser } from "@/app/services/session";
import { db } from "@/db";
import { blogs, readingList } from "@/db/schema";

type CreateBlogState = {
  errors: {
    title?: string;
    author?: string;
    url?: string;
  };
  success: boolean;
};

export const createBlog = async (
  _prevState: CreateBlogState,
  formData: FormData,
) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: CreateBlogState["errors"] = {};
  if (!title || title.length < 4) {
    errors.title = "Title must be at least 4 characters long";
  }

  if (!author || author.length < 4) {
    errors.author = "Author must be at least 4 characters long";
  }

  if (!url || url.length < 4) {
    errors.url = "URL must be at least 4 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  const newBlog = await addBlog({ title, author, url, userId: user.id });

  await db.insert(readingList).values({
  userId: user.id,
  blogId: newBlog.id,
  blogTitle: newBlog.title,
}).onConflictDoNothing();

  revalidatePath("/blogs");
  return { errors: {}, success: true };
};

export const likeBlogAction = async (formData: FormData) => {
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const blogId = Number(id);
  if (!Number.isInteger(blogId) || blogId <= 0) return;

  await likeBlog(blogId);

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/blogs");
};


export const addToReadingListAction = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id");
  if (typeof id !== "string") return;

  const blogId = Number(id);
  if (!Number.isInteger(blogId) || blogId <= 0) return;

  const [blog] = await db
    .select({ title: blogs.title })
    .from(blogs)
    .where(eq(blogs.id, blogId));

  await db.insert(readingList).values({
    userId: user.id,
    blogId,
    blogTitle: blog?.title || "",
  }).onConflictDoNothing();

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/reading-list");

}