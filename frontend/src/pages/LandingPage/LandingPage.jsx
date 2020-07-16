import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroLeftCTAButton: {
    backgroundColor: "#205D67",
    color: "#ffffff",
    padding: "1rem",
  },
  heroRightCTAButton: {
    backgroundColor: "#DB5375",
    padding: "1rem",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const LandingPage = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h4" align="left" gutterBottom>
              Help Fight For Diversity In Tech
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              paragraph
              align="left"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, rerum. Nam doloremque atque tempora, omnis cumque
              officia amet alias molestias nobis quidem obcaecati commodi
              consectetur vitae excepturi rerum aperiam esse?
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={7} justify="left">
                <Grid item>
                  <Button
                    variant="contained"
                    className={classes.heroLeftCTAButton}
                  >
                    Join A Project
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    className={classes.heroRightCTAButton}
                  >
                    Create A Project
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
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
                    <Typography gutterBottom variant="h5" component="h2">
                      Title
                    </Typography>
                    <Typography align="left">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptate impedit magnam culpa
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      fullWidth
                      variant="contained"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default LandingPage;
