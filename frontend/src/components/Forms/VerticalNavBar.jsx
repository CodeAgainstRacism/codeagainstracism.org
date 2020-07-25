import React from "react";


export default class MyVert extends React.Component{
    render(){
        return(
            <div className = "vertCon">
                <div className = " username-container">
                    <div><img src={'avatar.png'}/> 
                         
                    </div>
                    <div>
                    <h3>Name</h3>
                    </div>
                </div>
                <label>────────────────</label>
                <h3>Your Projects</h3>
                <h3>Account Details</h3>
                <h3>Create Projects</h3>
            </div>
        )
    }
}