import React from "react"

class Create_Project extends React.Component{
    //features needed: skills needed- just list html, css
    //type of project needed: website, databases, other
    //project description
    //date of submission
    //date needed by
    //after landingpage submit button is hit it should lead here
    //if other clicked then create text box?
    //submit click event that toggles between landingpage and create_proj
    //create own button style in styles folder for HTML, CSS, etc buttons
    render(){
        return (
            <div>
                <form className="form-container">
                    <div>
                        <label>Name of Project:</label>
                        <input type = "string" clasName = "name"/>
                    </div>
                    <div>
                        <label> Start Date:</label>
                        <input type = "date" className = "start_date"/>
                    </div>
                    <div>
                        <label> End Date:</label>
                        <input type = "date" className = "end_date"/>
                    </div>
                    <div>
                        <label> Type of Language:</label>
                        
                        <button className = "skill-button"> HTML </button>
                        <button className = "skill-button"> CSS  </button>
                        <button className = "skill-button"> Java  </button>
                        <button className = "skill-button"> Python  </button>
                        <button onClick = {makeText} className = "skill-button"> Other  </button> 
                    </div>
                    <div>
                        <label> Description of Project:</label>
                        <textarea name="description" id="description" rows="5" cols="33"/>
                    </div>   
                    <div>
                        <label> Point of Contact:</label>
                        <label>Name:</label>
                        <input type = "string" className = "personName"/>
                        <label>Phone:</label>
                        <input type = "string" className = "phone"/>
                        <label>Email:</label>
                        <input type = "string" className = "email"/>
                    </div>
                    <div>
                        <button className = "submit-button">Submit</button>
                    </div>

                </form>
            </div>

        )
    }


}

function makeText(e){
    alert("hi you clicked me");
}

export default Create_Project;