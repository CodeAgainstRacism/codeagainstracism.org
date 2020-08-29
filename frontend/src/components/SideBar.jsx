import React from "react";
import { makeStyles } from "@material-ui/core";
import {Container} from "@material-ui/core";

const sideBarStyles = makeStyles((theme)  => ({
    sideBarContainer: {
        width: "17%",
        height: "120vh",
        textAlign: "center",
        backgroundColor: "#323b4a",
        color: theme.palette.text.secondary
    },
}));

const sideBar = (props) => {
    const classes = sideBarStyles();
    return (
        <div>
            <Container disableGutters = {true} className = {classes.sideBarContainer}>
                {props.children}
            </Container>
        </div>
    )
}

export default sideBar
