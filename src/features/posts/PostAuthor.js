import React from 'react'
import { useSelector } from 'react-redux'

export default function PostAuthor({ userId }) {
  console.log(userId)
  const author = useSelector((state) => state.users.find((u) => u.id == userId))
  return <span>by {author ? author.name : 'Unknown author'}</span>
}
