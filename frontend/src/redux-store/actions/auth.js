import { apiCall } from "../../services/api";
import { BACKEND_URL } from "../../config";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

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
      console.log(`${BACKEND_URL}/auth/${type}`);
      return apiCall("post", `${BACKEND_URL}/auth/${type}`, userData)
        .then((response) => {
          // .then(({ accessToken, ...user }) => {
          console.log(response)
          console.log("Dispatching authUser")
          localStorage.setItem("jwtToken", response.accessToken);
          dispatch(setCurrentUser(response.user));
          dispatch(removeError());
          resolve();
        })
        .catch((err) => {
          console.log("Error", err)
          dispatch(addError(err));
          reject();
        });
    });
  };
}