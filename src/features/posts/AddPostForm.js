import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'

function AddPostForm() {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [userId, setUserId] = React.useState('')

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)
  const onSavePostClicked = (e) => {
    e.preventDefault()
    if (content && title && userId) {
      dispatch(postAdded(title, content, userId))
    }
    setContent('')
    setTitle('')
    setUserId('')
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  console.log(canSave)
  const usersOptions = users.map((user) => (
    <option key={user.name} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <label htmlFor="postAuthor">Author:</label>

        <select
          name="postAuthor"
          id="postAuthor"
          onChange={onAuthorChanged}
          value={userId}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
