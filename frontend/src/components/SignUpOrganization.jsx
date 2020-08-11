import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Container, CssBaseline, Grid, Paper,TextField} from '@material-ui/core';


const signStyles = makeStyles((theme) => ({
  signupInfoPaper: {
    padding: theme.spacing(.5, 0),
    textAlign: 'left',
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
  },

  textFieldPaper: {
    textAlign: 'left',
    color: theme.palette.text.primary,
    background: "white",
  },

  signBody: {
      marginTop: "1%",
      fontSize : "12 px",
      width: "100%",
      overflow: "auto",
      padding: theme.spacing(1,6,1,6)
    },

}))

export default function SignUp() {
    const classes = signStyles();
      return (
        <React.Fragment>
          <CssBaseline />
            <Container className = {classes.signBody}>
                <Grid id = "row" container spacing = {24}>
                  <Grid item xs={6}>
                    <Paper elevation = {0} className = {classes.signupInfoPaper}>
                      <label> Organization Name: </label>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.textFieldPaper}>
                      <TextField placeholder = "This will be used as your username"/>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.signupInfoPaper}>
                      <label> EIN (Employer Identification Number): </label>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.textFieldPaper}>
                      <TextField placeholder = "55-4123567"/>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation = {0} className = {classes.signupInfoPaper}>
                      <label> Phone Number: </label>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.textFieldPaper}>
                      <TextField placeholder = "(909)123-4576"/>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                      <Paper elevation = {0} className = {classes.signupInfoPaper}>
                        <label> Email: </label>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.textFieldPaper}>
                        <TextField type = "email" InputProps = {classes.textBackground} placeholder = "example@gmail.com"/>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                      <Paper elevation = {0} className = {classes.signupInfoPaper}>
                        <label> Password: </label>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.textFieldPaper}>
                        <TextField type = "password" placeholder = "Password"/>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.textFieldPaper}>
                        <TextField type = "password" placeholder = "Reenter Password"/>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper elevation = {0} className = {classes.signupInfoPaper}>
                        <label> What Does Your Organization Do?</label>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.textFieldPaper}>
                      <TextField placeholder = "field description" rows = "4" columns = "33" multiline = {true}/>                  
                    </Paper>
                  </Grid>
                </Grid>
              </Container> 
          </React.Fragment>
        )
      }