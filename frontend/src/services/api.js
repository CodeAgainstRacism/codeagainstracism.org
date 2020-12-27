import axios from "axios";

// Send the JWT token so the server knows we're logged in (from services/api.js)
export function setTokenHeader(token) {
  if (token) {
    // when user logs in, attach their token to all future request
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // when user logs out
    delete axios.defaults.headers.common["Authorization"];
  }
}

// Make Post request to login or signup users
export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method](path, data)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        if (err.response) {
          // error handling
          switch (err.response.status) {
            case 400:
              console.error("Warning! 400 should never be received; All forms must be correct before signup request is posted.");
              if (err.response.data.message.includes("phoneNumber must be a phone number")) {
                // phoneNumber
                return reject("Please enter a valid phone number.");
              } else if (err.response.data.message.includes("email must be an email")) {
                // email
                return reject("Please check your email and try again.");
              } else if (err.response.data.message.includes("password should not be empty")) {
                // email
                return reject("Please check your password and try again.");
              }
              // All other 400 errors
              console.error("Unspecified error encountered");
              return reject(err.response.data.message + "\n");

            case 401:
              return reject("Password is incorrect.");

            case 403:
              return reject("Forbidden access. Please contact support if the issue persists.");

            case 404:
              return reject("Sorry, we couldn't find that account.");

            case 405:
              return reject("Invalid access. Please contact support if the issue persists.");

            case 406:
              return reject("Inacceptable access. Please contact support if the issue persists.");

            case 407:
              return reject("Authentication failed. Please contact support if the issue persists.");

            case 408:
              return reject("Request timed out. Please try again.");

            case 409:
              return reject("This email address is already in use.");

            case 500:
              return reject("Internal Server Error. Please try again later.");

            default:
              // All other unknown errors
              return reject(err.response.data.error);
          }
        } else {
          return reject("Unable to reach servers.");
        }
        // error is the error from server's error handler.
      });
  });
}
