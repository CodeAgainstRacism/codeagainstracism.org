import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Container, CssBaseline, Grid, Paper,TextField} from '@material-ui/core';

const signStyles = makeStyles((theme) => ({
  textFieldPaper: {
    padding: theme.spacing(1,0,1,0),
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
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
              <Grid container spacing = {24}>
                <Grid item xs={12}>
                  <Paper elevation = {0} className = {classes.textFieldPaper}>
                    <TextField label = "First Name" />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation = {0} className = {classes.textFieldPaper}>
                    <TextField label = "Last Name" />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation = {0} className = {classes.textFieldPaper}>
                    <TextField label = "Username"/>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation = {0} className = {classes.textFieldPaper}>
                    <TextField 
                    type = "tel" label = "Username"/>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation = {0} className = {classes.textFieldPaper}>
                      <TextField type = "email"  label = "Email"/>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation = {0} className = {classes.textFieldPaper}>
                      <TextField type = "password" label = "Password"/>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation = {0} className = {classes.textFieldPaper}>
                      <TextField type = "password" label = "Reenter Password"/>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation = {0} className = {classes.textFieldPaper}>
                    <TextField label = "Profile description" rows = "4" multiline = {true}/>                  
                  </Paper>
                </Grid>
              </Grid>
            </Container> 
          </React.Fragment>
      )
}