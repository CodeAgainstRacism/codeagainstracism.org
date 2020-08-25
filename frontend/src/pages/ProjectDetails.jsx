import React, { useState, useEffect } from "react";
import { makeStyles, Container } from "@material-ui/core";
import LineOnSide_Header from "../components/LineOnSide_Header";
import axios from "axios";
import { BACKEND_URL } from "../config.js";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const ProjectDetails = (props) => {
  const classes = useStyles();
  const [projectDetails, setProjectDetails] = useState({});

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/projects/1`)
      .then(({ data }) => {
        if (data) {
          setProjectDetails(data);
          console.log(projectDetails);
        }
      })
      .catch((err) => {
        console.log(`Error in fetching data: ${err.response.data.error}`);
      });
  });

  return (
    <React.Fragment>
      <main>
        <Container maxWidth="lg" className={classes.outerContainer}>
          <LineOnSide_Header></LineOnSide_Header>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default ProjectDetails;
