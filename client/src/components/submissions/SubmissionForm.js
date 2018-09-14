import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SubmissionField from "./SubmissionField";

/* 
    Here we use redux-form rather than traditional redux. We do this to save
    some time and to have less code to maintain. Redux-form works with the redux
    store directly, we do not need to make our own reducers, action creators, and
    event handlers.
*/

class SubmissionForm extends Component {
  renderFields() {
    return (
      <div>
        <Field
          label="Movie Title"
          type="text"
          name="title"
          component={SubmissionField}
        />
        <Field
          label="Review"
          type="text"
          name="review"
          component={SubmissionField}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmissionSubmit)}>
          {this.renderFields()}
          <Link
            to="/submissions"
            className="pink lighten-2 btn-flat white-text"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="indigo lighten-1 btn-flat right white-text"
          >
            Continue
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "You must provide a movie title";
  }

  if (!values.review) {
    errors.review = "You must provide a review";
  }

  return errors;
}

// We use redux-form rather than traditional redux here to simplify the process
export default reduxForm({
  validate,
  form: "submissionForm",
  destroyOnUnmount: false
})(SubmissionForm);
