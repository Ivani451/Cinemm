import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

// onCancel, formValues, and submitSubmission are destructured
const SubmissionFormReview = ({ onCancel, formValues, submitSubmission }) => {
  return (
    <div>
      <h6>
        <b>Please confirm the submission</b>
      </h6>
      <div>
        <div>
          <label>Movie Title</label>
          <div className="form-review">{formValues.title}</div>
        </div>
        <div>
          <label>Review</label>
          <textarea readOnly className="form-review">
            {formValues.review}
          </textarea>
        </div>
      </div>

      <button className="pink lighten-2 btn-flat white-text" onClick={onCancel}>
        Back
      </button>

      <Link to="/submissions">
        <button
          /* 
          We have the arrow function here so the submitSubmission is not
          automatically executed upon rendering.
        */
          onClick={() => submitSubmission(formValues)}
          className="indigo lighten-1 btn-flat right white-text"
        >
          Submit
        </button>
      </Link>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.submissionForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(SubmissionFormReview);
