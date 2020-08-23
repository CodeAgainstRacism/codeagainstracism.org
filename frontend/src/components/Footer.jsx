import React from "react";
import { makeStyles, AppBar, Typography, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.navbar.default,
    color: theme.palette.text.secondary,
    top: "auto",
    bottom: 0,
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
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
  );
};

export default Footer;
