import React from "react";
import { withRouter, Link as RouterLink } from "react-router-dom";
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
    backgroundColor: theme.navbar.default,
    color: theme.palette.text.secondary,
  },
  toolbar: {
    display: "flex",
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
                >
                  FAQ
                </Link>
              </ListItemText>
            </ListItem>
          </List>
          <Box className={classes.toolbarRight}>
            <Link
              variant="subtitle1"
              variant="subtitle2"
              component={RouterLink}
              to="/login"
              color="inherit"
              className={classes.rightButton}
            >
              LOGIN
            </Link>

            <Button
              href="#"
              color="secondary"
              variant="contained"
              className={classes.rightButton}
            >
              <Link
                variant="subtitle2"
                component={RouterLink}
                to="/userType"
                color="textPrimary"
              >
                SIGN UP
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withRouter(NavBar);
