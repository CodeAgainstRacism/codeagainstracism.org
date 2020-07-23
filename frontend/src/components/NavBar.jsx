import React from "react";
import { withRouter, Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

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
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
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
            <Link variant="subtitle1" component={RouterLink} to="/">
              Logo
            </Link>
          </IconButton>
          <List>
            <ListItem component="div">
              <ListItemText inset>
                <Link
                  variant="subtitle1"
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
                  variant="subtitle1"
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
                  variant="subtitle1"
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
                  variant="subtitle1"
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
              color="inherit"
              underline="none"
              component={RouterLink}
              to="/login"
              className={classes.rightButton}
            >
              LOGIN
            </Link>

            <Button
              href="#"
              color="secondary"
              variant="contained"
              className={classes.rightButton}
              component={RouterLink}
              to="/signup"
            >
              SIGN UP
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withRouter(NavBar);
