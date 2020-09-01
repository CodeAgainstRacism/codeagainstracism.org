import React from "react";
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
                  to="/news"
                  color="inherit"
                  underline="none"
                >
                  NEWS
                </Link>
              </ListItemText>
              <ListItemText inset>
                <Link
                  variant="subtitle2"
                  component={RouterLink}
                  to="/faq"
                  color="inherit"
                  underline="none"
                >
                  FAQ
                </Link>
              </ListItemText>
            </ListItem>
          </List>
          <Box className={classes.toolbarRight}>
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

export default compose(withRouter, connect(mapStateToProps))(NavBar);
