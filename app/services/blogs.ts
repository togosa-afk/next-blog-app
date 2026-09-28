export interface Blog {
    id: string,
    title: string,
    author: string,
    url: string,
    likes: number
}

let blogs: Blog[] = [
  {
    id: "1",
    title: "React Patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 0,
  },
  {
    id: '2',
    title: 'test2',
    author: 'mohammed',
    url: 'https://github.com/togosa-afk',
    likes:1
  }
]

export const getBlog = () =>{
  return [...blogs].sort((a, b) => b.likes - a.likes)
}


export const addBlog = ( title: string, author: string, url:string) => {
  const newBlog: Blog = {
    id: String(blogs.length + 1),
    title,
    author,
    url,
    likes: 0,
  }
  blogs = blogs.concat(newBlog)
  return newBlog
}

export const getById = (id:string) =>{
  return blogs.find(b => b.id === id)
}

export const likeBlog = (id:string) =>{
  const blog = blogs.find((b) => b.id === id)
  if (blog) {
    blog.likes += 1
  }
  return blog
}
