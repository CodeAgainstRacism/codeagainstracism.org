import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

// export default function NavBar() {
//   return (
//     <header className="navbar">
//       {/* <h1 className="nav__brand">Code Against Racism</h1> */}
//       <NavLink
//         to="/"
//         activeClassName="is-active"
//         exact={true}
//         className="nav__logo"
//       >
//         <h1>Code Against Racism</h1>
//       </NavLink>{" "}
//       <div className="nav__links">
//         {/*activeClassName is only going to get applied to the link when we're on that page. */}
//         <NavLink
//           to="/project/new"
//           activeClassName="is-active"
//           exact={true}
//           className="nav__item"
//         >
//           Create a New Project
//         </NavLink>
//         <NavLink
//           to="/organization/new"
//           activeClassName="is-active"
//           exact={true}
//           className="nav__item"
//         >
//           Create a New Organization
//         </NavLink>
//       </div>
//     </header>
//   );
// }
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
    backgroundColor: "#222831",
    color: "#ffffff",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
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
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function NavBar() {
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
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Logo
          </Typography>
          <nav>
            <Link
              variant="button"
              color="inherit"
              href="#"
              className={classes.link}
            >
              Sign up
            </Link>
          </nav>
          <Button
            href="#"
            color="secondary"
            variant="contained"
            className={classes.link}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
