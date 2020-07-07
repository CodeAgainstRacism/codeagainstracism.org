import React from "react";

class SignUp extends React.Component {
    render(){
        return (
            <div>
                <form className="form-container">
                    <div>
                        <label for="name">Name of Organization: </label>
                        <input type="text" name="name"></input>
                    </div>
                    <div>
                        <label for="EIN">EIN (Employer Identification Number):</label>
                        <input type="string" name="EIN"></input>
                    </div>
                    <div>
                        <label for="phoneNumber">Phone Number:</label>
                        <input type="string" name="phoneNumber"></input>
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="string" name="email"></input>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="string" name="password"></input>
                    </div>
                    <div>
                        <label for="confirm-password">Confirm Password</label>
                        <input type="string" name="confirm-password"></input>
                    </div>
                    <div>
                        <label for="description">Description of Organization:</label>
                        <textarea name="description" id="description" rows="5" cols="33"/>
                    </div>
                    <button className="submit-button" >Submit</button> 
                    
                </form>
            </div>
        )
    }
}

export default SignUp;