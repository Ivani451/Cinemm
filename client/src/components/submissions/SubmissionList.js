import React, { Component } from "react";
import swal from "sweetalert";
import { connect } from "react-redux";
import { fetchSubmissions } from "../../actions";

// Here we fetch our submissions that the user has created
class SubmissionList extends Component {
  componentDidMount() {
    this.props.fetchSubmissions();
  }

  // The alert box that pops up to confirm deletion of submission using
  // the 'sweetalert' library
  confirmDelete() {
    swal("Are you sure you want to delete the review?", {
      buttons: [true, "Yes"]
    }).then(willDelete => {
      if (willDelete) {
        // This is where we delete the entry from mongodb
        alert("cool");
        swal("Deleted!", "Your review has been deleted!", "success");
      }
    });
  }

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
              onClick={() => this.confirmDelete()}
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
  { fetchSubmissions }
)(SubmissionList);
