import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postUpdated, selectPostById } from './postsSlice'
import { useHistory } from 'react-router-dom'

function UpdatePostForm({ match }) {
  const { postId } = match.params

  const post = useSelector((state) => selectPostById(state, postId))

  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = React.useState(post?.title ?? '')
  const [content, setContent] = React.useState(post?.content ?? '')

  if (!post) {
    history.push(`/`)
  }

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case 'postTitle':
        return setTitle(e.target.value)

      case 'postContent':
        return setContent(e.target.value)

      default:
        return null
    }
  }

  const update = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          id: postId,
          title,
          content,
        })
      )
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post:</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={handleInputChange}
        />
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleInputChange}
        />
        <button type="button" onClick={update}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default UpdatePostForm
