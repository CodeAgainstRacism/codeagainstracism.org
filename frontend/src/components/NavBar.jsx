import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
  link: {
    margin: theme.spacing(1, 1.5),
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
  const { history } = props;
  const classes = useStyles();

  const changeRoute = (pageURL) => {
    history.push(pageURL);
  };

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
          <Link variant="title" onClick={() => changeRoute("/")}>
            <Typography variant="h6" color="inherit" noWrap>
              Logo
            </Typography>
          </Link>
          <List>
            <ListItem component="div">
              <ListItemText inset>
                <Link
                  variant="title"
                  onClick={() => changeRoute("/about")}
                  color="inherit"
                  underline="none"
                >
                  <Typography color="inherit" variant="title">
                    ABOUT
                  </Typography>
                </Link>
              </ListItemText>
              <ListItemText inset>
                <Link
                  variant="title"
                  onClick={() => changeRoute("/projects")}
                  color="inherit"
                  underline="none"
                >
                  <Typography color="inherit" variant="title">
                    PROJECTS
                  </Typography>
                </Link>
              </ListItemText>
              <ListItemText inset>
                <Link
                  variant="title"
                  onClick={() => changeRoute("/news")}
                  color="inherit"
                  underline="none"
                >
                  <Typography color="inherit" variant="title">
                    NEWS
                  </Typography>
                </Link>
              </ListItemText>
              <ListItemText inset>
                <Link
                  variant="title"
                  onClick={() => changeRoute("/faq")}
                  color="inherit"
                  underline="none"
                >
                  <Typography color="inherit" variant="title">
                    FAQ
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
          </List>
          <Box className={classes.toolbarRight}>
            <Link
              variant="button"
              color="inherit"
              underline="none"
              onClick={() => changeRoute("/signup")}
              href="#"
              className={classes.link}
            >
              <Typography color="inherit" variant="title">
                LOGIN
              </Typography>
            </Link>

            <Button
              href="#"
              color="secondary"
              variant="contained"
              className={classes.link}
              onClick={() => changeRoute("/login")}
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
