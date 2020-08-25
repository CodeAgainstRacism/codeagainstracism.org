// This file contains generic functions to make API call to the backend
import axios from "axios";

// make post request to login or signup users
export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    // console.log("inside API Call");
    // console.log(`Data: ${JSON.stringify(data)}`);

    return axios[method.toLowerCase()](path, data)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data.error);
        // error is the error from server's error handler that we built
      });
  });
}
