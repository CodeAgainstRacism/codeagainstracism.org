import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import SvgIcon from '@material-ui/core/SvgIcon';
import {Container, CssBaseline, Grid, Paper, TextField, Button} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Footer from "../components/Footer";

const LoginStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },

/**Grid */
  paper: {
    padding: theme.spacing(6, 2), 
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
  },

  loginInfoPaper: {
    padding: theme.spacing(1, 0),
    textAlign: 'left',
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
  },

  recoveryPaper: {
    padding: theme.spacing(1, 0),
    textAlign: 'right',
    color: "#808080", //should be gray 
    background: theme.palette.background.default,
  },

  /*containers*/
  innerContainer: {
    alignItems: "stretch",
    background: "#f2f2f2",
    overflow: "hidden", 
    display: "flex",
    justifyContent: "center",
    maxHeight: "100 vh",
  },

  loginContainer: {
    width: '100%',
    border: '1px solid #292929',
    alignItems: "center", 
    boxSizing: "border-box", 
    borderRadius: '7px', 
    overflow: "auto",
    transform: "matrix(1, 0, 0, 1, 0, 0)"
  },
  loginHeader:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
  },

  loginFooter: {
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "2%",
    paddingBottom: "2%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
  },

  loginBody: {
    marginTop: "1px",
    fontSize : "12 px",
    width: "100%",
    overflow: "auto",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingBottom: "5%",
  },

  textContainer: {
    position: "relative",
    fontSize: "12px",
    width: "450px",
    padding: "1rem 0",
    alignItems: "center",
  },

  pageContainer: {
    height: "768px",
    margin: "0 auto",
    textAlign: "center",
    background: "#f2f2f2",
    overflow: "hidden",
    maxWidth: "70vw", //TODO check if needed
  },

  /*textfield label color*/
  labelColor:{
    color:'#808080'
  },
  /*icon button spacing*/
  button: {
    margin: theme.spacing(1),
  },
}));


export default function LogIn(props) {
  const classes = LoginStyles();
  
  return (
    <React.Fragment>
      <CssBaseline />
        <Container disableGutters = {true} className = {classes.innerContainer}>
          <Container disableGutters = {true} className = {classes.pageContainer}>
          <div className={classes.root}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Paper elevation = {0} className={classes.paper}>
                    <Container className = {classes.textContainer}>
                      <h1>Welcome Back! </h1>
                        <div className="description">
                          <h4>~ Description of our organization ~</h4>
                          <img src = {process.env.PUBLIC_URL + './Hand waving.png'} alt = "hand"/>
                          <p>We missed you. Go catch up on your project!</p>
                        </div> 
                    </Container>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation = {0} className={classes.paper}>
                    <Container disableGutters = {true} className={classes.loginContainer}>
                      <Container className = {classes.loginHeader}>
                        <h1 className = "Header">Log In</h1>
                      </Container>
                      <Container className = {classes.loginBody}>
                        <Button
                          fullWidth = {true}
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<GitHubIcon />}>
                          Sign In with Github
                        </Button>
                        
                        <Button
                          fullWidth = {true}
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<SvgIcon {...props}>
                          <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
                          </SvgIcon>}>
                          Sign In with Google
                        </Button>
                        <Button
                          fullWidth = {true}
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<FacebookIcon />}>
                          Sign In with Facebook
                        </Button>
                        <Divider></Divider>
                        <Grid id = "row" container spacing = {24}>
                          <Grid item xs={6}>
                            <Paper elevation = {0} className = {classes.loginInfoPaper}>
                              <label htmlFor="email">Username:</label>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper elevation = {0} className = {classes.recoveryPaper}>
                              <label htmlFor="email">Account Recovery</label>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper elevation = {0} className = {classes.loginInfoPaper}>
                            <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic" label = "Your Username" variant = "outlined" size = "small"/>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper elevation = {0} className = {classes.loginInfoPaper}>
                            <label htmlFor="password">Password:</label>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper elevation = {0} className = {classes.recoveryPaper}>
                              <label htmlFor="email">Forgot your password?</label>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper elevation = {0} className = {classes.loginInfoPaper}>
                              <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic" label = "Enter Password" variant = "outlined" size = "small"/>
                            </Paper>
                          </Grid> 
                      </Grid>
                      <div>
                        <Button fullWidth = {true} color = "primary" variant="contained">Login </Button>
                      </div>
                      <Divider></Divider>
                    </Container>        
                    <Container className = {classes.loginFooter}> 
                      <Button fullWidth = {true} color = "primary" variant = "contained"> Create an Account</Button>
                    </Container>
                  </Container>
                </Paper>
              </Grid>
            </Grid>
          </div>
         </Container>
      </Container>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}
  
