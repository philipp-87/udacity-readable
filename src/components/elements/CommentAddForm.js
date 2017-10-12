import React from "react";
import { Field, reduxForm } from "redux-form";

const validate = values => {
    const errors = {};
    if (!values.author) {
        errors.author = "Required";
    } else if (values.author.length > 15) {
        errors.author = "Must be 15 characters or less";
    }
    if (!values.body) {
        errors.body = "Required";
    }
    return errors;
};

const renderInputField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
);

const renderTextAreaField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <div>
        <label>{label}</label>
        <div>
            <textarea {...input} placeholder={label} type={type} />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
);

let CommentAddForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="author"
                component={renderInputField}
                type="text"
                label="Author"
            />
            <Field
                name="body"
                label="Message"
                component={renderTextAreaField}
            />
            <div>
                <button type="submit" disabled={submitting}>
                    Submit
                </button>
                <button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                >
                    Clear Values
                </button>
            </div>
        </form>
    );
};

CommentAddForm = reduxForm({
    // a unique name for the form
    form: "comment",
    validate
})(CommentAddForm);

export default CommentAddForm;
