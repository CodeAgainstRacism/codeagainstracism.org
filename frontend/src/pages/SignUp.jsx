import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {Container, CssBaseline, Grid, Paper, Button, TextField} from '@material-ui/core';
import Footer from "../components/Footer";

const signStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  /*grid papers*/
  paper: {
    padding: theme.spacing(6, 2), 
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
  },

  signupInfoPaper: {
    padding: theme.spacing(.5, 0),
    textAlign: 'left',
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
  },

  /*containers*/

  innerContainer: {
   // border: "1px solid #292929",
    alignItems: "stretch",
   // boxSizing: "border-box",
    background: "#f2f2f2",
    overflow: "hidden", 
    display: "flex",
    justifyContent: "center",
  },

  signContainer: {
    width: '100%',
    border: '1px solid #292929', 
    alignItems: "center", 
    boxSizing: "border-box", 
    borderRadius: '7px', 
    transform: "matrix(1, 0, 0, 1, 0, 0)"
  },

  signHeader:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: '7px',
    background: "white",
  },

  signFooter: {
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "2%",
    paddingBottom: "2%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: '7px',
  },

  signBody: {
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
    //maxheight: "120vmax",
    //minHeight: "100vmin",
    height: "60 vmax",
    margin: "0 auto",
    textAlign: "center",
    background: "#f2f2f2",
    overflow: "hidden",
    maxWidth: "70vw", //TODO check if needed
  },

  /*label color in textfield*/
  labelColor:{
    color:'#808080'
}
}));

export default function SignUp() {
  const classes = signStyles();

    return (
      <React.Fragment>
        <CssBaseline />
          <Container disableGutters = {true} className = {classes.pageContainer}>
            <Container disableGutters = {true} className = {classes.innerContainer}> 
              <div className={classes.root}>
                <Grid container spacing={0}>
                  {/*Text and Image */}
                    <Grid item xs={6}>
                      <Paper elevation = {0} className={classes.paper}>
                        <Container className = {classes.textContainer}>
                          <h1>Create Your Team</h1>
                            <Container>
                              <h4>~ Description of our organization ~</h4>
                                <img src = {process.env.PUBLIC_URL + './login_signup 1.png'} alt = "hand"/>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, tempora 
                                    eligendi! Nisi provident quidem ex. Eligendi blanditiis consequatur reiciendis ullam
                                    autem ducimus in nulla modi, tenetur doloremque nemo voluptas delectus. Lorem ipsum dolor sit 
                                    amet consectetur adipisicing elit. Culpa provident incidunt quia.
                                    Eligendi incidunt possimus, cum omnis facere voluptatibus atque! Autem maxime sequi numquam quod quibusdam ratione quasi, nesciunt consequuntur?</p>  
                              </Container> 
                        </Container>
                      </Paper>
                    </Grid>
                  {/*Sign up box */}
                  <Grid item xs={6}>
                    <Paper elevation = {0} className={classes.paper}>
                      <Container disableGutters = {true} className={classes.signContainer}>
                        <Container className={classes.signHeader}>
                          <h1>Sign Up</h1>
                        </Container>
                      <Container className = {classes.signBody}>
                        <Grid id = "row" container spacing = {24}>
                          <Grid item xs={6}>
                            <Paper elevation = {0} className = {classes.signupInfoPaper}>
                              <label htmlFor="name">Organization Name: </label>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper elevation = {0} className = {classes.signupfoPaper}>
                              <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic" label = "Code Against Racism" variant = "outlined" size = "small"/>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper elevation = {0} className = {classes.signupInfoPaper}>
                              <label htmlFor="EIN">EIN (Employer Identification Number): </label>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper elevation = {0} className = {classes.signupfoPaper}>
                              <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic" label = "55-4123567" variant = "outlined" size = "small"/>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper elevation = {0} className = {classes.signupInfoPaper}>
                              <label htmlFor="phoneNumber">Phone Number: </label>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper elevation = {0} className = {classes.signupfoPaper}>
                                <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic" label = "(909)123-4576" variant = "outlined" size = "small"/>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                              <Paper elevation = {0} className = {classes.signupInfoPaper}>
                                <label htmlFor="email">Email: </label>
                              </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper elevation = {0} className = {classes.signupfoPaper}>
                                <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic" label = "example@gmail.com" variant = "outlined" size = "small"/>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                              <Paper elevation = {0} className = {classes.signupInfoPaper}>
                                <label htmlFor="password">Password: </label>
                              </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper elevation = {0} className = {classes.signupfoPaper}>
                                <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic" label = "Password" variant = "outlined" size = "small"/>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper elevation = {0} className = {classes.signupfoPaper}>
                                <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic" label = "Reenter Password" variant = "outlined" size = "small"/>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                              <Paper elevation = {0} className = {classes.signupInfoPaper}>
                              <label htmlFor="description">What Does Your Organization Do?</label>
                              </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper elevation = {0} className = {classes.signupfoPaper}>
                              <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic" label = "field description" rows = "4" columns = "33" variant = "outlined" multiline = {true}/>                  </Paper>
                          </Grid>
                        </Grid>
                       </Container>
                      <Container className={classes.signFooter}>
                        <Button fullWidth = {true} color ="primary" variant = "contained">Submit</Button>
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

