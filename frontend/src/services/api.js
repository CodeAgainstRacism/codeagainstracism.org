import axios from "axios";

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method](path, data)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.error("Warning! 400 should never be received; All forms must be correct before signup request is posted.");
            return reject(err.response.data.message + "\n");
          }
          return reject(err.response.error);
        } else {
          return reject("Unable to reach servers.");
        }
        // error is the error from server's error handler.
      });
  });
}
