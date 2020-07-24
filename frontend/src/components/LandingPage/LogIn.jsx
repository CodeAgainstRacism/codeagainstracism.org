import React from "react";
import {Button} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import SignUp from "./SignUp";
import { useHistory } from "react-router-dom";
import {Redirect} from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


export default function LogIn(props) {
  const classes = useStyles();

  const history = useHistory();

  const routeChange = () =>{ 
    let path = 'route path'; ////////////////////////////////////////////////////
    
    history.push(path);
  }

  return (
    <div>
         <form className="container">
           <div className = "textContainer">
             <h1 className="website-name">Welcome Back! </h1>
               <div className="description">
                   <h4>~ Description of our organization ~</h4>
                     <img src = {process.env.PUBLIC_URL + './Hand waving.png'} alt = "hand"/>
                     <p>We missed you. Go catch up on your project! </p>
                 </div> 
           </div>
           <div className = "signContainer">
             <h1 className = "Header">Log In</h1>
              
             <div className = "Body">
             <div>
                  <Button
                   variant="contained"
                   color="secondary"
                    className={classes.button}
                    startIcon={<GitHubIcon />}>
                    Sign In with Github
                  </Button>
              </div>
              <div>
                  <Button
                   variant="contained"
                   color="secondary"
                    className={classes.button}
                    startIcon={<SvgIcon {...props}>
                    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
                    </SvgIcon>}>
                    Sign In with Google
                  </Button>
              </div>
              <div>
                  <Button
                   variant="contained"
                   color="secondary"
                    className={classes.button}
                    startIcon={<FacebookIcon />}>
                    Sign In with Facebook
                  </Button>
              </div>
             <label style={{ color: 'gray' }}>──────────────── or ────────────────</label>
             <div>
             <label htmlFor="email">Username</label>
             <TextField id = "outlined-basic" label = "Your Username" variant = "outlined" size = "small"/>
           </div>
           <div>
             <label htmlFor="password">Password</label>
             <TextField id = "outlined-basic" label = "Enter Password" variant = "outlined" size = "small"/>
          </div>
            <div>
                <Button color = "primary" variant="contained">Login </Button>
           </div>
           <label style={{ color: 'gray' }}>──────────────── or ────────────────</label>
           </div>        
           <div className = "Footer"> 
           <Button color = "primary" variant = "contained"> Create an Account</Button> {/*link this to signin */}
           {/*<Button onClick={routeChange}>create Account</Button>*/}
           </div>
           </div>
         </form>
       </div>
      );
    }
  
