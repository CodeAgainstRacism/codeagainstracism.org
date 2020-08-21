import React, { Fragment, useEffect, useState} from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
  InputBase,
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ProjectCard from "../components/ProjectCard";
import axios from 'axios';
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  contentStyle: {
    display: "flex",
    justifyContent: "center",
  },
  marginStyle: {
    marginTop: theme.spacing(3),
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
    width: "50%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    backgroundColor: theme.palette.common.white,
  },
  inputStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "25%",
    backgroundColor: "white",
  },
  iconStyle: {
    paddingLeft: theme.spacing(0.5),
  }
}));

export default function Projects() {
  const classes = useStyles();
  const [projectList, setProjectList] = useState([]);
  const [searchedCard, setSearchedCard] = useState("");

  useEffect(()=>{
    axios.get('http://ec2-3-23-105-141.us-east-2.compute.amazonaws.com:4000/projects', {
    params: {
      ID: 12345
    }
    })
    .then(function (response) {
      if(response.status === 200){
        const { data } = response;
        const newCard = [];
        data.forEach((card, index) => {
          newCard[index] = {
            id: card.id,
            name: card.name,
            description: card.description,
          };
        });
        setProjectList(newCard);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  });

  const handleSearch = (event) => {
    setSearchedCard(event.target.value);
  }

  const getProjectCards = projectCardObj => {
    return (
      <Grid item xs={12} sm={6} lg={4} key={projectCardObj.id}>
        <ProjectCard {...projectCardObj} />
      </Grid>
    );
  }

  return (
    <Fragment>
      <Container maxWidth="lg" direction="column">
        <Grid container className={classes.contentStyle}>
          <Grid item container direction="column">
            <Grid item className={classes.marginStyle}>
              <Box className={classes.dividerContainer}>
                <hr className={classes.line}/>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  className={classes.projectTitle}
                >
                  All Projects
                </Typography>
                <hr className={classes.line}/>
              </Box>
              <div className={classes.contentStyle}>
                <div className={classes.inputStyle}>
                  <SearchIcon className={classes.iconStyle}/>
                  <InputBase
                    className={classes.input}
                    placeholder="Search for a project"
                    inputProps={{ 'aria-label': 'search for a project' }}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </Grid>
            <Grid item container spacing={3} className={classes.marginStyle}>
              {projectList.map(projectCardObj =>
                projectList[projectCardObj.id - 1].name.toLowerCase().includes(searchedCard) &&
                getProjectCards(projectCardObj))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
}
