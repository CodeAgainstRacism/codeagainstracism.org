import React from "react";
import {Container,
        CssBaseline,
        Button,
        TextField,
        Grid,
        Box,
        makeStyles} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SideBar from "../components/SideBarOrganization"
const projectFormStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },

  gridText:{
    textAlign: "justify",
    fontSize: theme.spacing(2.5),
  },

  dividerBar: {
    height: "2px",
    background: "#000000",
    flexGrow: 1,
  },

  headingContainer: {
    textAlign: "center",
    paddingBottom: "2%",
    paddingTop: "2%",
    fontSize : theme.spacing(4.5),
    width: "95%"
  },

  rightContainer: {
    backgroundColor: "white",
    paddingTop: "2%",
    paddingBottom: "5%",
    width: "95%"
  },
}))
export default function NewProjectForm() { 
  const classes = projectFormStyles();
  
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container spacing = {0} id = "row">
          <Grid item xs = {2} container alignItems = "stretch">
              <SideBar/>
          </Grid>
          <Grid item xs = {9}>
          <Container className = {classes.headingContainer}> 
              Create A New Project
              <Box className = {classes.dividerBar}></Box>
          </Container>

          <Container className = {classes.rightContainer}>
            <Grid container spacing={3} className = {classes.gridText}>
            <Grid item xs = {12} >
                <TextField label = "Enter Your Project's Name"/>
            </Grid>
            <Grid item xs = {12} >
                <TextField label = "Tell us about your project! " rows = "10"  multiline = {true}/>
            </Grid>
           
            <Grid item xs = {12} >
             <TextField label = "Qualifications for potential team members" rows = "3" multiline = {true}/>
            </Grid>
            <Grid  item  xs = {3} >
                Start Date* 
            </Grid>
            <Grid item container xs = {3} display = "flex" justify = "space-evenly">
                <TextField type = "date"/>
            </Grid>
            <Grid item container xs = {3} display = "flex" justify = "space-evenly" >
                End Date* 
            </Grid>
            <Grid item container xs = {3} display = "flex" justify = "space-evenly"  >
                <TextField type = "date"/>
            </Grid>
            <Grid item xs = {3} >
                Cover Photo 
            </Grid>
            <Grid item container  xs = {9} justify = "flex-start"   >
                <Button variant="contained" component="label" color = "primary"> 
                  Upload File
                  <input type="file" style={{ display: "none" }}/>
                </Button>
            </Grid>
            <Grid item xs = {12} >
              <Divider variant="fullwidth"/>
              <p style={{fontSize: "30px"}}>Contact Information</p>
            </Grid>
            <Grid item xs = {3} >
                Full name*
            </Grid>
            <Grid item xs = {9} >
                <TextField/>
            </Grid>
            <Grid item xs = {3} >
                Phone number*
            </Grid>
            <Grid item xs = {9} >
                  <TextField/>              
            </Grid>
            <Grid item xs = {3} >
                Email address*
            </Grid>
            <Grid item xs = {9}>
                <TextField/>              
            </Grid>
            <Grid item xs = {3} >
                Organization*
            </Grid>
            <Grid item xs = {9} >
                <TextField/> 
            </Grid>
            <Grid item container xs={12} justify = "center">
                <Button color ="primary" variant = "contained">Submit</Button>
            </Grid> 
          </Grid>
        </Container>
        </Grid>
      </Grid>
      </React.Fragment>
    );
  }



