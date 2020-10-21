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
  const [editFields, setEditFields] = useState(0);
  const [fieldValues, setFieldValues] = useState([{
    firstName: '',
    lastName: '',
    phoneNumber: '',
    description: '',
    email: '',
  }]);
  const { id } = props.match.params;  // id of the user

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    axios
      .get(`${BACKEND_URL}/users/${id}`, {
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

  const putEdits = (data) => {
    const { firstName, lastName, description, phoneNumber, email} = data
    axios
      .put(`${BACKEND_URL}/users/${id}`,
        {
          "firstName": firstName !== "" ? firstName : accountDetails.firstName,
          "lastName": lastName !== "" ? lastName : accountDetails.lastName,
          "description": description !== "" ? description : accountDetails.description,
          "phoneNumber": phoneNumber !== "" ? phoneNumber : accountDetails.phoneNumber,
          "email": email !== "" ? email : accountDetails.email,
        })
      .then(response => {
        window.location.reload();
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const updateValues = ( id, value ) => {
    setFieldValues([{...fieldValues[0], [id]: value}]);
    console.log(fieldValues[0]);
  }

  const sendPut = () => {
    setEditFields(false);
    putEdits(fieldValues[0]);
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
            <Description id={"firstName"} title={"First Name"} desc={accountDetails.firstName} enableEdit={editFields} handleChange={updateValues}/>
            <Description id={"lastName"} title={"Last Name"} desc={accountDetails.lastName} enableEdit={editFields} handleChange={updateValues}/>
            <Description id={"description"} title={"Description"} desc={accountDetails.description} enableEdit={editFields} handleChange={updateValues}/>
            <Description id={"phoneNumber"} title={"Phone Number"} desc={accountDetails.phoneNumber} enableEdit={editFields} handleChange={updateValues}/>
            <Description id={"email"} title={"Email"} desc={accountDetails.email} enableEdit={editFields} handleChange={updateValues}/>
            <Description id={"password"} title={"Password"} enableEdit={editFields}/>
            <Description id={"projectsCommitted"} title={"Projects Committed"} enableEdit={editFields}/>
            <Description id={"projectsCompleted"} title={"Projects Completed"} enableEdit={editFields}/>
            <EditButton enableEdit={editFields} setEditFields={setEditFields} sendPut={sendPut}/>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  )
};

export default AccountDetailsIndividual;
