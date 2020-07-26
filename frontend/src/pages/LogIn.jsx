import React from "react";

class LogIn extends React.Component {
  render() {
    return (
      <div>
        <form className="auth-form-container">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email"></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password"></input>
          </div>
          <button className="submit-button">Submit</button>
        </form>
      </div>
    );
  }
}

export default LogIn;
