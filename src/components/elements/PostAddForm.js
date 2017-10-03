import React from 'react'
import { Field, reduxForm } from 'redux-form'

let PostAddForm = props => {
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
        <label>Select category</label>
        <div>
          <Field name="category" component="select">
            <option />
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </Field>
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

PostAddForm = reduxForm({
  // a unique name for the form
  form: 'post'
})(PostAddForm)

export default PostAddForm;
