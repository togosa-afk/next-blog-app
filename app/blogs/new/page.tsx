import { createBlog } from "@/app/actions/blogs"

export default function NewBlogPage() {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={createBlog}>
        <div>
          title: <input type="text" name="title" required />
        </div>
        <div>
          author: <input type="text" name="author" required />
        </div>
        <div>
          url: <input type="text" name="url" required />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}