import React, { useState } from "react";
import Plan from "../assets/plan.svg";
import Blogging from "../assets/blogging.svg";
import { Link as RouterLink } from "react-router-dom";
import classNames from "classnames";
import {
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Radio,
  makeStyles,
  useTheme,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexCenter: {
    display: "flex",
    justifyContent: "center",
  },
  headerTextStyle: {
    margin: theme.spacing(2, 0, 1, 0),
    fontWeight: "bold",
  },
  contentCenter: {
    display: "flex",
    justifyContent: "center",
    background: theme.palette.background.paper,
    marginTop: theme.spacing(5),
    borderRadius: theme.spacing(3),
  },
  cardStyle: {
    borderRadius: theme.spacing(0.5),
    backgroundColor: "transparent",
    boxShadow: "none",
    width: "100%",
  },
  cardContent: {
    height: "50vh",
  },
  buttonStyle: {
    color: "white",
    backgroundColor: "black",
    fontWeight: "bold",
    fontSize: theme.spacing(2),
    textAlgin: "center",
    letterSpacing: theme.spacing(0.5),
    width: theme.spacing(20),
    margin: theme.spacing(0, 0, 2),
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
  image: {
    height: "30vh",
    objectFit: "fill",
    maxHeight: "100%",
    maxWidth: "100%",
    marginBottom: theme.spacing(3),
  },
}));

const UserTypePage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState("");

  const handleJoin = (event) => {
    setSelectedValue("individual");
  };

  const handleCreate = (event) => {
    setSelectedValue("organization");
  };

  return (
    <Container maxWidth="md" direction="column">
      <Grid container className={classes.contentCenter} spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            className={classes.headerTextStyle}
            align="center"
          >
            Welcome to Code Against Racism
          </Typography>
          <Typography variant="body1" align="center">
            We are so excited to see you join our teams of warriors!
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Please choose one of these options
          </Typography>
        </Grid>

        <Grid item xs={5}>
          <CardActionArea className={classes.cardStyle} onClick={handleJoin}>
            <CardContent className={classes.cardContent}>
              <CardMedia
                className={classes.image}
                title="Blogging"
                image={Blogging}
              />
              <Typography variant="h6" align="center">
                I want to join an existing team
              </Typography>
              <Radio
                className={classNames(
                  classes.flexCenter,
                  classes.radioStyle,
                  classes.checked
                )}
                disableRipple={true}
                checked={selectedValue === "individual"}
                value="individual"
                inputProps={{ "aria-label": "individual" }}
              />
            </CardContent>
          </CardActionArea>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <CardActionArea className={classes.cardStyle} onClick={handleCreate}>
            <CardContent className={classes.cardContent}>
              <CardMedia
                className={classes.image}
                title="Planning"
                style={{ marginBottom: theme.spacing(3) }}
                image={Plan}
              />
              <Typography variant="h6" align="center">
                I want to create a new team
              </Typography>
              <Radio
                className={classNames(
                  classes.flexCenter,
                  classes.radioStyle,
                  classes.checked
                )}
                disableRipple={true}
                checked={selectedValue === "organization"}
                value="organization"
                inputProps={{ "aria-label": "organization" }}
              />
            </CardContent>
          </CardActionArea>
        </Grid>

        <Button
          variant="contained"
          className={classes.buttonStyle}
          disabled={!selectedValue}
          component={RouterLink}
          to={
            selectedValue === "individual"
              ? "/signup/individual"
              : "/signup/organization"
          }
        >
          Next
        </Button>
      </Grid>
    </Container>
  );
};

export default UserTypePage;
