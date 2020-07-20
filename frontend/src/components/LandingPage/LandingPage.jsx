import React from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

class LandingPage extends React.Component {
    constructor(){
        super();
        this.state = {
            showSignUp: true
        }
        this.toggleLoginForm = this.toggleLoginForm.bind(this);
    }

    toggleLoginForm(){
        this.setState((prevState) => ({showSignUp : !prevState.showSignUp}))
    }

    render(){
        return (
            <div className="container">
               
                 <div>
                    <button 
                        onClick={this.toggleLoginForm}
                        disabled={this.state.showSignUp} 
                        className="medium-glowing-button"
                            >
                        Sign Up
                        </button>
                    <button  
                        onClick={this.toggleLoginForm}
                        disabled={!this.state.showSignUp}
                        className="medium-glowing-button">
                            Log In
                    </button>
                
                { 
                    this.state.showSignUp? <SignUp /> : <LogIn /> 
                }
            </div>
            
            </div>
        )
    }
}

export default LandingPage;