import React from "react";
import { makeStyles } from "@material-ui/styles";
import {Container} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FolderIcon from '@material-ui/icons/Folder';
import CreateIcon from '@material-ui/icons/Create';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';

//use styling hook here to align name and png next to each other
const sideBarStyles = makeStyles((theme)  => ({
    sideBarContainer: {
        width: "90%",
        height: "120vh",
        paddingTop: "15%",
        //height: "768px",
        //textAlign: "left",
        alignItems: "center",
        backgroundColor: "#ffffff"  
    },
}));


export default function SideBar(){
   const classes = sideBarStyles();
    return(

        <Container disableGutters = {true} className = {classes.sideBarContainer}>
            <Container>
                {/*<img src = {"avatar.png"}/> */}
                <PersonIcon fontSize="large" />
                <h3>Code Against Racism of the United States of Americas</h3>
            </Container>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary = "Account Details" />
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <CreateIcon />
                    </ListItemIcon>
                    <ListItemText primary = "Create Project" />
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary = "Your Projects" />
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary = "Your Teams" />
                </ListItem>  
                <Divider/>
            </List>
        </Container>
    )
}
