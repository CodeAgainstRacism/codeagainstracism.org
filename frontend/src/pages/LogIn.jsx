import React from "react";
import { MuiThemeProvider, Link, createMuiTheme, makeStyles, Container, CssBaseline, Grid, TextField, Button} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import SvgIcon from '@material-ui/core/SvgIcon';
import Footer from "../components/Footer";
import HandWave from "../assets/Hand waving.png";
import {Link as RouterLink } from "react-router-dom";

/**Icon Button Colors */
const blackTheme = createMuiTheme({ palette: { primary: {main: "#000" }} })
const redTheme = createMuiTheme({ palette: { primary: {main: "#ff411c" }} })
const blueTheme = createMuiTheme({ palette: { primary: {main: "#1c55ff" }} })

const LoginStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },

  /**Divider with text in between */
  dividerBar: {
    height: "1px", 
    backgroundColor: "#808080", 
    flexGrow: 1, 
  },

  dividerContainer:{
    display: "flex",
    alignItems: "center",
    color: "#808080",
    width: "100%", 
  },

  /*containers*/
  recoveryContainer: {
    padding: theme.spacing(0,0,0,0),
    textAlign: 'right',
    color: "#808080", 
  },

  innerContainer: {
    alignItems: "stretch",
    background: theme.palette.background,
    overflow: "hidden", 
    display: "flex",
    justifyContent: "center",
    maxHeight: "100 vh",
    padding: theme.spacing(6, 2), 
    textAlign: 'center',
  },

  loginContainer: {
    width: '100%',
    border: '1px solid #292929',
    alignItems: "center", 
    boxSizing: "border-box", 
    overflow: "auto",
    transform: "matrix(1, 0, 0, 1, 0, 0)"
  },
  
  loginHeader:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: "7px 7px 0px 0px"
  },

  loginFooter: {
    width: "100%",
    padding: theme.spacing(1,6,1,6),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: "0px 0px 7px 7px"
  },

  loginBody: {
    fontSize : "12 px",
    width: "100%",
    overflow: "auto",
    padding: theme.spacing(1,6,1,6)
  },

  textContainer: {
    position: "relative",
    fontSize: "12px",
    width: "100%",
    padding: theme.spacing(1,1,1,1),
    alignItems: "center",
  },

  pageContainer: {
    height: "60 vmax",
    margin: "0 auto",
    textAlign: "center",
    background: theme.palette.background,
    overflow: "hidden",
    maxWidth: "70vw", 
  },

  /*icon button spacing*/
  button: {
    margin: theme.spacing(1, 0, 0),
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
              {/**Text and Image */}
              <Grid item xs={5}> 
                <Container className = {classes.textContainer}>
                  <h1>Welcome Back! </h1>  
                  <h4>~ Description of our organization ~</h4>
                  <img src = {HandWave} alt = "hand"/>
                  <p>We missed you. Go catch up on your project!</p>
                </Container>
              </Grid>
              {/**Login Page */}
              <Grid item xs={6}>
                <Container disableGutters = {true} className={classes.loginContainer}>
                  <Container className = {classes.loginHeader}>
                    <h1>LOG IN</h1>
                  </Container>
                  <Container className = {classes.loginBody}>
                    {/**Github Icon Button */}
                    <MuiThemeProvider theme={blackTheme}>
                      <Button
                        fullWidth = {true}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<GitHubIcon />}>
                        Sign In with Github
                      </Button>
                    </MuiThemeProvider>
                    {/**Google Icon Button */}
                    <MuiThemeProvider theme={redTheme}>
                      <Button
                        fullWidth = {true}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SvgIcon {...props}>
                        <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
                        </SvgIcon>}>
                        Sign In with Google
                      </Button>
                    </MuiThemeProvider>
                    {/**Facebook Icon Button */}
                    <MuiThemeProvider theme={blueTheme}>
                      <Button fullWidth = {true}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<FacebookIcon />}>
                        Sign In with Facebook
                      </Button>
                    </MuiThemeProvider>
                    {/**Divider with text "or" in between */}
                    <Container className = {classes.dividerContainer}>
                      <Container className = {classes.dividerBar}></Container>
                        or 
                      <Container className = {classes.dividerBar}></Container>
                    </Container>
                    <Grid id = "row" container spacing = {1}>
                      <Grid item xs={12}>
                          <TextField label = "Username"/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField type = "password" label = "Password"/>
                      </Grid> 
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                      <Container className = {classes.recoveryContainer}>
                        <Link
                          component={RouterLink}
                          to="/accountrecovery"
                          color = "inherit"
                          underline="none">
                          Forgot your password?
                        </Link>  
                        </Container>
                      </Grid>
                  </Grid>
                    <Button className={classes.button} fullWidth = {true} color = "primary" variant="contained">Login </Button>
                  {/**Divider with text "or" in between */}
                  <Container className = {classes.dividerContainer}>
                    <Container className = {classes.dividerBar}></Container>
                      or 
                    <Container className = {classes.dividerBar}></Container>
                  </Container>
                </Container>        
                <Container className = {classes.loginFooter}>
                  <Button 
                    href="#" 
                    component={RouterLink}
                    to="/signup" 
                    fullWidth = {true} 
                    color = "secondary" 
                    variant = "outlined"> 
                    Create an Account
                  </Button>
                </Container>
              </Container>
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
  
