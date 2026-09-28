import { getById } from "@/app/services/blogs";
import { likeBlogAction } from '@/app/actions/blogs'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BlogPage({params}:PageProps) {

    const { id } = await params
    const blog = getById(id)

    if (!blog) {
        return <div>Blog not found</div>
    }

    return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>
        URL:{" "}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p>
        Likes: {blog.likes}{" "}
      </p>
      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
    </div>
  )
    
}