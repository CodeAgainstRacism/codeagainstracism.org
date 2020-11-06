import axios from "axios";

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
              if (err.response.data.message.includes("EIN")) {
                // EIN
                return reject("Please enter a valid EIN.");
              } else if (err.response.data.message.includes("phoneNumber")) {
                // phoneNumber
                return reject("Please enter a valid phone number.");
              } else if (err.response.data.message.includes("email")) {
                // email
                return reject("Please check your email and try again.");
              } else if (err.response.data.message.includes("contact")) {
                // contactFirstName, contactLastName
                return reject("Please enter your name.");
              } else if (err.response.data.message.includes("password")) {
                // password
                return reject("Please check your password and try again.");
              } else if (err.response.data.message.includes("name")) {
                // name
                return reject("Please enter the name of the project.");
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
