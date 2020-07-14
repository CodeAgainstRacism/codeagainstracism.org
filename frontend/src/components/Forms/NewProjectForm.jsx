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
      </div>
    );
  }
}

export default NewProjectForm;
