import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, TextField} from '@material-ui/core';


const signStyles = makeStyles((theme) => ({
  signBody: {
    marginTop: "1%",
    width: "100%",
    overflow: "hidden",
    padding: theme.spacing(1,6,1,6)
  },

}))

export default function SignUp() {
    const classes = signStyles();
      return (
        <React.Fragment>
          <Container className = {classes.signBody}>
            <Grid  direction = "column" container spacing = {1}>
              <Grid  item xs={12}>
                  <TextField label = "Organization Name"/>
              </Grid>
              <Grid item xs={12}>
                  <TextField label = "EIN (Employer Identification Number)"/>
              </Grid>
              <Grid item xs={12}>
                  <TextField label = "Username"/>
              </Grid>
              <Grid item xs={12}>
                  <TextField type = "tel" label = "Phone Number"/>
              </Grid>
              <Grid item xs={12}>
                    <TextField type = "email" label = "Email"/>
              </Grid>
              <Grid item xs={12}>
                    <TextField type = "password" label = "Password"/>
              </Grid>
              <Grid item xs={12}>
                    <TextField type = "password" label = "Confirm Password"/>
              </Grid>
              <Grid item xs={12}>
                  <TextField label = "What Does Your Organization Do?" rows = "4" multiline = {true}/>                  
              </Grid>
            </Grid>
          </Container> 
        </React.Fragment>
      )
}