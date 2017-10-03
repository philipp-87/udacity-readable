import React from 'react'
import { Field, reduxForm } from 'redux-form'

let CommentAddForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Author</label>
        <div>
          <Field
            name="author"
            component="input"
            type="text"
            placeholder="Author"
          />
        </div>
      </div>
      <div>
        <label>Message</label>
        <div>
          <Field name="body" placeholder="Your post" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

CommentAddForm = reduxForm({
  // a unique name for the form
  form: 'comment'
})(CommentAddForm)

export default CommentAddForm;
