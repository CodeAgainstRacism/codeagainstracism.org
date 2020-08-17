import React, { Fragment, useEffect, useState} from "react";
import {
  Box,
  Container,
  fade,
  Grid,
  makeStyles,
  Typography,
  InputBase,
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ProjectCard from "../components/ProjectCard";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  contentStyle: {
    display: "flex",
    justifyContent: "center",
  },
  marginStyle: {
    margin: theme.spacing(3),
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(5),
  },
  projectTitle: {
    alignText: "center",
    display: "inline",
    padding: theme.spacing(0, 5),
  },
  line: {
    border: "none",
    borderTop: `3px solid ${theme.palette.text.primary}`,
    color: theme.palette.text.secondary,
    overflow: "visible",
    textAlign: "center",
    width: "30%",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    alignItems: "center",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Projects() {
  const classes = useStyles();
  const [projectList, setProjectList] = useState([]);

  useEffect(()=>{
    axios.get('http://ec2-3-23-105-141.us-east-2.compute.amazonaws.com:4000/projects', {
    params: {
      ID: 12345
    }
    })
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        setProjectList(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  });

  const getProjectCards = projectCardsObj => {
    return (
      <Grid item xs={12} sm={4}>
        <ProjectCard {...projectCardsObj} />
        {/* TODO: change card title's and image, pass in props */}
      </Grid>
    );
  }

  return (
    <Fragment>
      <Container maxWidth="lg" direction="column">
        <Grid container className={classes.contentStyle}>
          <Grid xs={0} sm={2} item />
          <Grid xs={12} sm={8} item direction="column"> {/* Header container */}
            <Grid item className={classes.marginStyle}>
              <Box className={classes.dividerContainer}>
                <hr className={classes.line}/>
                <Typography
                  variant="h3"
                  align="center"
                  gutterBottom
                >
                  All Projects
                </Typography>
                <hr className={classes.line}/>
              </Box>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Grid>
            <Grid item container spacing={4}> {/* Body container */}
              {/* Populate project cards here */}
              {projectList.map(projectCardsObj => getProjectCards(projectCardsObj))}
            </Grid>
          </Grid>
          <Grid xs={0} sm={2} item />
        </Grid>
      </Container>
    </Fragment>
  );
}
