import { SET_CURRENT_USER } from "../actionTypes";

const defaultState = {
  isAuthenticated: false, // true when user logs in
  user: {}, // store all user's info and JWT. Empty when user is not logged in
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: Object.keys(action.user).length > 0,
        user: action.user,
      };
    default:
      return state;
  }
};
