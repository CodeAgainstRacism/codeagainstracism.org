import React from "react";
import { withRouter, Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import HeroImage from "../assets/Landing_Hero.svg";

const useStyles = makeStyles((theme) => ({
  flexBox: {
    display: "flex",
  },
  flexBoxCenter: {
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    marginRight: theme.spacing(2),
  },

  /**** HERO *******/
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: theme.spacing(2),
  },
  heroParagraph: {
    padding: theme.spacing(2, 0),
    color: theme.palette.text.primary,
  },
  heroMedia: {
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: "cover",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroLeftCTAButton: {
    backgroundColor: theme.heroCTAButton.left,
    color: theme.palette.text.secondary,
    width: theme.spacing(28),
    padding: theme.spacing(2, 0),
    fontWeight: "bold",
    fontSize: "",
  },
  heroRightCTAButton: {
    backgroundColor: theme.heroCTAButton.right,
    width: theme.spacing(28),
    padding: theme.spacing(2, 0),
    fontWeight: "bold",
    fontSize: "",
  },

  /* Projects Title */
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

  /* Feature Project */
  featuredContainer: {
    marginBottom: theme.spacing(8),
    display: "flex",
  },
  cardDetails: {
    flex: 1,
    padding: theme.spacing(3, 1, 0),
  },
  featuredParagraph: {
    margin: theme.spacing(1, 0),
  },
  featuredImage: {
    height: "100%",
    objectFit: "cover",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  learnMoreButton: {
    justifyContent: "center",
    padding: theme.spacing(1, 6),
  },
  /* 6 cards */
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    // marginBottom: theme.spacing(8),
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
  moreProjects: {
    justifyContent: "center",
    marginTop: theme.spacing(7),
  },
}));

const cards = [1, 2, 3, 4, 5, 6];

const LandingPage = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero Box */}
        <Container maxWidth="lg">
          <Box className={classes.heroContent} boxShadow={3}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Typography variant="h4" align="left" gutterBottom>
                  Help Fight For Diversity In Tech
                </Typography>
                <Typography
                  variant="subtitle1"
                  paragraph
                  align="left"
                  className={classes.heroParagraph}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus, rerum. Nam doloremque atque tempora, omnis cumque
                  officia amet alias molestias nobis quidem obcaecati commodi
                  consectetur vitae excepturi rerum aperiam esse?
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={7}>
                    <Grid item>
                      <Button
                        variant="contained"
                        className={classes.heroLeftCTAButton}
                        component={RouterLink}
                        to="/signup/individual"
                      >
                        Join A Project
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        className={classes.heroRightCTAButton}
                        component={RouterLink}
                        to="/signup/organization"
                      >
                        Create A Project
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={4} className={classes.heroMedia}></Grid>
            </Grid>
          </Box>
        </Container>
        {/* End hero Box */}
        <Container className={classes.cardGrid} maxWidth="lg">
          <Box className={classes.dividerContainer}>
            <hr className={classes.line} />
            <Typography variant="h4" className={classes.projectTitle}>
              PROJECTS
            </Typography>
            <hr className={classes.line} />
          </Box>

          {/* Featured Project */}
          <Card className={classes.featuredContainer}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <CardMedia
                  className={classes.featuredImage}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
              </Grid>
              <Grid item xs={6}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Featured
                    </Typography>
                    <Typography variant="h4" color="textPrimary" gutterBottom>
                      Black Girls Code
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      paragraph
                      className={classes.featuredParagraph}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut, rem. Saepe nesciunt, cumque voluptate tenetur deserunt
                      voluptatum numquam modi. Provident error nihil molestiae
                      iusto dolorem qui repellat ducimus at ratione! Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Ut, rem.
                      Saepe nesciunt.
                    </Typography>
                    <CardActions className={classes.flexBoxCenter}>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        className={classes.learnMoreButton}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </CardContent>
                </div>
              </Grid>
            </Grid>
          </Card>

          {/* 6 projects */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
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
              </Grid>
            ))}
          </Grid>
          <Grid container className={classes.moreProjects}>
            <Button
              component={RouterLink}
              to="/projects"
              size="large"
              color="secondary"
              variant="contained"
            >
              More Projects
            </Button>
          </Grid>
          {/* Insert Statistic */}
          {/* Insert Sponsors */}
        </Container>
      </main>
    </React.Fragment>
  );
};

export default withRouter(LandingPage);
