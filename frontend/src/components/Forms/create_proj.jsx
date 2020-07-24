import React from "react"

class Create_Project extends React.Component{
    render(){
        return (
            <div>
                <form className="form-container">
                    <div>
                        <h1>Create Project</h1>
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
                        <input type = "checkbox"/> <label>HTML/CSS </label>
                        <input type = "checkbox"/> <label>Javascript </label>
                        <input type = "checkbox"/> <label>Typescript</label>
                        <input type = "checkbox"/> <label>C</label> 
                        <input type = "checkbox"/> <label>C++</label>
                        <input type = "checkbox"/> <label>Java</label>
                        <input type = "checkbox"/> <label>Python</label>
                        <input type = "checkbox"/> <label>C#</label> 
                        <input type = "checkbox"/> <label>R</label> 
                        <input type = "checkbox"/> <label>PHP</label> 
                        <input type = "checkbox"/> <label>Swift</label>
                        <input type = "checkbox"/> <label>Objective-C</label>
                        <input type = "checkbox"/> <label>SQL</label> 
                        <input type = "checkbox"/> <label>Go</label> 
                        <input type = "checkbox"/> <label>Ruby</label>
                        <input type = "checkbox"/> <label>Shell</label>   
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