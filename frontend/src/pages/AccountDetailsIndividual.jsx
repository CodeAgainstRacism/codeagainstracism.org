import React, { Fragment, useEffect, useState } from "react";
import {
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
  const [newFields, setNewFields] = useState({
    'firstName': '',
    'lastName': '',
    'phoneNumber': '',
    'email': '',
  }); // state to store new details
  const [saveFields, setSaveFields] = useState(false);
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

  // Delete later
  useEffect(() => {
    console.log(newFields);
  }, [newFields])

  // Set changes to the state
  const getChange = (event) => {
    setNewFields({
      ...newFields,
      [event.target.id]: event.target.value
    });
  }

  // delete later
  useEffect(() => {
    console.log(saveFields);
  }, [saveFields])

  // Handle save passed to edit button
  // Make put requst by calling change detail function
  // Set save state back to false after put request
  // Might not even need a save state, will check later
  const handleSave = (event) => {
    setSaveFields(true);
    console.log(newFields);
    console.log("Making put request");
    changeDetail();       // make put request
    // handleCancel();    // clear newFields state, may not sync, may cause bugs so i'm leave it out for now
    setSaveFields(false); // set save back to false
  }

  // Handle chancel passed to edit button
  const handleCancel = () => {
    setNewFields({
      'firstName': '',
      'lastName': '',
      'phoneNumber': '',
      'email': '',
    });
  }

  const changeDetail = () => {
    axios
      .put(`${BACKEND_URL}users/${id}`, {
        firstName: newFields.firstName,
        lastName: newFields.lastName,
        phoneNumber: newFields.phoneNumber,
        email: newFields.email
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
            <Description id={"firstName"} title={"First Name"} desc={accountDetails.firstName} enableEdit={editFields} getChange={getChange}/>
            <Description id={"lastName"} title={"Last Name"} desc={accountDetails.lastName} enableEdit={editFields} getChange={getChange}/>
            <Description id={"phoneNumer"} title={"Phone Number"} desc={accountDetails.phoneNumber} enableEdit={editFields} getChange={getChange}/>
            <Description id={"email"} title={"Email"} desc={accountDetails.email} enableEdit={editFields} getChange={getChange}/>
            <Description id={"password"} title={"Password"} enableEdit={editFields}/>
            <Description id={"projectsCommitted"} title={"Projects Committed"} enableEdit={editFields}/>
            <Description id={"projectsCompleted"} title={"Projects Completed"} enableEdit={editFields}/>
            <EditButton enableEdit={editFields} setEditFields={setEditFields} handleSave={handleSave} handleCancel={handleCancel}/>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  )
};

export default AccountDetailsIndividual;
