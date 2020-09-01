import React, { Fragment, useEffect, useState} from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
  InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Pagination } from '@material-ui/lab';
import ProjectCard from '../components/ProjectCard';
import axios from 'axios';

import { BACKEND_URL } from '../config';

const useStyles = makeStyles((theme) => ({
  contentStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
  marginStyle: {
    marginTop: theme.spacing(3),
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },
  projectTitle: {
    alignText: 'center',
    display: 'inline',
    padding: theme.spacing(0, 5),
    whiteSpace: 'nowrap',
  },
  line: {
    border: 'none',
    borderTop: `3px solid ${theme.palette.text.primary}`,
    color: theme.palette.text.secondary,
    overflow: 'visible',
    textAlign: 'center',
    width: '50%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(0.5),
    height: theme.spacing(5),
  },
  inputStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '25%',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(0.5),
    height: theme.spacing(5),
  },
  iconStyle: {
    paddingLeft: theme.spacing(0.5),
  },
  paginationStyle: {
    margin: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
  viewStyle: {
    minHeight: '100vh',
  }
}));

export default function Projects() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [searchedCard, setSearchedCard] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`${BACKEND_URL}projects`, {
        params: {}
      })
      .then(function (response) {
        setProjects(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  const filteredList = projects.filter((card) =>
    card.name.toLowerCase().includes(searchedCard.toLowerCase())
  );

  const handleSearch = event => {
    setSearchedCard(event.target.value);
    setCurrentPage(1); // set the current page back to 1 after each search
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  }

  const getPagination = () => {
    return (
      filteredList.length > 0 &&
      <Pagination
        count={Math.ceil(filteredList.length / cardsPerPage)}
        page={currentPage}
        variant='outlined'
        shape='rounded'
        onChange={handleChangePage}
      />
    );
  }

  return (
    <Fragment >
      <Container maxWidth='lg' direction='column' className={classes.viewStyle}>
        <Grid container direction='column' className={classes.contentStyle}>
          <Grid item className={classes.marginStyle}>
            <Box className={classes.dividerContainer}>
              <hr className={classes.line}/>
              <Typography
                variant='h4'
                align='center'
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
                  placeholder='Search for a project'
                  inputProps={{ 'aria-label': 'search for a project' }}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </Grid>
          <Grid item container spacing={3} className={classes.marginStyle}>
            {filteredList
              .slice(indexOfFirstCard, indexOfLastCard)
              .map(card => (
                <Grid item xs={12} sm={6} lg={4} key={card.id}>
                  <ProjectCard {...card} />
                </Grid>
              ))}
          </Grid>
          <div className={classes.paginationStyle}>
            {getPagination()}
          </div>
        </Grid>
      </Container>
    </Fragment>
  );
}
