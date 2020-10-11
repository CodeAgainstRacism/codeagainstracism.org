
import React from "react";
//CLASSES CANNOT USE STYLING HOOKS
import {Container,
        Button,
        TextField,
        Grid,
        Box,
        withStyles} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SideBar from "../components/SideBarOrganization";
import axios from 'axios';
import { BACKEND_URL } from '../config';

const projectFormStyles = theme => ({

    root: {
      flexGrow: 1,
    },

    gridText:{
      textAlign: "justify",
      fontSize: theme.spacing(2.5),
    },

    rightGridContainer: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
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
    },

    rightContainer: {
      paddingBottom: "5%",
      minHeight: "100vh",
    },
  }
  )
  
class NewProjectForm extends React.Component {
  //classes = projectFormStyles()
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      qualifications: '',
      startDate: '',
      endDate: '',
      fullName: '',
      phone: '',
      email: '',
      organization: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
   }

  handleSubmit(event) {
    // alert('A projectname was submitted: ' + this.state.projectName);
    // alert('A description was submitted: ' + this.state.description);
    // alert('A roles was submitted: ' + this.state.roles);
    // alert('A startDate was submitted: ' + this.state.startDate);
    // alert('A endDate was submitted: ' + this.state.endDate);
    // alert('A fullName was submitted: ' + this.state.fullName);
    // alert('A phone was submitted: ' + this.state.phone);
    // alert('A email was submitted: ' + this.state.email);
    // alert('A organization was submitted: ' + this.state.organization);
    
    event.preventDefault();
    const data = {
        name: this.state.name, //name
        description: this.state.description,
        qualifications: this.state.qualifications,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        fullName: this.state.fullName, //this stuff is not on the route yet and below
        phone: this.state.phone,
        email: this.state.email, 
        organization: this.state.organization
    }
    axios.post(`${BACKEND_URL}projects`, {  //JSON curlies
      // params needed if multiple sets of data like params:{data}
     //  this is JSON data with name, contact info, description correspond to textfields
      data
    })
    .then(function (response) {
      console.log(data);  //logs on console when run
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
   
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container direction={"row"}>
             <Grid item xs = {2} container alignItems = "stretch">
                 <SideBar/>
             </Grid>
             <Grid container item xs = {10} className={classes.rightGridContainer}>

             <Container className = {classes.headingContainer}> 
                 Create A New Project
                 <Box className = {classes.dividerBar}></Box>
             </Container>
            <Container className = {classes.rightContainer}>
            <Container style={{ backgroundColor: "white" }}>
              <Grid container spacing={2} className = {classes.gridText}>
                <Grid item xs = {12} >
                  <TextField value = {this.state.name} onChange = {this.handleInputChange} name = "name" label = "Enter Your Project's Name" type = "string"/>
              </Grid>
              <Grid item xs = {12} >
                  <TextField value = {this.state.description} onChange = {this.handleInputChange} name = "description" label = "Tell us about your project! " type = "string" rows = "5"  multiline = {true}/>
              </Grid>
           
              <Grid item xs = {12} >
               <TextField value = {this.state.qualifications} onChange = {this.handleInputChange}name = "qualifications" label = "Qualifications for potential team members" rows = "5" multiline = {true}/>
              </Grid>
              <Grid  item  xs = {3} >
                  Start Date* 
              </Grid>
              <Grid item container xs = {3} display = "flex" justify = "space-evenly">
                  <TextField value = {this.state.startDate} onChange = {this.handleInputChange} name = "startDate" type = "date"/>
              </Grid>
              <Grid item container xs = {3} display = "flex" justify = "space-evenly" >
                  End Date* 
              </Grid>
              <Grid item container xs = {3} display = "flex" justify = "space-evenly"  >
                  <TextField value = {this.state.endDate} onChange = {this.handleInputChange} name = "endDate" type = "date"/>
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
                  <TextField value = {this.state.fullName} onChange = {this.handleInputChange} name = "fullName"/>
              </Grid>
              <Grid item xs = {3} >
                  Phone number*
              </Grid>
              <Grid item xs = {9} >
                    <TextField value = {this.state.phone} onChange = {this.handleInputChange} name = "phone"/>              
              </Grid>
              <Grid item xs = {3} >
                  Email address*
              </Grid>
              <Grid item xs = {9}>
                  <TextField value = {this.state.email} onChange = {this.handleInputChange}name = "email"/>              
              </Grid>
              <Grid item xs = {3} >
                  Organization*
              </Grid>
              <Grid item xs = {9} >
                  <TextField value = {this.state.organization} onChange = {this.handleInputChange} name = "organization"/> 
              </Grid>
              <Grid item container xs={12} justify = "center">
                  <Button size = "large" type = "submit" color ="primary" variant = "contained">Submit</Button>
              </Grid> 
              </Grid>
              </Container>
          </Container>
          </Grid>
          </Grid>
      </form>
      
         
    );
  }
}

export default withStyles(projectFormStyles)(NewProjectForm);

