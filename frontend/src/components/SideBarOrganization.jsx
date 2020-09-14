import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
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
//change links for after user type is merged so you dont have a merge conflict with app js
const sideBarStyles = makeStyles((theme)  => ({
    sideBarContainer: {
        width: "100%",
        height: "100%",
        //height: "120vh",
        //paddingTop: "15%",
        alignItems: "center",
        backgroundColor: "#2b3340",
        color: theme.palette.text.secondary
    },
}));


export default function SideBar(){
   const classes = sideBarStyles();
    return(

        <Container disableGutters = {true} className = {classes.sideBarContainer}>
            <Container>
                {/*<img src = {"avatar.png"}/> */}
                <PersonIcon fontSize="large" />
                <h3>Code Against Racism</h3>
            </Container>
            <List>
                <Divider/>
                <ListItem button
                    component={RouterLink}
                    to="/about">
                    <ListItemIcon>
                        <AccountBoxIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary = "Account Details" />

                </ListItem>
                <Divider/>
                <ListItem button
                    component={RouterLink}
                    to="/about">
                    <ListItemIcon>
                        <CreateIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary = "Create Project" />
                </ListItem>
                <Divider/>
                <ListItem button
                    component={RouterLink}
                    to="/about">
                    <ListItemIcon>
                        <FolderIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary = "Your Projects" />
                </ListItem>
                <Divider/>
                <ListItem button
                    component={RouterLink}
                    to="/about">
                    <ListItemIcon>
                        <GroupIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary = "Your Teams" />
                </ListItem>  
                <Divider/>
            </List>
        </Container>
    )
}
