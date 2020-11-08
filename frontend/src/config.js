module.exports = {
  //BACKEND_URL: "http://ec2-18-191-183-102.us-east-2.compute.amazonaws.com:4000/" || "http://localhost:4000/"
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "http://localhost:4000/"
};
