import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  flexBoxCenter: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  learnMoreButton: {
    justifyContent: "center",
    padding: theme.spacing(1, 6),
  },
  descriptionStyle: {
    textOverflow: "ellipsis",
    height: theme.spacing(6),
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
}));

const ProjectCard = (props) => {
  const classes = useStyles();
  const { name, id, description } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography className={classes.descriptionStyle} align="left">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.flexBoxCenter}>
        <Button
          size="medium"
          color="primary"
          className={classes.learnMoreButton}
          variant="contained"
          component={RouterLink}
          to={`projects/${id}`}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
