import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {Container,
        CssBaseline,
        Grid,
        Box,
        AppBar,
      Tabs,
    Tab} from '@material-ui/core';

//backend connection stuff
import axios from 'axios';
import { BACKEND_URL } from '../config';
import SideBar from "../components/SideBarOrganization";
import ProjectCard from "../components/ProjectCard";
const YourProjectsStyles = makeStyles((theme) => ({

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

  headingContainer: {
    gridArea: "header",
    textAlign: "center",
    paddingBottom: "2%",
    paddingTop: "2%",
    fontSize : theme.spacing(4.5),
    width: "95%"
  },

  rightContainer: {
    backgroundColor: "white",
    paddingBottom: "5%",
    width: "95%",
    minHeight: "100vh"
  },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function YourProjects () { 
  
  //connect to backend stuff
  const [projectsComplete, setProjectsComplete] = useState([]);
  const [projectsIncomplete, setProjectsIncomplete] = useState([]);
  
  axios.get(`${BACKEND_URL}projects/incomplete`, {
    params: {}
  })
  .then(function (response) {
    setProjectsIncomplete(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  
  //if use state is 1
  axios.get(`${BACKEND_URL}projects/complete`, {
    params: {}
  })
  .then(function (response) {
    setProjectsComplete(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  const cardListIncomplete = projectsIncomplete;
  const cardListComplete = projectsComplete;

  //design tab stuff
  const classes = YourProjectsStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

    return (
      <Fragment>
        <CssBaseline />
        <Grid container spacing = {0} id = "row">
          <Grid container item xs = {3} alignItems="stretch">
              <SideBar/>
          </Grid>
          <Grid item xs = {8}>
          <Container className = {classes.headingContainer}> 
              Your Projects
              <Box className = {classes.dividerBar}></Box>
          </Container>
          <Container disableGutters = {true} className = {classes.rightContainer}>
              <AppBar position = "static" style ={{boxShadow: "none"}}>
                <Tabs value={value} onChange={handleChange} >
                  <Tab label="In Progress" {...a11yProps(0)} />
                  <Tab label="Completed" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Grid container spacing = {3} direction = "row">
                  {cardListIncomplete.map((data, key) => {
                    return (
                      <Grid item xs={12} sm={6} lg={4} key = {key}>
                        <ProjectCard {...data}/> 
                      </Grid>      
                    );
                  })}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
              <Grid container spacing = {3} direction = "row">
                    {cardListComplete.map((data, key) => {
                    return (
                      <Grid item xs={12} sm={6} lg={4} key = {key}>
                        <ProjectCard {...data}/> 
                      </Grid>      
                    );
                  })}
              </Grid>
              </TabPanel>
        </Container>
        </Grid>
      </Grid>
      
      </Fragment>
    );
  }
