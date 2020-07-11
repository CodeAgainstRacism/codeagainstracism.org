import React from "react";

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <form className="auth-form-container">
          <div>
            <label htmlFor="name">Name of Organization: </label>
            <input type="text" name="name"></input>
          </div>
          <div>
            <label htmlFor="EIN">EIN (Employer Identification Number):</label>
            <input type="string" name="EIN"></input>
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="string" name="phoneNumber"></input>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="string" name="email"></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="string" name="password"></input>
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="string" name="confirm-password"></input>
          </div>
          <div>
            <label htmlFor="description">Description of Organization:</label>
            <textarea name="description" id="description" rows="5" cols="33" />
          </div>
          <button className="submit-button">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
