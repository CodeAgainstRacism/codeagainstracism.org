import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import LineOnSideHeader from '../components/LineOnSideHeader';
import axios from 'axios';
import { BACKEND_URL } from '../config.js';
import classNames from "classnames"

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
  },
  headerStyle: {
    paddingTop: theme.spacing(3),
  },
  titleStyle: {
    fontWeight: "bold",
  },
  contentStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
  },
  detailStyle: {
    width: '50vw',
  },
  projectTitle: {
    alignText: "center",
    display: "inline",
    padding: theme.spacing(0, 5),
    whiteSpace: "nowrap",
  },
  textStyle: {
    whiteSpace: 'pre-wrap', // for new lines
    margin: theme.spacing(2),
    fontSize: "1.3rem"
  },
  noneTextStyle: {
    fontStyle: 'italic'
  }
}));

const ProjectDetails = (props) => {
  const classes = useStyles();
  const [projectDetails, setProjectDetails] = useState();
  const { id } = props.match.params;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/projects/${id}`)
      .then(({ data }) => {
        console.log(data);
        setProjectDetails(data);
      })
      .catch((err) => {
        console.log(`Error in fetching data: ${err}`);
      });
  }, [id]);

  // Wait until all data is fetched
  if (projectDetails === undefined) {
    return (null); // or return a loading image
  }

  return (
    <React.Fragment>
      <main>
        <Container maxWidth='lg' className={classes.outerContainer}>
          <Grid className={classes.headerStyle}>
            <LineOnSideHeader
              title={projectDetails.name}
              className={classes.projectTitle}
              variant={'h4'}>
            </LineOnSideHeader>
          </Grid>
          <Grid className={classes.contentStyle}>
            {/* image component here */}
            <Grid className={classes.detailStyle}>
              <Grid item>
                <Typography className={classNames(classes.textStyle, classes.titleStyle)}>
                  Project Description: {'\n'}
                </Typography>
                <Typography className={classes.textStyle} >
                  {projectDetails.description && projectDetails.description}
                </Typography>
              </Grid>
              <Grid item>
                <span className={classNames(classes.textStyle, classes.titleStyle)}>
                  Organization Name:
                </span>
                <span className={classes.textStyle} >
                  {projectDetails.organization && projectDetails.organization.name}
                </span>
              </Grid>
              <Grid item>
                <Typography className={classNames(classes.textStyle, classes.titleStyle)}>
                  Who Are We looking for: {'\n'}
                  {/* Need field from backend */}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classNames(classes.textStyle, classes.titleStyle)}>
                  Point of Contact: {'\n'}
                </Typography>
                <Typography className={classes.textStyle}>
                  Name -  {projectDetails.organization && projectDetails.organization.contactFirstName}
                </Typography>
                <Typography className={classes.textStyle}>
                  Email - {projectDetails.organization && projectDetails.organization.email}
                </Typography>
              </Grid>
            </Grid>
            {/* If user is logged in, project details will show a list of member in their projects. */}


            { /* if logged in user is organization, show a field to add new member by email to the project */}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default ProjectDetails;
