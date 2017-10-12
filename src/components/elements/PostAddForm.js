import React from "react";
import { Field, reduxForm } from "redux-form";

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = "Required";
    } else if (values.title.length > 15) {
        errors.title = "Must be 15 characters or less";
    }
    if (!values.author) {
        errors.author = "Required";
    } else if (values.author.length > 15) {
        errors.author = "Must be 15 characters or less";
    }
    if (!values.body) {
        errors.body = "Required";
    }
    if (!values.category) {
        errors.category = "Required";
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

const renderDropdownField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <div>
        <label>{label}</label>
        <div>
            <select {...input} placeholder={label} type={type}>
                <option />
                <option value="react">React</option>
                <option value="redux">Redux</option>
                <option value="udacity">Udacity</option>
            </select>
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
);

let PostAddForm = props => {
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
                name="author"
                component={renderInputField}
                type="text"
                label="Author"
            />
            <div>
                <label>Select category</label>
                <div>
                    <Field
                        name="category"
                        component={renderDropdownField}
                        label="Category"
                    />
                </div>
            </div>
            <div>
                <Field
                    name="body"
                    component={renderTextAreaField}
                    label="Message"
                />
            </div>
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

PostAddForm = reduxForm({
    // a unique name for the form
    form: "post",
    validate
})(PostAddForm);

export default PostAddForm;
