import React,  { Fragment, useState, useEffect} from "react";
import {
  Button,
  makeStyles,
  Container,
  Grid,
  Box
} from "@material-ui/core";

import SideBar from "../components/SideBarOrganization";
import Description from "../components/Description";
import EditButton from "../components/EditButton";

import axios from "axios";
import { BACKEND_URL } from "../config";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  dividerBar: {
    height: "2px",
    background: "#000000",
    flexGrow: 1,
  },

  rightGridContainer: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },

  headingContainer: {
    gridArea: "header",
    textAlign: "center",
    paddingBottom: "2%",
    paddingTop: "2%",
    fontSize: theme.spacing(4.5),
  },

  rightContainer: {
    paddingBottom: "5%",
    minHeight: "100vh",
    backgroundColor:"white"
  },
}));

const AccountDetailsOrganization = (props) => {
const classes = styles();

const [orgDetails, setOrgDetails] = useState(0)
const [editFields, setEditFields ] = useState(0)
const [fieldValues, setFieldValues] = useState([{
  EIN: "",
  name: "",
  description: "",
  phoneNumber: "",
  email: ""
}])

const updateValues = (id,value) => {
  setFieldValues([{...fieldValues[0], [id]: value}])
  console.log(fieldValues[0])
}

const { id: org_id} = props.match.params;
const getDetails = () => {
  axios
    .get(`${BACKEND_URL}organizations/${org_id}`, {
      params: {},
    })
    .then(function (response) {
      console.log(response.data)
      setOrgDetails(response.data);
  
    })
    .catch(function (error) {
      console.log(error);
    });
}
 
const putEdits = (data) => {
  const { EIN, name, description, phoneNumber, email} = data
    axios
      .put(`${BACKEND_URL}organizations/${org_id}`,
        {
          "EIN": EIN != "" ? EIN : orgDetails.EIN,
          "name": name != "" ? name : orgDetails.name,
          "description": description != ""? description : orgDetails.description,
          "phoneNumber": phoneNumber !="" ? phoneNumber : orgDetails.phoneNumber,
          "email": email != "" ? email : orgDetails.email,
          "contactFirstName": orgDetails.contactFirstName,
          "contactLastName": orgDetails.contactLastName,
          "adminUserId": 2 //only 2 because i looked at the design doc and still don't know what this value is.. just left the default value here
          
        })
        .then( response => {
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
      
  
}

const sendPut = () => {
  setEditFields(false)
  putEdits(fieldValues[0]);
}

useEffect(getDetails, []);

    return (
    <Fragment>
      <Grid container id="row">
        <Grid container item xs={2} alignItems="stretch">
          <SideBar />
        </Grid>
        <Grid container item xs={10} className={classes.rightGridContainer}>
          <Container className={classes.headingContainer}>
            Account Details
            <Box className={classes.dividerBar} />
          </Container>
            <Container className={classes.rightContainer}>
              <Description id="name" title={"Organization Name:"} desc={orgDetails.name} enableEdit= {editFields} handleChange={updateValues}/>
              <Description id="EIN" title={"EIN:"} desc={orgDetails.EIN} enableEdit= {editFields} handleChange={updateValues}/>
              <Description id="description" title={"About:"} desc={orgDetails.description} enableEdit= {editFields} handleChange={updateValues}/>
              <Description id="phoneNumber" title={"Phone:"} desc={orgDetails.phoneNumber} enableEdit= {editFields} handleChange={updateValues}/>
              <Description id="email" title={"Email:"} desc={orgDetails.email} enableEdit= {editFields} handleChange={updateValues}/>
              <Description id="pw" title={"Password:"} desc={orgDetails.pw} enableEdit= {editFields} handleChange={updateValues}/>
              <Description title={"Projects Committed:"} desc={orgDetails.projects? orgDetails.projects.length:"0"}/>
              <Description title={"Projects Complete:"} desc={orgDetails.projects && orgDetails.projects.filter(p => p.isCompleted).length? orgDetails.projects.filter(p => p.isCompleted).length : "0" } updateValues={updateValues}/>
  
            <EditButton enableEdit={editFields} setEditFields={setEditFields} sendPut={sendPut}/>
          </Container>
          
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default AccountDetailsOrganization;