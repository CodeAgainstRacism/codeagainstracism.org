import React from "react";

class LogIn extends React.Component {
    render(){
        return (
            <div>
                <form className="form-container">
                    <div>
                        <label for="email">Email</label>
                        <input type="string" name="email"></input>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="string" name="password"></input>
                    </div>
                    <button className="submit-button">Submit</button> 
                    
                </form>
            </div>
        )
    }
}

export default LogIn;