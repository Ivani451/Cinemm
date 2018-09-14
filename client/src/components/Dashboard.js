import React from "react";
import { Link } from "react-router-dom";
import SubmissionList from "./submissions/SubmissionList";

const Dashboard = () => {
  return (
    <div>
      <SubmissionList />
      <div className="fixed-action-btn">
        <Link
          to="/submissions/new"
          className="btn-floating btn-large indigo lighten-1 btn-flat white-text"
        >
          <i className="material-icons">create</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
