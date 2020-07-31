import React from 'react';
import { Grid } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import Plan from './plan.svg';
import Blogging from './blogging.svg';

const Page = () => {
  const [selectedValue, setSelectedValue] = React.useState('');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Container lg direction="column">
      <Grid item>
        <p> Navbar placeholder </p>
      </Grid>
      <Grid item container>
        <Grid item xs={0} sm={2} />
        <Grid item xs={12} sm={8} container direction="column">
          <Grid item>
            <h1> Welcome to Code Against Racism </h1>
            <p> We are so excited to see you join our teams of warriors!</p>
          </Grid>
          <Grid item container>
            <Grid item xs={12} sm={6}>
              <img src={Blogging} alt="blogging" />
              <p> I want to join an existing team </p>
              <Radio
                checked={selectedValue === 'join'}
                onChange={handleChange}
                value="join"
                inputProps={{ 'aria-label': 'join' }}
                color="black"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={Plan} alt="plan" />
              <p> I want to create a new team </p>
              <Radio
                checked={selectedValue === 'create'}
                onChange={handleChange}
                value="create"
                inputProps={{ 'aria-label': 'create' }}
                color="black"
              />
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained"> Next </Button>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={2} />
      </Grid>
    </Container>
  );

};

export default Page;
