
import React from "react";
//CLASSES CANNOT USE STYLING HOOKS
import {Container,
        Button,
        TextField,
        Grid,
        Box,
        withStyles} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import SideBar from "../components/SideBarOrganization";
import axios from 'axios';
import { BACKEND_URL } from '../config';

const YellowCheckbox = withStyles({
  root: {
    color: "#FFC43D",
    '&$checked': {
      color: "#FFC43D",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

    contactlabelbox:{
      fontSize: theme.spacing(3.5)
    }
  }
  )
  
class NewProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      qualifications: '',
      startDate: '',
      endDate: '',
      firstName: '',
      lastName: '',
      optionalPhoneNumber: '',
      optionalEmail: '',
      cb: false};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
   
  }

  handleChange = (event) =>{
    
    this.setState({ 
      [event.target.name]: event.target.checked 
     });

     if(this.state.cb === false){

      axios.get(`${BACKEND_URL}/users/2`, 
      {
        params: {}
      }
      )
    .then( (response) => {
      console.log(response.data);  //logs on console when run
      
     
      this.setState({ firstName: response.data.firstName,
         lastName: response.data.lastName,
        phone: response.data.phoneNumber,
        email: response.data.email,
       // organization: response.data.ownedOrganization.name,
                        });
    })
    .catch(function (error) {
      console.log(error);
    })
  
    }

    else{
      this.setState({ 
        //organization should not be on there, full name split into first and last
        firstName: '',
        lastName: '',
        optionalPhoneNumber: '',
        optionalEmail: '',
        
         
       });
    }
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
    
    event.preventDefault();
    const data = {
        name: this.state.name, 
        description: this.state.description,
       qualifications: this.state.qualifications, //not in route yet
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        // fullName: this.state.fullName, //this stuff is not on the route yet and below
        optionalPhoneNumber: this.state.phone,
         optionalEmail: this.state.email, 
        // organization: this.state.organization
         //contact info use a checkbox that can use get requestto get info from the user and fil it out
         //change file to textfield where user uploads a url of their image
    }
    axios.post(`${BACKEND_URL}projects`,   //JSON curlies
      // params needed if multiple sets of data like params:{data}
     //  this is JSON data with name, contact info, description correspond to textfields
      data
    )
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
            <Container style={{ backgroundColor: "white", paddingTop:"2%", paddingBottom: "2%" }}>
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
                <TextField></TextField>
              </Grid>


              <Grid item xs = {12} >
              <Divider variant="fullWidth"/>
              </Grid>

              <Grid item container xs = {6} className = {classes.contactlabelbox} justify = "flex-start">
                
                Contact Information
              </Grid>
              <Grid item container xs = {6} justify = "flex-end">
              <FormControlLabel
                  control={<YellowCheckbox  onChange={this.handleChange} name="cb" checked={this.state.cb}/> }
                label="Use information from account"
               />
                
              </Grid>




              <Grid item xs = {3} >
                  First name*
              </Grid>
              <Grid item xs = {9} >
                  <TextField value = {this.state.firstName} onChange = {this.handleInputChange} name = "firstName"/>
              </Grid>

              <Grid item xs = {3} >
                  Last name*
              </Grid>
              <Grid item xs = {9} >
                  <TextField value = {this.state.lastName} onChange = {this.handleInputChange} name = "lastName"/>
              </Grid>

              <Grid item xs = {3} >
                  Phone number*
              </Grid>
              <Grid item xs = {9} >
                    <TextField value = {this.state.phone} onChange = {this.handleInputChange} name = "optionalPhoneNumber"/>              
              </Grid>
              <Grid item xs = {3} >
                  Email address*
              </Grid>
              <Grid item xs = {9}>
                  <TextField value = {this.state.email} onChange = {this.handleInputChange}name = "optionalEmail"/>              
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
