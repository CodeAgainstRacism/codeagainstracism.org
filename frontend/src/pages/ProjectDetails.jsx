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

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
  },
  headerStyle: {
    paddingTop: theme.spacing(3),
  },
  contentStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
  },
  detailStyle: {
    width: '50vw',
  },
  textStyle: {
    whiteSpace: 'pre-wrap', // for new lines
    margin: theme.spacing(2),
  }
}));

const ProjectDetails = (props) => {
  const classes = useStyles();
  const [projectDetails, setProjectDetails] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}projects/12`)
      .then(({ data }) => {
        setProjectDetails(data);
        setLoading(false);
        console.log(projectDetails);
      })
      .catch((err) => {
        console.log(`Error in fetching data: ${err.response.data.error}`);
      });
  }, []);

  console.log(projectDetails);

  // Wait until all data is fetched
  if(isLoading){
    return(null); // or return a loading image
  }

  return (
    <React.Fragment>
      <main>
        <Container maxWidth='lg' className={classes.outerContainer}>
          <Grid className={classes.headerStyle}>
            <LineOnSideHeader
              title={projectDetails.name}
              variant={'h3'}>
            </LineOnSideHeader>
          </Grid>
          <Grid className={classes.contentStyle}>
            {/* image component here */}
            <Grid className={classes.detailStyle}>
              <Grid item>
                <Typography className={classes.textStyle}>
                  Project Description: {'\n'}
                  {projectDetails.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textStyle}>
                  Organization Name: {projectDetails.organization.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textStyle}>
                  Who Are We looking for: {'\n'}
                  {/* Need value from backend */}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textStyle}>
                  Point of Contact: {'\n'}
                  Name - {projectDetails.organization.contactFirstName + ' ' +
                          projectDetails.organization.contactLastName + '\n'}
                  Email - {projectDetails.organization.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default ProjectDetails;
