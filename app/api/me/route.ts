import { NextResponse, NextRequest } from "next/server"
import {  getBlogsByUserId } from "../../services/blogs"
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const GET = async (req: NextRequest) => {
  const auth = req.headers.get('Authorization')

  if(!auth|| !auth.startsWith('Bearer ')) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const token = auth.substring(7).trim()

  if(!token){
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const user = await db.query.users.findFirst({
    where: eq(users.token, token)
  })

  if(!user){
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    createdBlogs: await getBlogsByUserId(user.id)
  })
}