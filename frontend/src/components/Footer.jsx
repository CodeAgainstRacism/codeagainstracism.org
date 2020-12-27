import React from "react";
import { makeStyles, AppBar, Typography, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: theme.navbar.default,
    color: theme.palette.text.secondary,
    // padding: theme.spacing(2),
    position: "fixed",
    bottom: 0,
  },
  offset: theme.mixins.toolbar,
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar className={classes.footer}>
        <Toolbar>
          <Typography
            variant="body2"
            style={{ width: "100%" }}
            color="textSecondary"
            align="center"
          >
            {"Copyright © Code Against Racism. All Rights Reserved "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  );
};

export default Footer;
