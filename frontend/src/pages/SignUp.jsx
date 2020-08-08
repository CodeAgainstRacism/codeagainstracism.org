import React from "react";
import {makeStyles, Container, CssBaseline, Grid, Paper, Button,} from '@material-ui/core';
import Footer from "../components/Footer";
import SignUpImage from "../assets/SignUpImage.png";
import SignUpOrganization from "../components/SignUpOrganization"
import SignUpIndividual from "../components/SignUpIndividual"

//make the body a component so it varies from individual and organization

const signStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },

  textBackground: {
    background: "#fff"
  },
  /*grid papers*/
  paper: {
    padding: theme.spacing(2, 2), 
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
  },

  /*containers*/
  innerContainer: {
    alignItems: "stretch",
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
    background: "white",
    borderRadius: "7px 7px 0px 0px"
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
    borderRadius: "0px 0px 7px 7px"
  },

  textContainer: {
    position: "relative",
    fontSize: "12px",
    width: "100%",
    padding: "1rem 0",
    alignItems: "center",
  },

  pageContainer: {
    height: "60 vmax",
    margin: "0 auto",
    textAlign: "center",
    background: "#f2f2f2",
    overflow: "hidden",
    maxWidth: "70vw", 
  },

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
                    <Grid item xs={5}>
                      <Paper elevation = {0} className={classes.paper}>
                        <Container className = {classes.textContainer}>
                          <h1>Create Your Team</h1>
                            <Container>
                              <h4>~ Description of our organization ~</h4>
                                <img src = {SignUpImage} alt = "hand"/>
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
                          <h1>SIGN UP</h1>
                        </Container>
                          {/**renders here differently depending on usertype */}
                          {/*<SignUpOrganization/>*/}
                          <SignUpIndividual/>
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

