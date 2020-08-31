import React from "react";
import {makeStyles } from '@material-ui/core';
import {Container,
        CssBaseline,
        Button,
        TextField,
        Grid,
        Box} from '@material-ui/core';
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
    textAlign: "left"
  },

  
  gridAlignment: {
    marginLeft: "10%",
    marginRight: "10%",
    display: "grid",
    gridTemplateColumns: "23% 77%",
    gridTemplateAreas: ` 'sideBar header'
                          'sideBar form' `,
             
  },

  dividerBar: {
    height: "1px",
    background: "#808080",
    flexGrow: 1,
  },

  headingContainer: {
    gridArea: "header",
    //border: "1px solid #03fc17",
    //boxSizing: "border-box",
    textAlign: "left",
  },

  sideBarContainer: {
    gridArea: "sideBar",
    //border: "1px solid #292929",
    //boxSizing: "border-box",
    width: "100%",
    //display: "inline"
  },

  rightContainer: {
    gridArea: "form",
  //contains the heading and the form 
    backgroundColor: "white",
    paddingTop: "5%",
    paddingBottom: "5%"
    //border: "1px solid #292929",
    //boxSizing: "border-box",
    //marginTop: "20px",
    //marginBottom: "6 rem",
    //marginRight: "200px"
  },
}))
export default function NewProjectForm() { 
  const classes = projectFormStyles();
  
    return (

      <React.Fragment>
        <CssBaseline />
        {/**must wrapper the whole thing as a body? */}
        <body className = {classes.gridAlignment} >
          <Container className = {classes.sideBarContainer}>
            <SideBar/>
          </Container>
              {/*<SideBar/>*/}
              
                {/*<div className={classes.root}>*/}

          <Container disableGutters = {true} className = {classes.headingContainer}> 
              <h1>Create A New Project</h1>
              <Box className = {classes.dividerBar}></Box>
          </Container>

          <Container className = {classes.rightContainer}>
            <Grid container spacing={3} className = {classes.gridText}>
            <Grid item xs = {12} sm = {12}>
                <TextField placeholder = "Enter Your Project's Name"/>
            </Grid>
            <Grid item xs = {12} sm = {12}>
                <TextField placeholder = "Tell us about your project! Be sure to include details of your organization, requirements for potential members, and any further suggestions" rows = "20" columns = "30" multiline = {true}/>
            </Grid>
            <Grid item xs = {12} sm = {4}>
                Due Date: 
            </Grid>
            <Grid item xs = {12} sm = {8}>
                <TextField type = "date"/>
            </Grid>
            <Grid item xs = {12} sm = {4}>
            </Grid>
            <Grid item xs = {12} sm = {8}>
                <Button variant="contained" component="label" color = "primary"> 
                  Upload File
                  <input type="file" style={{ display: "none" }}/>
                </Button>
            </Grid>
            <Grid item xs = {12} sm = {12}>
                <Divider variant="fullwidth"/>
                <h2>Contact Information</h2>
            </Grid>
            <Grid item xs = {12} sm = {4}>
                Name: 
            </Grid>
            <Grid item xs = {12} sm = {8}>
                <TextField/>
            </Grid>
            <Grid item xs = {12} sm = {4}>
                Phone(optional): 
            </Grid>
            <Grid item xs = {12} sm = {8}>
                  <TextField/>              
            </Grid>
            <Grid item xs = {12} sm = {4}>
                Email:
            </Grid>
            <Grid item xs = {12} sm = {8}>
                <TextField/>              
            </Grid>
            <Grid item xs = {12} sm = {4}>
                Primary organization:
            </Grid>
            <Grid item xs = {12} sm = {8}>
                <TextField/> 
            </Grid>
            
            <Grid item xs={12}
                      display="flex"
                      justify="flex-end">
                <Button color ="primary" variant = "contained">Submit</Button>
            </Grid> 
          </Grid>
        </Container>
      {/** </div> */}  
        </body>  
      </React.Fragment>
    );
  }



