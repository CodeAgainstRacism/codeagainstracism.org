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
    background: "#fff",
  },

  signBody: {
      marginTop: "1%",
      fontSize : "12 px",
      width: "100%",
      overflow: "auto",
      paddingLeft: "10%",
      paddingRight: "10%",
      paddingBottom: "5%",
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
                      <label> First Name: </label>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.textFieldPaper}>
                      <TextField />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.signupInfoPaper}>
                      <label> Last Name: </label>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation = {0} className = {classes.textFieldPaper}>
                      <TextField />
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
                        <label> Profile description:</label>
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