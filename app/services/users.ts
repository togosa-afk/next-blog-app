import {db} from '@/db'
import {blogs, users} from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getUser = async () =>{
    return await db.select().from(users)
}

export const getUserByUsername= async (username: string) => {
    return await db.query.users.findFirst({
        where: eq(users.username,username)
    })
}

export const getBlogsByUserId = async (userId: number) => {
  return db.query.blogs.findMany({
    where: eq(blogs.userId, userId),
  })
}

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}