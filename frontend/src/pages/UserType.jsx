import React, { useState } from "react";
import Plan from "../assets/plan.svg";
import Blogging from "../assets/blogging.svg";
import {Link as RouterLink } from "react-router-dom";
import classNames from "classnames";
import {
  Button,
  ButtonBase,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Radio,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexBoxCenter: {
    display: "flex",
    alignContent: "center",
    textAlign: "center"
  },
  headerStyle:{
    marginBottom: "5rem",
  },
  headerTextStyle: {
    marginTop: "5rem",
    fontWeight: "bold",
  },
  contentCenter: {
    display: "flex",
    justifyContent: "center",
  },
  textStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardStyle:{
    borderRadius: "4px",
    backgroundColor: "transparent",
    boxShadow: "none",
    width: "100%",
  },
  buttonStyle: {
    color: "white",
    backgroundColor: "black",
    width: "10rem",
    marginTop: "2rem",
  },
  radioStyle: {
    '&$checked': {
      color: "black",
    },
    '&:hover': {
      background: "none",
    }
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
  }
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
      <Grid item container className={classes.contentCenter}>
        <Grid item xs={12} sm={8} container direction="column">
          <Grid item className={classNames(classes.flexBoxCenter, classes.headerStyle)} direction="column">
            <Typography
              variant="h4"
              gutterBottom
              className={classNames(classes.textStyle, classes.headerTextStyle)}
            >
              Welcome to Code Against Racism
            </Typography>
            <Typography
              variant="h7"
              gutterBottom
            >
              We are so excited to see you join our teams of warriors!
            </Typography>
          </Grid>
          <Grid item container className={classes.spaceStyle}>
            <Grid item xs={12} sm={5} className={classes.widthStyle}>
              <CardActionArea className={classes.cardStyle}>
                <ButtonBase
                  focusRipple
                  onClick={handleJoin}
                  value="individual"
                  className={classes.flexColumn}
                >
                  <CardMedia
                    component="img"
                    image={Blogging}
                  />
                  <CardContent>
                    <Typography
                      variant="paragraph"
                      className={classes.textStyle}
                    >
                      I want to join an existing team
                    </Typography>
                    <Radio
                      className={classNames(classes.contentCenter, classes.radioStyle, classes.checked)}
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
            <Grid item xs={0} sm={2} />
            <Grid item xs={12} sm={5} className={classes.widthStyle}>
              <CardActionArea className={classes.cardStyle}>
                <ButtonBase
                  focusRipple
                  onClick={handleCreate}
                  value="organization"
                  className={classes.flexColumn}
                >
                  <CardMedia
                    component="img"
                    image={Plan}
                  />
                  <CardContent>
                    <Typography
                      variant="paragraph"
                      className={classes.textStyle}
                    >
                      I want to create a new team
                    </Typography>
                    <Radio
                      className={classNames(classes.contentCenter, classes.radioStyle, classes.checked)}
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
              to={selectedValue === "individual" ? "/signup/Individual" : "/signup/Organization"}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserTypePage;
