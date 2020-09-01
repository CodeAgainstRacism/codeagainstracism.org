import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {Container} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FolderIcon from '@material-ui/icons/Folder';
import PersonIcon from '@material-ui/icons/Person';
import SideBar from './SideBar';

//use styling hook here to align name and png next to each other
//change links for after user type is merged so you dont have a merge conflict with app js
const styles = makeStyles((theme) => ({
    listItemText:{
        fontSize: theme.spacing(1.95),
    }
}))

export default function SideBarIndividual(){
    return(
        <SideBar>
            <Container>
                <PersonIcon fontSize="large" />
                <h3>John Doe</h3>
            </Container>
            <List>
                <Divider/>
                <ListItem button
                    component={RouterLink}
                    to="/account_details">
                    <ListItemIcon>
                        <AccountBoxIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary = "Account Details" />
                </ListItem>
                <Divider/>
                <ListItem button
                    component={RouterLink}
                    to="/your_projects">
                    <ListItemIcon>
                        <FolderIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText  classes={{primary:classes.listItemText}} primary = "Your Projects" />
                </ListItem>
                <Divider/>
            </List>
        </SideBar>
    )
}
