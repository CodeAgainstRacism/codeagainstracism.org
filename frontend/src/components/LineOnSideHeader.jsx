import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dividerContainer: {
    display: "flex",
    alignItems: "center",
  },
  projectTitle: {
    alignText: "center",
    display: "inline",
    padding: theme.spacing(0, 5),
    whiteSpace: "nowrap",
  },
  line: {
    border: "none",
    borderTop: `3px solid ${theme.palette.text.primary}`,
    color: theme.palette.text.secondary,
    overflow: "visible",
    textAlign: "center",
    width: "50%",
  },
}));

const LineOnSideHeader = (props) => {
  const { title, variant } = props;
  const classes = useStyles();

  return (
    <Box className={classes.dividerContainer}>
      <hr className={classes.line} />
      <Typography variant={variant} className={classes.projectTitle}>
        {title}
      </Typography>
      <hr className={classes.line} />
    </Box>
  );
};

export default LineOnSideHeader;
