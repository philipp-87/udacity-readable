import React from 'react'
import { Field, reduxForm } from 'redux-form'

let CommentEditForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Message</label>
        <div>
          <Field name="body" placeholder="Your comment" component="textarea" />
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

CommentEditForm = reduxForm({
  // a unique name for the form
  form: 'commentEdit'
})(CommentEditForm)

export default CommentEditForm;
