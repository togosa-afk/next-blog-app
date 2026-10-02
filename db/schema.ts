import { relations } from "drizzle-orm"
import { pgTable, serial, text, integer, uniqueIndex, boolean } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
})

export const blogs = pgTable("blogs" , {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").default(0).notNull(),
  userId: integer("user_id").notNull().references(()=>users.id)
})

export const readingList = pgTable(
  "reading_list",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    blogId: integer("blog_id").notNull().references(() => blogs.id),
    blogTitle: text("blog_title").notNull(),
    read: boolean("read").notNull().default(false)
  },
  (table) => ({
    userBlogUnique: uniqueIndex("reading_list_user_blog_unique").on(
      table.userId,
      table.blogId,
    ),
  }),
);

export const userRelation = relations(users, ({many})=> ({
  blogs: many(blogs)
}))

export const blogRelation = relations(blogs, ({one})=>({
  user: one(users ,{
    fields: [blogs.userId],
    references: [users.id]
  })
}))