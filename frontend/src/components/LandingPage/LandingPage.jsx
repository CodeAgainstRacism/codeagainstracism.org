import React from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

class LandingPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showSignUp: true
        }
    }

    toggleLoginForm(){
        this.setState((prevState) => ({showSignUp : !prevState.showSignUp}))
    }

    render(){
        return (
            <div className="container">
                <h1 className="website-name">Code Against Racism</h1>
                <div className="description">
                    <h4>~ Description of our organization ~</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, tempora 
                        eligendi! Nisi provident quidem ex. Eligendi blanditiis consequatur reiciendis ullam
                        autem ducimus in nulla modi, tenetur doloremque nemo voluptas delectus. Lorem ipsum dolor sit 
                        amet consectetur adipisicing elit. Culpa provident incidunt quia.
                        Eligendi incidunt possimus, cum omnis facere voluptatibus atque! Autem maxime sequi numquam quod quibusdam ratione quasi, nesciunt consequuntur?</p>
                </div>
                <div className="buttons-container">
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
                </div>
                { 
                    this.state.showSignUp? <SignUp /> : <LogIn /> 
                }
            
            </div>
        )
    }
}

export default LandingPage;