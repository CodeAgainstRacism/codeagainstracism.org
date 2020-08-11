import React, { useState } from "react";
import Plan from "../assets/plan.svg";
import Blogging from "../assets/blogging.svg";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import { withRouter, Link as RouterLink } from "react-router-dom";

import CardActionArea from "@material-ui/core/CardActionArea";
import classNames from "classnames";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  flexBoxCenter: {
    display: "flex",
    alignContent: "center",
    textAlign: "center",
  },
  headerStyle: {
    marginBottom: "3rem",
  },
  headerTextStyle: {
    marginTop: "2rem",
    fontWeight: "bold",
  },
  contentCenter: {
    display: "flex",
    justifyContent: "center",
    background: theme.palette.background.paper,
    marginTop: theme.spacing(1),
    borderRadius: "3%",
  },
  textStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardStyle: {
    borderRadius: "25px",
    backgroundColor: "transparent",
    boxShadow: "none",
    width: "100%",
    padding: theme.spacing(0, 5),
  },
  buttonStyle: {
    color: "white",
    backgroundColor: "black",
    width: "10rem",
    marginTop: "2rem",
  },
  radioStyle: {
    "&$checked": {
      color: "black",
    },
    "&:hover": {
      background: "none",
    },
  },
  checked: {},
  temp: {
    display: "flex",
    flexWrap: "wrap",
  },
  flexColumn: {
    flexDirection: "column",
    width: "100%",
  },
  widthStyle: {
    width: "calc(50% - 30px)",
  },
  spaceStyle: {
    justifyContent: "space-between",
  },
}));

const UserTypePage = () => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState("");

  const handleJoin = (event) => {
    setSelectedValue("individual");
  };

  const handleCreate = (event) => {
    setSelectedValue("organization");
  };

  return (
    <Container maxWidth="lg" direction="column">
      <Grid container className={classes.contentCenter}>
        <Grid item xs={12} direction="column">
          <Typography
            variant="h3"
            gutterBottom
            className={classNames(classes.textStyle, classes.headerTextStyle)}
            align="center"
          >
            Welcome to Code Against Racism
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            We are so excited to see you join our teams of warriors!
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Please choose one of these options
          </Typography>
        </Grid>
        <Grid item container className={classes.spaceStyle}>
          <Grid item xs={6} className={classes.widthStyle}>
            <CardActionArea className={classes.cardStyle}>
              <ButtonBase
                focusRipple
                onClick={handleJoin}
                value="individual"
                className={classes.flexColumn}
              >
                <CardMedia component="img" image={Blogging} />
                <CardContent>
                  <Typography variant="body1" className={classes.textStyle}>
                    I want to join an existing team
                  </Typography>
                  <Radio
                    className={classNames(
                      classes.contentCenter,
                      classes.radioStyle,
                      classes.checked
                    )}
                    disableRipple="True"
                    checked={selectedValue === "individual"}
                    onChange={handleJoin}
                    value="individual"
                    inputProps={{ "aria-label": "individual" }}
                  />
                </CardContent>
              </ButtonBase>
            </CardActionArea>
          </Grid>
          <Grid item xs={6} className={classes.widthStyle}>
            <CardActionArea className={classes.cardStyle}>
              <ButtonBase
                focusRipple
                onClick={handleCreate}
                value="organization"
                className={classes.flexColumn}
              >
                <CardMedia component="img" image={Plan} />
                <CardContent>
                  <Typography variant="body1" className={classes.textStyle}>
                    I want to create a new team
                  </Typography>
                  <Radio
                    className={classNames(
                      classes.contentCenter,
                      classes.radioStyle,
                      classes.checked
                    )}
                    disableRipple="True"
                    checked={selectedValue === "organization"}
                    onChange={handleCreate}
                    value="organization"
                    inputProps={{ "aria-label": "organization" }}
                  />
                </CardContent>
              </ButtonBase>
            </CardActionArea>
          </Grid>
        </Grid>
        <Grid item className={classes.contentCenter}>
          <Button
            variant="contained"
            className={classes.buttonStyle}
            disabled={!selectedValue}
            component={RouterLink}
            to={
              selectedValue === "individual"
                ? "/signup/Individual"
                : "/signup/Organization"
            }
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserTypePage;
