import React from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SideBar from "./VerticalNavBar";
import {Container,
        CssBaseline,
        Button,
        TextField,
        Paper,
        Grid,} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Footer from "../components/Footer";

const StyledField = withStyles({
  root: {
    width: "350px",
  },
})(TextField);


const projectFormStyles = makeStyles((theme) => ({
  pageContainer: {
    //height: "768px",
    width: "1366px",
    margin: "0 auto",
    textAlign: "center",
    background: "#f2f2f2",
    overflow: "hidden",
    maxWidth: "70vw", //TODO check if needed
  },

  innerContainer: {
    //width: "1366px",
    margin: "20 rem",
    border: "1px solid #292929",
    alignItems: "stretch",
    boxSizing: "border-box",
    background: "#f2f2f2",
    overflow: "hidden", 
    display: "flex",
    justifyContent: "center",
    
    
  },

  headingContainer: {
    border: "1px solid #292929",
    boxSizing: "border-box",
    textAlign: "left"
  },

  sideBarContainer: {
    border: "1px solid #292929",
    boxSizing: "border-box",
    marginLeft: "200px",
    display: "inline"
  },

  rightContainer: {
  //contains the heading and the form 
    backgroundColor: "white",
    border: "1px solid #292929",
    boxSizing: "border-box",
    marginTop: "20px",
    marginBottom: "6 rem",
    marginLeft: "20px",
    maxWidth: "650px",
    //marginRight: "200px"
  },

  // formContainer: {
  //   backgroundColor: "white",
  //   border: "0.1rem solid black",
  //   marginLeft: "10px",
  //   textAlign: "left",
  //   maxWidth: "650px",
  //   paddingBottom: "3rem"
  // },

}))


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1, 2), 
    textAlign: 'left',
    color: theme.palette.text.primary,
  },

  labelColor:{
    color:'#808080'
}

  
}));



export default function NewProjectForm() {
  const projectContainers = projectFormStyles();
  const classes = useStyles();
  
    return (

      <React.Fragment>
      <CssBaseline />

      <Container className = {projectContainers.pageContainer}>
      <Container className={projectContainers.innerContainer}>
        
          <SideBar/>
        
        <Container disableGutters = {true} className= {projectContainers.rightContainer}>
          <div className={classes.root}>
          <Grid container spacing={0}>
          <Container className = {projectContainers.headingContainer}>
          
          <Grid item xs={12}>
          <Paper elevation = {0} className={classes.paper}>
            <h1>Create A New Project</h1>
            <Divider variant="fullwidth"/>
          </Paper>
          </Grid>
          </Container>
        
          <Grid item xs = {12} sm = {12}>
            <Paper elevation = {0} className={classes.paper}>
              <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic" label = "Enter Your Project's Name" variant = "outlined" row = '5' size = "small"/>
            </Paper>
          </Grid>

          <Grid item xs = {12} sm = {12}>
            <Paper elevation = {0} className={classes.paper}>
              <TextField fullWidth = {true} InputLabelProps={{ className: classes.labelColor}} id = "outlined-basic"  label = "Tell us about your project! Be sure to include details of your organization, requirements for potential members, and any further suggestions" rows = "20" columns = "30" variant = "outlined" multiline = {true}/>
            </Paper>
          </Grid>
          
          
          
          <Grid item xs = {12} sm = {4}>
            <Paper elevation = {0} className={classes.paper}> Due Date: </Paper>
          </Grid>
          <Grid item xs = {12} sm = {8}>
            <Paper elevation = {0} className={classes.paper}>
              <TextField id = "outlined-basic" type = "date" variant = "outlined" size = "small"/>
            </Paper>
          </Grid>
         
          <Grid item xs = {12} sm = {4}>
            <Paper elevation = {0} className={classes.paper}></Paper>
            </Grid>


          <Grid item xs = {12} sm = {8}>
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
            
            
            
            <Grid item xs = {12} sm = {4}>
              <Paper elevation = {0} className={classes.paper}> 
                Name: 
              </Paper> 
            </Grid>
            <Grid item xs = {12} sm = {8}>
              <Paper elevation = {0} className={classes.paper}> 
                <StyledField  id = "outlined-basic" variant = "outlined" row = '5' size = "small"/>
              </Paper> 
            </Grid>
            
            
            <Grid item xs = {12} sm = {4}>
              <Paper elevation = {0} className={classes.paper}> 
                Phone(optional): 
              </Paper>
            </Grid>

           <Grid item xs = {12} sm = {8}>
              <Paper elevation = {0} className={classes.paper}> 
                <StyledField  id = "outlined-basic" variant = "outlined" row = '5' size = "small"/>
              </Paper>
           </Grid>
            
            
           <Grid item xs = {12} sm = {4}>
              <Paper elevation = {0} className={classes.paper}> 
                Email:
              </Paper>
            </Grid>


            <Grid item xs = {12} sm = {8}>
              <Paper elevation = {0} className={classes.paper}> 
                <StyledField  id = "outlined-basic" variant = "outlined" row = '5' size = "small"/>
              </Paper>
            </Grid>


            <Grid item xs = {12} sm = {4}>
              <Paper elevation = {0} className={classes.paper}> 
                Primary organization:
              </Paper>
            </Grid>


            <Grid item xs = {12} sm = {8}>
              <Paper elevation = {0} className={classes.paper}> 
                <StyledField  id = "outlined-basic" variant = "outlined" row = '5' size = "small"/>
              </Paper>
            </Grid>


            <Grid item xs = {12} sm = {4}>
            <Paper elevation = {0} className={classes.paper}></Paper>
            </Grid>

            <Grid item xs = {12} sm = {8}>
            <Paper elevation = {0} className={classes.paper}>
              <Button color ="primary" variant = "contained">Submit</Button>
            </Paper>
            </Grid>
          
        </Grid>
        </div>
        </Container>
      </Container>
      </Container>
      {/* Footer */}
      <Footer />
      {/* End footer */}

      </React.Fragment>
    );
  }



