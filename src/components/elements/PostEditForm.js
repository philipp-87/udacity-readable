import React from 'react'
import { Field, reduxForm } from 'redux-form'

let PostEditForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <div>
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="Title"
          />
        </div>
      </div>
      <div>
        <label>Message</label>
        <div>
          <Field 
            name="body" 
            placeholder="Your post" 
            component="textarea" 
          />
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

PostEditForm = reduxForm({
  // a unique name for the form
  form: 'postEdit'
})(PostEditForm)

export default PostEditForm;
