import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getBlogs = () => {
  return db.select().from(blogs);
};

export const getBlogsByUserId = (userId: number) => {
  return db.select().from(blogs).where(eq(blogs.userId, userId));
}



export const getById = async (id: number) => {
  const result = await db.select().from(blogs).where(eq(blogs.id, id));
  return result[0] || null;
};

export const createBlog = async (newBlog: {
  title: string;
  author: string;
  url: string;
  userId: number;
  likes?: number;
}) => {
  const [created] = await db
    .insert(blogs)
    .values({
      title: newBlog.title,
      author: newBlog.author,
      userId: newBlog.userId,
      url: newBlog.url,
      likes: newBlog.likes ?? 0,
    })
    .returning();
  return created;
};

export const likeBlog = async (id: number) => {
  const blog = await getById(id);

  if (!blog) return null;

  const [updated] = await db
    .update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id))
    .returning();

  return updated;
};
