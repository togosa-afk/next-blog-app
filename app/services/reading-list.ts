import {db} from "@/db"
import {blogs, readingList} from "@/db/schema"
import {eq} from "drizzle-orm"

export const getReadingListByUserId = (userId: number) => {
    return db.select().from(readingList).where(eq(readingList.userId, userId))
}

export const getReadingListItemsByUserId = (userId: number) => db
  .select({
    id: readingList.id,
    read: readingList.read,
    blog: blogs,
  })
  .from(readingList)
  .innerJoin(blogs, eq(readingList.blogId, blogs.id))
  .where(eq(readingList.userId, userId))

  