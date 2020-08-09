import React from "react";
import {makeStyles } from '@material-ui/core';
import Footer from "../components/Footer";
import {Container,
        CssBaseline,
        Button,
        TextField,
        Paper,
        Grid,} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SideBar from "../components/SideBarOrganization";
//checkut form authentification 
//create label fields for name and description
//make padding between textfields more bigger?
const projectFormStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },

  dividerColor: {
    backgroundColor: 'black',
  },

  paper: {
    padding: theme.spacing(1, 2), 
    textAlign: 'left',
    color: theme.palette.text.primary,
    fontSize: "16px"
  },

  headerPaper: {
    padding: theme.spacing(1,0,1,0), 
    textAlign: 'left',
    color: theme.palette.text.primary,
    backgroundColor: "#f2f2f2",
    borderRadius : "0"

  },

  outerPaper:{
    padding: theme.spacing(0.5, 0, 0, 0), 
    backgroundColor: "#f2f2f2"
  },

  pageContainer: {
    height: "60 vmax",
    textAlign: "center",
    alignItems: "left",
    backgroundColor: theme.palette.background,
    overflow: "hidden",
    maxWidth: "100vw", 
  },

  innerContainer: {
    width: "100%",
    // border: "1px solid #292929",
    // boxSizing: "border-box",
    alignItems: "stretch",
    backgroundColor: theme.palette.background,
    overflow: "hidden", 
    display: "flex",
    justifyContent: "center",
  },

  headingContainer: {
    // border: "1px solid #292929",
    // boxSizing: "border-box",
    textAlign: "left",
    backgroundColor: theme.palette.background,
  },

  formContainer: {
    backgroundColor: "white",
    paddingRight: "1%",
    paddingTop: "2%",
    paddingBottom: "3%"
  },

  rightContainer: {
  //contains the heading and the form 
    width: "100%",
    backgroundColor: "white",
    // border: "1px solid #292929",
    // boxSizing: "border-box",
    marginLeft: "5%",
    //paddingRight: "1%"
  },
}))
export default function NewProjectForm() { 
  const classes = projectFormStyles();
  
    return (

      <React.Fragment>
        <CssBaseline />
          <Container className = {classes.pageContainer}>
            <Container disableGutters = {true} className={classes.innerContainer}>
            <div className={classes.root}>
              <Grid container spacing={0}>
                {/**this is the sidebar */}
                <Grid item xs={2}>
                <Paper elevation = {0} className={classes.outerPaper}>
                  <SideBar/>
                </Paper>
                </Grid>
                {/**This is the form with header */}
              <Grid item xs = {8}>
              <Paper elevation = {0} className={classes.outerPaper}>
              <Container disableGutters = {true} className= {classes.rightContainer}>
                <div className={classes.root}>
                <Grid id = "row" container spacing = {24}>
                    <Container disableGutters = {true} className = {classes.headingContainer}> 
                      <Grid alignContent = "flex-start" item xs={12}>
                        <Paper elevation = {0} className={classes.headerPaper}>
                          <h1>Create Project</h1>
                          <Divider classes={{root: classes.dividerColor}} variant="fullwidth"/>
                        </Paper>
                      </Grid>
                    </Container>
                    <Container disableGutters = {true} className = {classes.formContainer}>
                    <Grid id = "row" container spacing = {24}>
                    <Grid item xs = {12} sm = {3}>
                      <Paper elevation = {0} className={classes.paper}>
                        Project Name:
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {9}>
                      <Paper elevation = {0} className={classes.paper}>
                        <TextField placeholder = "Enter Your Project's Name"/>
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {3}>
                      <Paper elevation = {0} className={classes.paper}>
                        Project Description:
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {9}>
                      <Paper elevation = {0} className={classes.paper}>
                        <TextField placeholder = "Tell us about your project! Be sure to include details of your organization, requirements for potential members, and any further suggestions" 
                        rows = "15" columns = "30" multiline = {true}/>
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {3}>
                      <Paper elevation = {0} className={classes.paper}> 
                        Due Date: 
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {9}>
                      <Paper elevation = {0} className={classes.paper}>
                        <TextField fullWidth = {false} type = "date"/>
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {3}>
                      <Paper elevation = {0} className={classes.paper}>
                        Attachments:
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {9}>
                      <Paper elevation = {0} className={classes.paper}> 
                        <Button variant="contained" component="label" color = "primary"> 
                          Upload File
                          <input type="file" style={{ display: "none" }}/>
                        </Button>
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {12}>
                      <Paper elevation = {0} className={classes.paper}> 
                        <Divider variant="fullwidth"/>
                        <h2>Contact Information</h2>
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {3}>
                      <Paper elevation = {0} className={classes.paper}> 
                        Name: 
                      </Paper> 
                    </Grid>
                    <Grid item xs = {12} sm = {9}>
                      <Paper elevation = {0} className={classes.paper}> 
                        <TextField placeholder = "No name has been given" />
                      </Paper> 
                    </Grid>
                    <Grid item xs = {12} sm = {3}>
                      <Paper elevation = {0} className={classes.paper}> 
                        Phone (optional): 
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {9}>
                        <Paper elevation = {0} className={classes.paper}> 
                          <TextField placeholder = "No phone number has been given"/>              
                        </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {3}>
                      <Paper elevation = {0} className={classes.paper}> 
                        Email:
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {9}>
                      <Paper elevation = {0} className={classes.paper}> 
                        <TextField placeholder = "No email has been given"/>              
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {3}>
                      <Paper elevation = {0} className={classes.paper}> 
                        Primary organization:
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {9}>
                      <Paper elevation = {0} className={classes.paper}>
                        <TextField placeholder = "No organization has been given"/> 
                      </Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {5}>
                      <Paper elevation = {0} className={classes.paper}></Paper>
                    </Grid>
                    <Grid item xs = {12} sm = {7}>
                      <Paper elevation = {0} className={classes.paper}>
                        <Button color ="primary" variant = "contained">Submit</Button>
                      </Paper>
                    </Grid> 
                    </Grid>
                    </Container>
                  </Grid>
                </div>
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



