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
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  contentStyle: {
    paddingTop: theme.spacing(1),
  },
  titleStyle: {
    fontSize: theme.spacing(3),
  }
}));

export default function Description(props){
    const classes = DescriptionStyles();
    const {title, desc } = props;
    return(
      <Grid className={classes.headingContainer}>
        <Typography className={classes.titleStyle}>
          { title }
        </Typography>
        <Box className={classes.dividerBar} />
        <Typography className={classes.contentStyle}>
          { desc ? desc : "Missing description" /* italicize later */}
        </Typography>
      </Grid>
    )
}
