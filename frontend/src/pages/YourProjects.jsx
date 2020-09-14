import React from 'react';
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
  const classes = YourProjectsStyles();
  const [value, setValue] = React.useState(0);
  const cards = [1, 2, 3, 4, 5, 6];
  const cards2 = [1, 2, 3, 4, 5, 6];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container spacing = {0} id = "row">
          <Grid item xs = {2}>
              <SideBar/>
          </Grid>
          <Grid item xs = {9}>
          <Container className = {classes.headingContainer}> 
              Your Projects
              <Box className = {classes.dividerBar}></Box>
          </Container>
          <Container disableGutters = {true} className = {classes.rightContainer}>
              <AppBar position = "static" style ={{boxShadow: "none"}}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="In Progress" {...a11yProps(0)} />
                  <Tab label="Completed" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
              <Grid container spacing = {3} direction = "row">
              {cards.map((card) => (
              <Grid item key={ProjectCard} sm = {4}>
                <ProjectCard/>
              </Grid>))}
              </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
              <Grid container spacing = {3} direction = "row">
              {cards2.map((card) => (
              <Grid item key={ProjectCard} sm = {4}>
                <ProjectCard/>
              </Grid>))}
              </Grid>
              </TabPanel>
        </Container>
        </Grid>
      </Grid>
      
      </React.Fragment>
    );
  }
