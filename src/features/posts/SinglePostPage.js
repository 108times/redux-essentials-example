import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import { selectPostById } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'
import TimeAgo from './TimeAgo'
const SinglePostPage = ({ match }) => {
  const { postId } = match.params
  const post = useSelector((state) => selectPostById(state, postId))
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <div className="post-bottom-edit">
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
          <ReactionButtons post={post} />
          <Link
            style={{ display: 'block', marginTop: '1rem' }}
            to={`/posts/edit/${postId}`}
            className="button round-button full-button"
          >
            Edit
          </Link>
        </div>
      </article>
    </section>
  )
}

export default SinglePostPage
