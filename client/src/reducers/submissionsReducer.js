import { FETCH_SUBMISSIONS, DELETE_SUBMISSION } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SUBMISSIONS:
      return action.payload;
    case DELETE_SUBMISSION:
      return action.payload;
    default:
      return state;
  }
}
