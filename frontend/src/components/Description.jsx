import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

const DescriptionStyles = makeStyles((theme) => ({
  dividerBar: {
    height: "1px",
    background: "#000000",
    flexGrow: 1,
  },
  headingContainer: {
    gridArea: "header",
    textAlign: "left",
    //fontSize: theme.spacing(2),
    backgroundColor: "white",
    borderRadius: theme.spacing(0.5),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    boxShadow: theme.spacing(0.1, 0.1, "grey"),
    // feel free to change!
  },
  marginStyle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  contentStyle: {
    paddingTop: theme.spacing(1),
  }
}));

export default function Description(props){
    const classes = DescriptionStyles();
    return(
      <Grid className={classes.marginStyle}>
        <Container className={classes.headingContainer}>
          {props.type}
          <Box className={classes.dividerBar} />
          <Typography className={classes.contentStyle}>
            Content of {props.type}
          </Typography>
        </Container>
      </Grid>
    )
}
