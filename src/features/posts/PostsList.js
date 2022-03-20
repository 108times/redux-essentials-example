import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import { selectAllPosts } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'
import TimeAgo from './TimeAgo'

const PostsList = () => {
  const [isSorted, setIsSorted] = React.useState(false)

  const posts = useSelector(selectAllPosts())
  const orderedPosts = (posts) =>
    posts.slice().sort((a, b) => a.date.localeCompare(b.date))

  const sort = () => {
    setIsSorted(!isSorted)
  }

  const renderedPosts = (isSorted ? orderedPosts(posts) : posts).map((post) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>

        <div className="post-bottom">
          <Link to={`/posts/${post.id}`} className="button muted-button">
            View
          </Link>
          <div className="post-meta">
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
          </div>
        </div>
        <ReactionButtons post={post} />
      </article>
    )
  })

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={sort}>Sort</button>

      {renderedPosts}
    </section>
  )
}

export default PostsList
