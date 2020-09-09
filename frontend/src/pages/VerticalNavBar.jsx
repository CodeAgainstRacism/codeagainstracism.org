import React from "react";
import { makeStyles } from "@material-ui/styles";
import {Container} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
//maybe use chips for styling
//use styling hook here to align name and png next to each other
const sideBarStyles = makeStyles((theme)  => ({
    sideBarContainer: {
        width: "15rem",
        //height: "768px",
        textAlign: "center",
        backgroundColor: "white"  
    }
}));


export default function SideBar(){
   const classes = sideBarStyles();
    return(
        <Container className = {classes.sideBarContainer}>
            
                <div>
                <img src={'avatar.png'}/> 
                <h3>Name</h3>
                </div>
                    
           
            <Divider variant="fullwidth"/>
            <h3>Your Projects</h3>
            <Divider variant="fullwidth"/>
            <h3>Account Details</h3>
            <Divider variant="fullwidth"/>
            <h3>Create Projects</h3>
        </Container>
    )
}
