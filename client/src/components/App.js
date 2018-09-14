import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import * as actions from "../actions";
import Landing from "./Landing";

import Dashboard from "./Dashboard";
import SubmissionNew from "./submissions/SubmissionNew";

class App extends Component {
  // As soon our app loads, we check whether the user is logged in or not
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/submissions" component={Dashboard} />
          <Route exact path="/submissions/new" component={SubmissionNew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
