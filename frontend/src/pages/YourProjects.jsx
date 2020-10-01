import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Container,
  Grid,
  Box,
  AppBar,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";

//imported mock data
import { proData } from "../mock data/data";
import { proDataCom } from "../mock data/data_complete";
//backend connection stuff
import axios from "axios";
import { BACKEND_URL } from "../config";
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

  appbar: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.text.secondary,
    fontWeight: "bold",
    width: "30%",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function YourProjects() {
  //connect to backend stuff
  const [projectsComplete, setProjectsComplete] = useState([]);
  const [projectsIncomplete, setProjectsIncomplete] = useState([]);

  axios
    .get(`${BACKEND_URL}projects/incomplete`, {
      params: {},
    })
    .then(function (response) {
      setProjectsIncomplete(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  //if use state is 1
  axios
    .get(`${BACKEND_URL}projects/complete`, {
      params: {},
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
    setValue(newValue);
  };

  return (
    <Fragment>
      <Grid container id="row">
        <Grid container item xs={2} alignItems="stretch">
          <SideBar />
        </Grid>
        <Grid container item xs={10} className={classes.rightGridContainer}>
          <Container className={classes.headingContainer}>
            Your Projects
            <Box className={classes.dividerBar} />
          </Container>

          <Container className={classes.rightContainer}>
            <AppBar
              position="static"
              style={{ boxShadow: "none" }}
              className={classes.appbar}
            >
              <Tabs value={value} onChange={handleChange}>
                <Tab label="In Progress" {...a11yProps(0)} />
                <Tab label="Completed" {...a11yProps(1)} />
              </Tabs>
            </AppBar>

            <Container style={{ backgroundColor: "white" }}>
              <TabPanel value={value} index={0}>
                <Grid container spacing={3} direction="row">
                  {cardListIncomplete.map((data, key) => {
                    return (
                      <Grid item xs={12} sm={6} lg={4} key={key}>
                        <ProjectCard {...data} />
                      </Grid>
                    );
                  })}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={3} direction="row">
                  {cardListComplete.map((data, key) => {
                    return (
                      <Grid item xs={12} sm={6} lg={4} key={key}>
                        <ProjectCard {...data} />
                      </Grid>
                    );
                  })}
                </Grid>
              </TabPanel>
            </Container>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  );
}
