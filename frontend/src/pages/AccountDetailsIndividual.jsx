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
import EditButton from "../components/EditButton";

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
  const [newDetails, setNewFields] = useState(0); // state to store new details 
  const [editFields, setEditFields] = useState(0);
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

  // idea: when save button is triggered, call this function
  const changeDetail = (event) => {
    axios
      .post(`${BACKEND_URL}users/${id}`, {
        // email: event.target.value,
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
            <Description title={"First Name"} desc={accountDetails.firstName} enableEdit={editFields}/>
            <Description title={"Last Name"} desc={accountDetails.lastName} enableEdit={editFields}/>
            <Description title={"Phone Number"} desc={accountDetails.phoneNumber} enableEdit={editFields}/>
            <Description title={"Email"} desc={accountDetails.email} enableEdit={editFields}/>
            <Description title={"Password"} enableEdit={editFields}/>
            <Description title={"Projects Committed"} enableEdit={editFields}/>
            <Description title={"Projects Completed"} enableEdit={editFields}/>
            <EditButton enableEdit={editFields} setEditFields={setEditFields}/>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  )
};

export default AccountDetailsIndividual;
