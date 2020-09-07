import React from "react";
import {makeStyles, Checkbox } from '@material-ui/core';
import {Container,
        CssBaseline,
        Button,
        TextField,
        Grid,
        Box,} from '@material-ui/core';
//import { Checkbox } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Footer from "../components/Footer";
import SideBar from "../components/SideBarOrganization"
//for the sidebar, title, and form try using grid area
//checkut form authentification 
const projectFormStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    
  },

  fakeSideBar: {
    backgroundColor: "#c4c4c4",
    width: "100%",
    height: "100%"
  },

  gridText:{
    textAlign: "justify",
    fontSize: theme.spacing(2.5),
  },

  
  gridAlignment: {
    //marginLeft: "5%",
    //marginRight: "5%",
    display: "grid",
    gridTemplateColumns: "20% 80%",
    gridTemplateAreas: ` 'sideBar header'
                          'sideBar form' `,
             
  },

  dividerBar: {
    height: "2px",
    background: "#000000",
    flexGrow: 1,
  },

  headingContainer: {
    gridArea: "header",
    textAlign: "center",
    paddingBottom: "2%",
    paddingTop: "2%",
    fontSize : theme.spacing(4.5),
    width: "95%"
  },

  sideBarContainer: {
    gridArea: "sideBar",
    width: "100%",
    //marginLeft: "100%"
  },

  rightContainer: {
    gridArea: "form",
  //contains the heading and the form 
    backgroundColor: "white",
    paddingTop: "5%",
    paddingBottom: "5%",
    width: "95%"
  },
}))
export default function NewProjectForm() { 
  const classes = projectFormStyles();
  
    return (
      //if we're using a grid for the whole thing set direction to row?
      <React.Fragment>
        <CssBaseline />
        
        {/**must wrapper the whole thing as a body? */}
        <Grid container spacing = {0} id = "row">
          <Grid item xs = {2}>
            <Box className = {classes.sideBarContainer}>
              <SideBar/>
            </Box>
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
                <TextField placeholder = "Tell us about your project! Be sure to include details of your organization, requirements for potential members, and any further suggestions" rows = "20" columns = "30" multiline = {true}/>
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
            {/* <Grid justify = "flex-end" item xs = {6} >
                <Checkbox/> <label>Use Contact Information from account</label>
            </Grid> */}
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



