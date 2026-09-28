import Link from 'next/link'
import {getBlog} from '../services/blogs'

interface PageProps {
  searchParams: Promise<{ filter?: string }>
}

export default async function BlogsPage({searchParams} : PageProps) {

  const {filter = "" } = await searchParams
  const blogs = getBlog()
  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(filter.toLowerCase())). sort((a, b) => b.likes - a.likes)

 
  return (
    <div>
      <form action="/blogs" method="GET" style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="filter"
          defaultValue={filter}
          placeholder="Search blogs..."
        />
        <button type="submit">search</button>
      </form>
      <h1>Blogs</h1>
      <ul>
        {filteredBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> — {blog.author} ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </div>
  )
}