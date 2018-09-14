import axios from "axios";
import { FETCH_USER, FETCH_SUBMISSIONS } from "./types";

/* 
    We verify whether the user is logged in or not by making a request to
    our back-end API.
    Because of redux-thunk, we can call dispatch whenever we like.
    Redux-thunk sees that we returned a function in our action
    creater, so it will call the function with dispatch.
*/

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSubmission = values => async dispatch => {
  const res = await axios.post("/api/submissions", values);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSubmissions = () => async dispatch => {
  const res = await axios.get("/api/submissions");

  dispatch({ type: FETCH_SUBMISSIONS, payload: res.data });
};
