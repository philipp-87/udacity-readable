import React from "react";
import { Field, reduxForm } from "redux-form";

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = "Required";
    } else if (values.title.length > 15) {
        errors.title = "Must be 15 characters or less";
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

let PostEditForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="title"
                component={renderInputField}
                type="text"
                label="Title"
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

PostEditForm = reduxForm({
    // a unique name for the form
    form: "postEdit",
    validate
})(PostEditForm);

export default PostEditForm;
