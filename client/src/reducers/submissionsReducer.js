import { FETCH_SUBMISSIONS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SUBMISSIONS:
      return action.payload;
    default:
      return state;
  }
}
