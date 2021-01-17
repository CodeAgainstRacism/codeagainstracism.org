
import React, { useState, useEffect, useRef } from "react";
//CLASSES CANNOT USE STYLING HOOKS
import {Container,
        Button,
        TextField,
        Grid,
        Box,
        makeStyles} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import SideBar from "../components/SideBarOrganization";
import axios from 'axios';
import { BACKEND_URL, BUCKET_ID, BUCKET_NAME, BUCKET_KEY, BUCKET_REGION, DIR_NAME } from '../config';
import S3 from 'react-aws-s3';

const projectFormStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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
  contactlabelbox:{
    fontSize: theme.spacing(3.5)
  },
  yellowCheck:{
    color: "#FFC43D",
    '&$checked':
    {color: "#FFC43D",}
  },
}
))

    
  

const NewProjectForm= (props) => {

  const classes = projectFormStyles();
  const { id: org_id} = props.match.params

  //state hooks
  const [projectDetails, setProjectDetails] = useState([{
    "name": "",
    "description": "",
    "startDate": null,
    "endDate": null,
    "organizationId": null,
  }])
  const fileSrc = useRef();
  


  const updateProject = (id, value) => {
    setProjectDetails([{...projectDetails[0], [id]: value}]);
  }

  const uploadImage = event => {
    event.preventDefault()
    console.log(fileSrc.current)
    const bucketInfo = {
      bucketName: BUCKET_NAME,
      dirName: DIR_NAME,
      region: BUCKET_REGION,
      accessKeyId: BUCKET_ID,
      secretAccessKey: BUCKET_KEY,    
    }
    let image = fileSrc.current.files[0];
    let imageName = fileSrc.current.files[0].name.split('.')[0]

    console.log(image)
    console.log(imageName)
    const S3Client = new S3(bucketInfo)
    S3Client.uploadFile(image, imageName).then(data => {
      console.log(data);
      if(data.status === 204){
        console.log('success')
      }
      else{
        console.log('fail')
      }
    })
      .then(function (response) {
        console.log(response);  //logs on console when run
      })
      .catch(function (error) {
        console.log("Error when submitting new project", error);
      })

  }

    return (
      <form>
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
                  <TextField value = "" onChange = {(e)=>{updateProject(e.target.getAttribute("id"), e.target.value)}} id = "name" label = "Enter Your Project's Name" type = "string"/>
              </Grid>
              <Grid item xs = {12} >
                  <TextField value = "" onChange = {(e)=>{updateProject(e.target.getAttribute("id"), e.target.value)}} name = "description" label = "Tell us about your project! " type = "string" rows = "5"  multiline = {true}/>
              </Grid>
           
              <Grid item xs = {12} >
               <TextField value = "" onChange = {(e)=>{updateProject(e.target.getAttribute("id"), e.target.value)}} name = "qualifications" label = "Qualifications for potential team members" rows = "5" multiline = {true}/>
              </Grid>
              <Grid  item  xs = {3} >
                  Start Date* 
              </Grid>
              <Grid item container xs = {3} display = "flex" justify = "space-evenly">
                  <TextField value = "" onChange = {(e)=>{updateProject(e.target.getAttribute("id"), e.target.value)}} name = "startDate" type = "date"/>
              </Grid>
              <Grid item container xs = {3} display = "flex" justify = "space-evenly" >
                  End Date* 
              </Grid>
              <Grid item container xs = {3} display = "flex" justify = "space-evenly"  >
                  <TextField value = "" onChange = {(e)=>{updateProject(e.target.getAttribute("id"), e.target.value)}} name = "endDate" type = "date"/>
              </Grid>
              <Grid item xs = {3} >
                  Cover Photo 
              </Grid>
              <Grid item container  xs = {9} justify = "flex-start"   >
                <input type="file" ref={fileSrc}/>
              </Grid>


              <Grid item xs = {12} >
              <Divider variant="fullWidth"/>
              </Grid>

              <Grid item container xs = {6} className = {classes.contactlabelbox} justify = "flex-start">
                
                Contact Information
              </Grid>
              <Grid item container xs = {6} justify = "flex-end">
              <FormControlLabel
                  control={<input type="checkbox" className={classes.yellowCheck}  onChange={() => {}} name="cb" checked={false}/> }
                label="Use information from account"
               />
                
              </Grid>
              <Grid item xs = {3} >
                  First name*
              </Grid>
              <Grid item xs = {9} >
                  <TextField value = "" onChange = {()=>{}} name = "firstName"/>
              </Grid>

              <Grid item xs = {3} >
                  Last name*
              </Grid>
              <Grid item xs = {9} >
                  <TextField value = "" onChange = {()=>{}} name = "lastName"/>
              </Grid>

              <Grid item xs = {3} >
                  Phone number*
              </Grid>
              <Grid item xs = {9} >
                    <TextField value = "" onChange = {()=>{}} name = "optionalPhoneNumber"/>              
              </Grid>
              <Grid item xs = {3} >
                  Email address*
              </Grid>
              <Grid item xs = {9}>
                  <TextField value = "" onChange = {()=>{}}name = "optionalEmail"/>              
              </Grid>
              
              <Grid item container xs={12} justify = "center">
                  <Button size = "large" type = "submit" color ="primary" variant = "contained" onClick={uploadImage}>Submit</Button>
              </Grid> 
              </Grid>
              </Container>
          </Container>
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
  
export default NewProjectForm;
