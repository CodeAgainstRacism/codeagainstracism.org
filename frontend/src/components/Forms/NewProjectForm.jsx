<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
import React from "react";
=======
=======
>>>>>>> Stashed changes
import React, { Fragment } from "react";
import {Button} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import { FormLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MyVert from "./VerticalNavBar";
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

const StyledField = withStyles({
  root: {
    width: '500px',
  },
})(TextField);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
export default NewProjectForm;
=======
import React, { Fragment } from "react";

const programmingLanguages = [
  "HTML/CSS",
  "JavaScript",
  "TypeScript",
  "C",
  "C++",
  "Java",
  "Python",
  "C#",
  "R",
  "PHP",
  "Swift",
  "Objective-C",
  "SQL",
  "Go",
  "Ruby",
  "Shell",
];

class NewProjectForm extends React.Component {
  render() {
    return (
      <div className="container">
        <form className="form-container">
          <h1 className="form-title">Create A New Project</h1>
          <div>
            <label htmlFor="projectName">Name of Project:</label>
            <input type="text" className="projectName" />
          </div>
          <div className="flex-box">
            <label htmlFor="projectStartDate"> Start Date:</label>
            <input type="date" className="projectStartDate" />
            <label htmlFor="projectEndDate"> End Date:</label>
            <input type="date" className="projectEndDate" />
          </div>
          <div>
            <label htmlFor="languages"> Type of Language:</label>
            <div className="checkbox-container">
              {programmingLanguages.map((language) => (
                <div key={language} className="checkbox">
                  <label htmlFor={"checkbox_" + language}>{language}</label>
                  <input
                    // key={language}
                    id={"checkbox_" + language}
                    type="checkbox"
                    name={"checkbox_" + language}
                    value={language}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <input
              type="text"
              name="other-languages"
              placeholder="Enter new languages"
            />
            <button>Submit</button>
          </div>
          <div>
            <label htmlFor="description"> Description of Project:</label>
            <textarea name="description" id="description" rows="5" />
          </div>
          <div>
            <h4> Point of Contact</h4>
            <label htmlFor="contactName">Name:</label>
            <input type="text" className="contactName" />
            <label htmlFor="contactPhoneNumber">Phone (optional):</label>
            <input type="text" className="contactPhoneNumber" />
            <label htmlFor="contactEmail">Email:</label>
            <input type="email" className="contactEmail" />
          </div>
          <button className="submit-button">Submit</button>
        </form>
=======
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      </div>
    );
  }
}

export default NewProjectForm;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> a53ff1dee3614355503f2e36f50cd12cfa71aa2e
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
