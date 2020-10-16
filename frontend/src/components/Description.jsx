import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
  TextField,
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
    const { id, title, desc, enableEdit } = props;
    return(
      <Grid className={classes.headingContainer}>
        <Typography className={classes.titleStyle}>
          { title }
        </Typography>
        <Box className={classes.dividerBar} />
        { !enableEdit ?
          <Typography className={classes.contentStyle}>
            { desc ? desc : "Missing description" /* italicize later */}
          </Typography> :
          <TextField id={id} defaultValue={desc} style={{margin:".3em"}}/>
        }
      </Grid>
    )
}
