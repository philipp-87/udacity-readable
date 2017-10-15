import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = "Required";
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

function mapStateToProps(state, props) {
    return {
        initialValues: {
            title: props.title,
            body: props.body
        }
    };
}

PostEditForm = reduxForm({
    // a unique name for the form
    form: "postEdit",
    validate
})(PostEditForm);

export default connect(mapStateToProps)(PostEditForm);
