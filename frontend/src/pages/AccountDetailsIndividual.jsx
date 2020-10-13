import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { BACKEND_URL } from "../config";
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
    backgroundColor: "white",
  },
  rightContainer: {
    paddingBottom: "5%",
    minHeight: "100vh",
  },
}));


const AccountDetailsIndividual = (props) => {
  const classes = AccountDetailsStyle();
  const [accountDetails, setAccountDetails] = useState(0);
  const { id } = props.match.params;  // id of the user

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    axios
      .get(`${BACKEND_URL}users/${id}`, {
        params: {},
      })
      .then(function (response) {
        console.log(response.data)
        setAccountDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const changeDetail = (event) => {
    axios
      .post(`${BACKEND_URL}users/${id}`, {
        email: event.target.value,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Fragment>
      <Grid container>
        <Grid container item xs={2} alignItems="stretch">
          <SideBar />
        </Grid>
        <Grid container item xs={10} className={classes.rightGridContainer}>
          <Container className={classes.headingContainer}>
            Account Details
            <Box className={classes.dividerBar} />
          </Container>
          <Container className={classes.rightContainer}>
            <Description title={"Name"} desc={accountDetails.firstName + ' ' + accountDetails.lastName} />
            <Description title={"Phone Number"} desc={accountDetails.phoneNumber} />
            <Description title={"Email"} desc={accountDetails.email} />
            <Description title={"Password"} />
            <Description title={"Projects Committed"} />
            <Description title={"Projects Completed"} />
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  )
};

export default AccountDetailsIndividual;
