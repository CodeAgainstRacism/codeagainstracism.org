
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
      paddingTop: "3%",
      fontSize : theme.spacing(2.5),
      paddingBottom: "5%",
      width: "95%",
    },
  }
  )
  
class NewProjectForm extends React.Component {
  //classes = projectFormStyles()
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      description: '',
      roles: ''};

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
    alert('A name was submitted: ' + this.state.projectName);
    alert('A name was submitted: ' + this.state.description);
    alert('A name was submitted: ' + this.state.roles);
    alert('A name was submitted: ' + this.state.startDate);
    alert('A name was submitted: ' + this.state.endDate);
    alert('A name was submitted: ' + this.state.fullName);
    alert('A name was submitted: ' + this.state.phone);
    alert('A name was submitted: ' + this.state.email);
    alert('A name was submitted: ' + this.state.organization);
    
    event.preventDefault();
    const data = {
      projectName: this.state.projectName,
        description: this.state.description,
        roles: this.state.roles,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        fullName: this.state.fullName,
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
        <Grid container spacing = {2} direction={"row"}>
             <Grid item xs = {2} container alignItems = "stretch">
                 <SideBar/>
             </Grid>
             <Grid item xs = {9}>
             <Container className = {classes.headingContainer}> 
                 Create A New Project
                 <Box className = {classes.dividerBar}></Box>
             </Container>

            <Container className = {classes.rightContainer}>
              <Grid container spacing={2} className = {classes.gridText}>
                <Grid item xs = {12} >
                  <TextField value = {this.state.projectName} onChange = {this.handleInputChange} name = "projectName" label = "Enter Your Project's Name"/>
              </Grid>
              <Grid item xs = {12} >
                  <TextField value = {this.state.description} onChange = {this.handleInputChange} name = "description" label = "Tell us about your project! " rows = "10"  multiline = {true}/>
              </Grid>
           
              <Grid item xs = {12} >
               <TextField value = {this.state.roles} onChange = {this.handleInputChange}name = "roles" label = "Qualifications for potential team members" rows = "3" multiline = {true}/>
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
                  <TextField value = {this.state.name} onChange = {this.handleInputChange} name = "fullName"/>
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
          </Grid>
          </Grid>
      </form>
      
         
    );
  }
}

  // import React, {Component} from "react";

  // import {Container,
  //         CssBaseline,
  //         Button,
  //         TextField,
  //         Grid,
  //         Box,
  //         makeStyles} from '@material-ui/core';
  // import Divider from '@material-ui/core/Divider';
  // import SideBar from "../components/SideBarOrganization";
  // import axios from 'axios';
  // import { BACKEND_URL } from '../config';
  // const projectFormStyles = makeStyles((theme) => ({

  //   root: {
  //     flexGrow: 1,
  //   },

  //   gridText:{
  //     textAlign: "justify",
  //     fontSize: theme.spacing(2.5),
  //   },

  //   dividerBar: {
  //     height: "2px",
  //     background: "#000000",
  //     flexGrow: 1,
  //   },

  //   headingContainer: {
  //     textAlign: "center",
  //     paddingBottom: "2%",
  //     paddingTop: "2%",
  //     fontSize : theme.spacing(4.5),
  //     width: "95%"
  //   },

  //   rightContainer: {
  //     backgroundColor: "white",
  //     paddingTop: "2%",
  //     paddingBottom: "5%",
  //     width: "95%"
  //   },
  // }))
  // class NewProjectForm extends Component() { 
  //   classes = projectFormStyles();
  //   constructor(props) {
  //     super(props);
  //     this.state = {value: ''};  setting value to nothing

  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //   }
  
  //   handleChange(event) {
  //     this.setState({value: event.target.value});
  //   }

  
  //  handleSubmit(event){
  //     alert('A name was submitted: ' + this.state.value);
  //     event.preventDefault()
  //     const data = {
  //       projectName: this.state.projectName,
  //         description: this.state.description,
  //         roles: this.state.roles,
  //         startDate: this.state.startDate,
  //         endDate: this.state.endDate,
  //         fullName: this.state.fullName,
  //         phone: this.state.phone,
  //         email: this.state.email, 
  //         organization: this.state.organization
  //     }
  //     axios.post(`${BACKEND_URL}projects`, {  JSON curlies
  //        params needed if multiple sets of data like params:{data}
  //        this is JSON data with name, contact info, description correspond to textfields
  //       data
  //     })
  //     .then(function (response) {
  //       console.log(data);  logs on console when run
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })

  //       var projectName = document.getElementsByName("projectName")[0].value;
  //       var description = document.getElementsByName("description")[0].value;
  //       var roles = document.getElementsByName("roles")[0].value;
  //       var startDate = document.getElementsByName("startDate")[0].value;
  //       var endDate = document.getElementsByName("endDate")[0].value;
  //       var fullName = document.getElementsByName("fullName")[0].value;
  //       var phone = document.getElementsByName("phone ")[0].value;
  //       var email = document.getElementsByName("email")[0].value;
  //       var organization = document.getElementsByName("organization")[0].value;
    
  //   }
 

  //   render(){
  //     return (
  //       <React.Fragment>
  //         <CssBaseline />
  //         <Grid container spacing = {0} id = "row">
  //           <Grid item xs = {2} container alignItems = "stretch">
  //               <SideBar/>
  //           </Grid>
  //           <Grid item xs = {9}>
  //           <Container className = {this.classes.headingContainer}> 
  //               Create A New Project
  //               <Box className = {this.classes.dividerBar}></Box>
  //           </Container>

  //           <Container className = {this.classes.rightContainer}>
  //             <Grid container spacing={3} className = {this.classes.gridText}>
  //             <form onSubmit={this.handleSubmit}>
  //             <Grid item xs = {12} >
  //                 <TextField value = {this.state.value} onChange = {this.handleChange} name = "projectName" label = "Enter Your Project's Name"/>
  //             </Grid>
  //             <Grid item xs = {12} >
  //                 <TextField name = "description" label = "Tell us about your project! " rows = "10"  multiline = {true}/>
  //             </Grid>
           
  //             <Grid item xs = {12} >
  //              <TextField name = "roles" label = "Qualifications for potential team members" rows = "3" multiline = {true}/>
  //             </Grid>
  //             <Grid  item  xs = {3} >
  //                 Start Date* 
  //             </Grid>
  //             <Grid item container xs = {3} display = "flex" justify = "space-evenly">
  //                 <TextField name = "startDate" type = "date"/>
  //             </Grid>
  //             <Grid item container xs = {3} display = "flex" justify = "space-evenly" >
  //                 End Date* 
  //             </Grid>
  //             <Grid item container xs = {3} display = "flex" justify = "space-evenly"  >
  //                 <TextField name = "endDate" type = "date"/>
  //             </Grid>
  //             <Grid item xs = {3} >
  //                 Cover Photo 
  //             </Grid>
  //             <Grid item container  xs = {9} justify = "flex-start"   >
  //                 <Button variant="contained" component="label" color = "primary"> 
  //                   Upload File
  //                   <input type="file" style={{ display: "none" }}/>
  //                 </Button>
  //             </Grid>
  //             <Grid item xs = {12} >
  //               <Divider variant="fullwidth"/>
  //               <p style={{fontSize: "30px"}}>Contact Information</p>
  //             </Grid>
  //             <Grid item xs = {3} >
  //                 Full name*
  //             </Grid>
  //             <Grid item xs = {9} >
  //                 <TextField name = "fullName"/>
  //             </Grid>
  //             <Grid item xs = {3} >
  //                 Phone number*
  //             </Grid>
  //             <Grid item xs = {9} >
  //                   <TextField name = "phone"/>              
  //             </Grid>
  //             <Grid item xs = {3} >
  //                 Email address*
  //             </Grid>
  //             <Grid item xs = {9}>
  //                 <TextField name = "email"/>              
  //             </Grid>
  //             <Grid item xs = {3} >
  //                 Organization*
  //             </Grid>
  //             <Grid item xs = {9} >
  //                 <TextField name = "organization"/> 
  //             </Grid>
  //             <Grid item container xs={12} justify = "center">
  //                 <Button type = "submit" color ="primary" variant = "contained">Submit</Button>
  //             </Grid> 
  //             </form>
  //           </Grid>
  //         </Container>
  //         </Grid>
  //       </Grid>
  //       </React.Fragment>
  //     );

  // }
  //   }

export default withStyles(projectFormStyles)(NewProjectForm);

