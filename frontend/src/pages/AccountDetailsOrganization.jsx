import React, { Fragment } from "react";
import {
  makeStyles,
  Container,
  Grid,
  Box
} from "@material-ui/core";

import SideBar from "../components/SideBarOrganization";
import Description from "../components/Description";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
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

//example organization
const orgSample = {
    id:1,
    EIN:"00-3456789",
    name:"Apple",
    description:"Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Tech technology companies, alongside Amazon, Google, Microsoft, and Facebook.",
    phoneNumber:"(718) 220-4041",
    email:"apple@email.com",
    contactFirstName:"Steve",
    contactLastName:"Jobs",
    createdAt:"2020-10-04T23:45:33.450Z",
    updatedAt:"2020-10-04T23:45:33.450Z"
}
const {
    id,
    name,
    EIN,
    description,
    phoneNumber,
    email,
    pw,
    projectsCommit,
    projectsComplete
} = orgSample; //change to props
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
            <Description title={"Organization Name:"} desc={name}/>
            <Description title={"EIN:"} desc={EIN}/>
            <Description title={"About:"} desc={description}/>
            <Description title={"Phone:"} desc={phoneNumber}/>
            <Description title={"Email:"} desc={email}/>
            <Description title={"Password:"} desc={pw}/>
            <Description title={"Projects Committed:"} desc={projectsCommit}/>
            <Description title={"Projects Complete:"} desc={projectsComplete}/>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default AccountDetailsOrganization;