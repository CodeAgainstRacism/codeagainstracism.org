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
  },
}));

const AccountDetailsOrganization = (props) => {
const classes = styles();

const [orgDetails, setOrgDetails] = useState(0)
const [editFields, setEditFields ] = useState(0)
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
            <Container style={{backgroundColor:"white", textAlign:"right"}}>
              <Description id="name" title={"Organization Name:"} desc={orgDetails.name} enableEdit= {editFields}/>
              <Description id="EIN" title={"EIN:"} desc={orgDetails.EIN} enableEdit= {editFields}/>
              <Description id="description" title={"About:"} desc={orgDetails.description} enableEdit= {editFields}/>
              <Description id="phoneNumber" title={"Phone:"} desc={orgDetails.phoneNumber} enableEdit= {editFields}/>
              <Description id="email" title={"Email:"} desc={orgDetails.email} enableEdit= {editFields}/>
              <Description id="pw" title={"Password:"} desc={orgDetails.pw} enableEdit= {editFields}/>
              <Description title={"Projects Committed:"} desc={orgDetails.projects? orgDetails.projects.length:"0"}/>
              <Description title={"Projects Complete:"} desc={orgDetails.projects && orgDetails.projects.filter(p => p.isCompleted).length? orgDetails.projects.filter(p => p.isCompleted).length : "0"}/>
            </Container>
            <Grid container direction="row" justify="flex-end">
            {editFields? <Button 
                style={{margin: "1em 1em"}} 
                variant="contained" 
                color={"default"}
                onClick={() => (setEditFields(false))}
                hidden={!editFields}
              >
                  cancel
              </Button>: ``}
              <Button 
                style={{margin: "1em 0"}} 
                variant="contained" 
                color={editFields? "secondary":"primary"}
                onClick={() => (editFields? setEditFields(false): setEditFields(true))}
              >
                  {editFields? `save`:`edit`}
              </Button>
            </Grid>
          </Container>
          
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default AccountDetailsOrganization;