import React,  { Fragment, useState, useEffect} from "react";
import {
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
const { id: org_id} = props.match.params;

  useEffect(() => {
    getDetails();
  }, []);

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
          <Container style={{backgroundColor:"white", padding:"1em", textAlign:"right"}}>
            <p onClick={() => {this.setState();}}>| Edit |</p>
            <Container className={classes.rightContainer}>
              <Description title={"Organization Name:"} desc={orgDetails.name}/>
              <Description title={"EIN:"} desc={orgDetails.EIN}/>
              <Description title={"About:"} desc={orgDetails.description}/>
              <Description title={"Phone:"} desc={orgDetails.phoneNumber}/>
              <Description title={"Email:"} desc={orgDetails.email}/>
              <Description title={"Password:"} desc={orgDetails.pw}/>
              <Description title={"Projects Committed:"} desc={orgDetails.projects? orgDetails.projects.length:"0"}/>
              <Description title={"Projects Complete:"} desc={orgDetails.projects && orgDetails.projects.filter(p => p.isCompleted).length? orgDetails.projects.filter(p => p.isCompleted).length : "0"}/>
            </Container>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default AccountDetailsOrganization;