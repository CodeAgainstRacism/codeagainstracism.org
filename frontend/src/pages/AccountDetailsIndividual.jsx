import React, { Fragment } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SideBar from "../components/SideBarIndividual";
import Description from "../components/Description";

const AccountDetailsStyle = makeStyles((theme) => ({
  dividerBar: {
    height: "2px",
    background: "#000000",
    flexGrow: 1,
  },
  headingContainer: {
    gridArea: "header",
    textAlign: "left",
    paddingBottom: "2%",
    paddingTop: "2%",
    fontSize: theme.spacing(4.5),
  },
  rightGridContainer: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  rightContainer: {
    paddingBottom: "5%",
    minHeight: "100vh",
  },
}));

const AccountDetailsIndividual = (props) => {
  const classes = AccountDetailsStyle();

  return (
    <Fragment>
      <Grid container>
        <Grid container item xs={2} alignItems="stretch">
          <SideBar />
        </Grid>
        <Grid container item xs={10} className={classes.rightGridContainer}>
          <Container className={classes.headingContainer}>
            Your Account
            <Box className={classes.dividerBar} />
          </Container>
          <Container className={classes.rightContainer}>
            {/* For Testing */}
            <Description type={"Name"} />
            <Description type={"Phone"} />
            <Description type={"Email"} />
            <Description type={"Password"} />
            <Description type={"Projects Committed"} />
            <Description type={"Projects Completed"} />
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  )
};

export default AccountDetailsIndividual;
