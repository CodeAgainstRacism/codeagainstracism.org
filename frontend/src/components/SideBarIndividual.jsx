import React from "react";
import { makeStyles } from "@material-ui/core";
import {Container} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FolderIcon from '@material-ui/icons/Folder';
import PersonIcon from '@material-ui/icons/Person';

//use styling hook here to align name and png next to each other
//change links for after user type is merged so you dont have a merge conflict with app js

const sideBarStyles = makeStyles((theme)  => ({
    sideBarContainer: {
        width: "90%",
        height: "120vh",
        paddingTop: "15%",
        alignItems: "center",
        backgroundColor: "#323b4a",
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
                <h3>Zoosuki Chisaki</h3>
            </Container>
            <List>
                <Divider/>
                <ListItem button
                    component={RouterLink}
                    to="/account_details">
                    <ListItemIcon>
                        <AccountBoxIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary = "Account Details" />
                </ListItem>
                <Divider/>
                <ListItem button
                    component={RouterLink}
                    to="/your_projects">
                    <ListItemIcon>
                        <FolderIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary = "Your Projects" />
                </ListItem>
                <Divider/>
            </List>
        </Container>
    )
}
