import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SubmissionForm from "./SubmissionForm";
import SubmissionFormReview from "./SubmissionFormReview";

class SubmissionNew extends Component {
  state = {
    showReview: false
  };

  renderContent() {
    if (this.state.showReview) {
      return (
        <SubmissionFormReview
          onCancel={() => this.setState({ showReview: false })}
        />
      );
    }
    return (
      <SubmissionForm
        onSubmissionSubmit={() => this.setState({ showReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

/* 
  We connect to the redux-form and bind to "submissionForm" as a
  means to remove the form values when we cancel the submission or
  move away from the "submissionNew" page. By default, redux-form dumps
  any values associated with a component when the component is unmounted
*/
export default reduxForm({
  form: "submissionForm"
})(SubmissionNew);
