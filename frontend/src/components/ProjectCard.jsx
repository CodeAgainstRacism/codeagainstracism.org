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
  descriptionStyle: {
    textOverflow: "ellipsis",
    height: theme.spacing(6),
    overflowY: "auto",
    display: "inline-block",
    whiteSpace: "pre-line",
  },
}));

const ProjectCard = (props) => {
  const classes = useStyles();
  const { name, description, imageURL } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={imageURL}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography className={classes.descriptionStyle} align="left">
          {/* Only show 80 characters in the description. The rest is ... */}
          {description.length <= 80
            ? description
            : description.slice(0, 80) + "..."}
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
