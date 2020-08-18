import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import errorReducer from "./errors";

const rootReducer = combineReducers({
  currentUserReducer,
  errorReducer,
});

export default rootReducer;
