
import React from "react";
//CLASSES CANNOT USE STYLING HOOKS
import {
  Container,
  Button,
  TextField,
  Grid,
  Box,
  withStyles
} from '@material-ui/core';
import SideBar from "../components/SideBarOrganization";
import axios from 'axios';
import { BACKEND_URL } from '../config';

const projectFormStyles = theme => ({
  root: {
    flexGrow: 1,
  },

  gridText: {
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
    fontSize: theme.spacing(4.5),
  },

  rightContainer: {
    paddingBottom: "5%",
    // minHeight: "100vh",
  },
}
)

class NewProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      description: '',
      qualifications: '',
      startDate: '',
      endDate: '',
    };

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
    event.preventDefault();

    const data = {
      projectName: this.state.projectName, //name
      description: this.state.description,
      qualifications: this.state.qualifications,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    }

    console.log(data)

    axios.post(`${BACKEND_URL}/projects`, {  //JSON curlies
      // params needed if multiple sets of data like params:{data}
      //  this is JSON data with name, contact info, description correspond to textfields
      data
    })
      .then(function (response) {
        console.log(data);  //logs on console when run
      })
      .catch(function (error) {
        console.log("Error when submitting new project", error);
      })

  }

  render() {

    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container direction={"row"}>
          <Grid container item xs={2} alignItems="stretch">
            <SideBar />
          </Grid>
          <Grid container item xs={10} className={classes.rightGridContainer}>

            <Container className={classes.headingContainer}>
              Create A New Project
                 <Box className={classes.dividerBar}></Box>
            </Container>
            <Container className={classes.rightContainer}>
              <Container style={{ backgroundColor: "white" }}>
                <Grid container spacing={2} className={classes.gridText}>
                  <Grid item xs={12} >
                    <TextField value={this.state.projectName} onChange={this.handleInputChange} name="projectName" label="Enter Your Project's Name (Limit: 50 characters)" type="string" />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField value={this.state.description} onChange={this.handleInputChange} name="description" label="Tell us about your project! " type="string" rows="5" multiline={true} />
                  </Grid>

                  <Grid item xs={12} >
                    <TextField value={this.state.qualifications} onChange={this.handleInputChange} name="qualifications" label="Qualifications for potential team members" rows="5" multiline={true} />
                  </Grid>
                  <Grid item xs={3} >
                    Start Date*
              </Grid>
                  <Grid item container xs={3} display="flex" justify="space-evenly">
                    <TextField value={this.state.startDate} onChange={this.handleInputChange} name="startDate" type="date" />
                  </Grid>
                  <Grid item container xs={3} display="flex" justify="space-evenly" >
                    End Date*
              </Grid>
                  <Grid item container xs={3} display="flex" justify="space-evenly"  >
                    <TextField value={this.state.endDate} onChange={this.handleInputChange} name="endDate" type="date" />
                  </Grid>
                  <Grid item xs={3} >
                    Cover Photo
              </Grid>
                  <Grid item container xs={9} justify="flex-start"   >
                    <Button variant="contained" component="label" color="primary">
                      Upload File
                    <input type="file" style={{ display: "none" }} />
                    </Button>
                  </Grid>
                  <Grid item xs={12} >
                  </Grid>
                  <Grid item container xs={12} justify="center">
                    <Button size="large" type="submit" color="primary" variant="contained">Submit</Button>
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
