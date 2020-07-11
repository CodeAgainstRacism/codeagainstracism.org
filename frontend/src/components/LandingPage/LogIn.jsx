import React from "react";

class LogIn extends React.Component {
  render() {
    return (
      <div>
        <form className="auth-form-container">
          <div>
            <label htmlFor="email">Email</label>
            <input type="string" name="email"></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="string" name="password"></input>
          </div>
          <button className="submit-button">Submit</button>
        </form>
      </div>
    );
  }
}

export default LogIn;
