import React from "react";
import {Button} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const StyledField = withStyles({
  root: {
    width: '400px',
  },
})(TextField);

export default function SignUp() {
  
    return (
      <div className="container"> 
      <div className = "textContainer">
       <h1 className="website-name">Create Your Team</h1>
                <div className="description">
                    <h4>~ Description of our organization ~</h4>
                    <img src = {process.env.PUBLIC_URL + './login_signup 1.png'} alt = "hand"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, tempora 
                        eligendi! Nisi provident quidem ex. Eligendi blanditiis consequatur reiciendis ullam
                        autem ducimus in nulla modi, tenetur doloremque nemo voluptas delectus. Lorem ipsum dolor sit 
                        amet consectetur adipisicing elit. Culpa provident incidunt quia.
                        Eligendi incidunt possimus, cum omnis facere voluptatibus atque! Autem maxime sequi numquam quod quibusdam ratione quasi, nesciunt consequuntur?</p>
                </div> 
      </div>
      <div className = "signContainer">
          <form className="auth-form-container"> 
            <div>
              <h1 className = "Header">Sign Up</h1>
              <div className = "Body">
                 <div>
                    <label htmlFor="name">Organization Name: </label>
                    <TextField id = "outlined-basic" label = "Code Against Racism" variant = "outlined" size = "small"/>
                  </div>
                  <div>
                    <label htmlFor="EIN">EIN (Employer Identification Number):</label>
                    <TextField id = "outlined-basic" label = "55-4123567" variant = "outlined" size = "small"/>

                  </div>
                  <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <TextField id = "outlined-basic" label = "(909)123-4567" variant = "outlined" size = "small"/>
                  </div>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <TextField id = "outlined-basic" label = "example@gmail.com" variant = "outlined" size = "small"/>
                  </div>
                  <div>
                    <label htmlFor="password">Password:</label>
                    <TextField id = "outlined-basic" label = "password" variant = "outlined" size = "small"/>
                  </div>
                  <div>
                    <TextField id = "outlined-basic" label = "reenter password" variant = "outlined" size = "small"/>
                  </div>
                  <div>
                    <label htmlFor="description">What Does Your Organization Do?:</label>
                    <StyledField id = "outlined-basic" label = "field description" rows = "5" columns = "33" variant = "outlined" multiline = {true}/>
                  </div>
                </div>
                <div className = "Footer">
                  <Button color ="primary" variant = "contained">Submit</Button>
                </div>
              </div>
            </form>
        </div>
      </div>
    );
  
}

//export default SignUp;
