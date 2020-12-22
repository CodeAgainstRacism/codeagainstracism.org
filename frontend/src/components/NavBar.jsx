import React, { Fragment } from "react";
import { compose } from "redux";
import { withRouter, Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux-store/actions/auth";
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

const NavBar = (props) => {
  const classes = useStyles();

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
              to={!props.currentUser.isAuthenticated ? "/" : "/yourprojects"}
              underline="none"
            >
              Logo
            </Link>
          </IconButton>
          <PublicRoutes />
          {!props.currentUser.isAuthenticated ?
            (
              <Box className={classes.toolbarRight}>
                <div>
                  <Link
                    variant="subtitle1"
                    component={RouterLink}
                    to="/login"
                    color="inherit"
                    className={classes.rightButton}
                    underline="none"
                  >
                    LOGIN
                  </Link>

                  <Button
                    component={RouterLink}
                    to="/signup"
                    color="secondary"
                    variant="contained"
                    className={classes.rightButton}
                    underline="none"
                  >
                    SIGN UP
                  </Button>
                </div>
              </Box>
            ) : (
              < Box className={classes.toolbarRight}>
                <Button
                  component={RouterLink}
                  to="/"
                  onClick={logout}
                  color="secondary"
                  variant="contained"
                  className={classes.rightButton}
                  underline="none"
                >
                  LOG OUT
                </Button>
              </Box>
            )
          }
        </Toolbar>
      </AppBar>
    </React.Fragment >
  );
};

const PublicRoutes = () => {
  const classes = useStyles();
  return (

    <Fragment>
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
              ALL PROJECTS
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
    </Fragment>
  )
}




const mapStateToProps = (storeState) => {
  return {
    currentUser: storeState.currentUser,
  };
};

export default compose(withRouter, connect(mapStateToProps, logout))(NavBar);
