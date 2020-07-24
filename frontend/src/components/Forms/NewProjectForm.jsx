import React, { Fragment } from "react";
import {Button} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import { FormLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MyVert from "./VerticalNavBar";

const StyledField = withStyles({
  root: {
    width: '500px',
  },
})(TextField);

class NewProjectForm extends React.Component {
  render() {
    return (
      <div className = "container">
      <div className="inner-container">
        
          <MyVert s/>
        
        <div className= "rightCon">
          <div className = "headingCon">
              <h1 className="form-title">Create A New Project</h1>
              <label>───────────────────────────────────────────────────────────────────────────────────────</label>
          </div>
        <form className="form-container">
          
          
          <div className = "labelCon">
            <label htmlFor="projectName">Project Name: </label>
          </div>
          <div className = "textRight">
            <StyledField id = "outlined-basic" label = "Enter Your Project's Name" variant = "outlined" row = '5' size = "small"/>
          </div>
          
          
          <div className = "labelCon">
            <label htmlFor="description"> Description of Project: </label> 
          </div>
          <div className = "textRight">
            <StyledField id = "outlined-basic"  label = "Tell us about your project! Be sure to include details of your organization, requirements for potential members, and any further suggestions" rows = "20" columns = "30" variant = "outlined" multiline = {true}/>
          </div>
          
          <div className="flex-box">
          
          <div className = "labelCon"> 
            <label htmlFor="projectEndDate"> Due Date: </label>
          </div>
          <div className = "textRight">
            <TextField id = "outlined-basic" type = "date" variant = "outlined" size = "small"/>
          </div>
         
          </div>
         
         

          <Button
            variant="contained"
            component="label"
            color = "primary"

          >
            Upload File
          <input
            type="file"
            style={{ display: "none" }}
          />
          </Button>






          <div>
            <label>────────────────────────────────────────────────────────────────────────</label>
            <h2>Contact Information</h2>
            
            
            
            <div className = "labelCon">
            <label htmlFor="contactName">Name: </label>
            </div>
            <div className = "textRight">
            <StyledField id = "outlined-basic" variant = "outlined" row = '5' size = "small"/>
            </div>
            
            
            <div className = "labelCon">
            <label htmlFor="contactPhoneNumber">Phone(optional): </label>
            </div>
            <div className = "textRight">
            <StyledField id = "outlined-basic" variant = "outlined" row = '5' size = "small"/>
            </div>
            
            
            <div className = "labelCon">
            <label htmlFor="contactEmail">Email:</label>
            </div>
            <div className = "textRight">
            <StyledField id = "outlined-basic" variant = "outlined" row = '5' size = "small"/>
            </div>
            
          </div>
          <Button color ="primary" variant = "contained">Submit</Button>
        </form>
        </div>
      </div>
      </div>
    );
  }
}

export default NewProjectForm;
