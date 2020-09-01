import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { BACKEND_URL } from "../../config";

// Set current user
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

// Make a POST request to server to login or signup users and save the returned jwtToken to localStorage
export function authUser(type, userData) {
  return (dispatch) => {
    // use Promise to wait until the API call is finished
    return new Promise((resolve, reject) => {
      return apiCall("post", `${BACKEND_URL}/auth/${type}`, userData)
        .then(
          // data => {
          ({ accessToken, ...user }) => {
            localStorage.setItem("jwtToken", accessToken);
            dispatch(setCurrentUser(user));
            resolve();
          }
        )
        .catch((err) => {
          reject();
        });
    });
  };
}
