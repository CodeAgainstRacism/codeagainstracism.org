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
}));

const ProjectCard = (props) => {
  const classes = useStyles();
  const { title, image } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5">
          Title
        </Typography>
        <Typography align="left">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Voluptate impedit magnam culpa
        </Typography>
      </CardContent>
      <CardActions className={classes.flexBoxCenter}>
        <Button
          size="medium"
          color="primary"
          className={classes.learnMoreButton}
          variant="contained"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
