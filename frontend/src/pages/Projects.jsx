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
import { Pagination } from "@material-ui/lab";
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
  },
  bodyStyle: {
    margin: theme.spacing(0),
    minHeight: "100vh",
    width: "100vh",
    marginTop: theme.spacing(3),
  },
  paginationStyle: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  }
}));

export default function Projects() {
  const classes = useStyles();
  const cardsPerPage = 9;
  const [projectList, setProjectList] = useState([]);
  const [searchedCard, setSearchedCard] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = projectList.slice(indexOfFirstCard, indexOfLastCard);

  useEffect(()=>{
    axios.get('http://ec2-3-23-105-141.us-east-2.compute.amazonaws.com:4000/projects', {
    params: {
      ID: 12345
    }
    })
    .then(function (response) {
      console.log(response);
      if(response.status === 200){
        const { data } = response;
        const newCards = [];
        if(searchedCard === ""){
          data.forEach((card, index) => {
            newCards[index] = {
              id: card.id,
              name: card.name,
              description: card.description,
              index: index,
            };
          });
        } else { // if search field is not empty
          data.forEach((card, index) => {
            if(card.name.toLowerCase().includes(searchedCard)){
              newCards[index] = {
                id: card.id,
                name: card.name,
                description: card.description,
                index: index,
              };
            }
          });
        }
        setProjectList(newCards);
        setTotalPages(Math.ceil(projectList.length / 9));
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  });

  const handleSearch = (event) => {
    setSearchedCard(event.target.value);
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
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
        <Grid container direction="column" className={classes.contentStyle}>
          <Grid item container direction="column" className={classes.contentStyle}>
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
            <Grid item container spacing={3} className={classes.bodyStyle}>
              {currentCards.map(projectCardObj => getProjectCards(projectCardObj))}
            </Grid>
            <div className={classes.paginationStyle}>
              <Pagination
                count={totalPages}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}                
              />
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
}
