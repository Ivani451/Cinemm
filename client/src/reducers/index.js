import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import submissionsReducer from "./submissionsReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  submissions: submissionsReducer
});
