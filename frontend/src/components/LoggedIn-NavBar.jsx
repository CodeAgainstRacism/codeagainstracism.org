import React from "react";
import { logout } from "../redux-store/actions/auth";
import { compose } from "redux";
import { withRouter, Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  makeStyles,
  AppBar,
  Button,
  IconButton,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Link,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: theme.navbar.default,
    color: theme.palette.text.secondary,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  toolbarRight: {
    justifyContent: "right",
    marginLeft: "auto",
  },
  rightButton: {
    margin: theme.spacing(1, 3),
  },
}));

const LoggedInNavBar = (props) => {
  const classes = useStyles();
  const logout = (event) => {
    event.preventDefault();
    props.logout();    // the logout we imported from store/action/auth.js, and passed into <Navbar /> by mapStateToProps() underneath
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton>
            <Link
              color="primary"
              variant="subtitle2"
              component={RouterLink}
              to="/"
              underline="none"
            >
              Logo
            </Link>
          </IconButton>
          <List>
            <ListItem component="div">
              <ListItemText inset>
                <Link
                  variant="subtitle2"
                  component={RouterLink}
                  to="/about"
                  color="inherit"
                  underline="none"
                >
                  ABOUT
                </Link>
              </ListItemText>
              <ListItemText inset>
                <Link
                  variant="subtitle2"
                  component={RouterLink}
                  to="/projects"
                  color="inherit"
                  underline="none"
                >
                  PROJECTS
                </Link>
              </ListItemText>
              <ListItemText inset>
                <Link
                  variant="subtitle2"
                  component={RouterLink}
                  to="/contactus"
                  color="inherit"
                  underline="none"
                >
                  CONTACT US
                </Link>
              </ListItemText>
            </ListItem>
          </List>
          <Box className={classes.toolbarRight}>
            <Button
              color="secondary"
              variant="contained"
              className={classes.rightButton}
              underline="none"
              onClick={logout}
            >
              LOGOUT
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

const mapStateToProps = (storeState) => {
  return {
    currentUser: storeState.currentUser,
  };
};

export default compose(withRouter, connect(mapStateToProps, { logout }))(LoggedInNavBar);
