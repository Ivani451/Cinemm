import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSubmissions, deleteSubmission } from "../../actions";
import { withRouter } from "react-router-dom";

// Here we fetch our submissions that the user has created
class SubmissionList extends Component {
  componentDidMount() {
    this.props.fetchSubmissions();
  }

  // This renders the submitted reviews the user has made
  renderSubmissions() {
    return this.props.submissions.map(submission => {
      return (
        <div className="card indigo lighten-4" key={submission._id}>
          <div className="card-content">
            <span className="card-title">{submission.title}</span>
            <p>{submission.review}</p>
            <label>
              Reviewed on: {new Date(submission.dateSent).toLocaleDateString()}
            </label>
            <button
              className="pink lighten-2 btn-flat white-text right"
              onClick={() => {
                this.props.deleteSubmission(submission._id, this.props.history);

                // the page is reloaded after the submission is deleted.
                window.location.reload();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSubmissions()}</div>;
  }
}

function mapStateToProps({ submissions }) {
  return { submissions };
}

export default connect(
  mapStateToProps,
  { fetchSubmissions, deleteSubmission }
)(withRouter(SubmissionList));
