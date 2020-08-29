import React from "react";
import {
  makeStyles,
  useTheme,
  Box,
  Button,
  Link,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import SignInButtons from "../components/SignInButtons";
import HandWave from "../assets/Hand waving.png";
import { Link as RouterLink } from "react-router-dom";

const LoginStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  outerContainer: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "center",
    alignItems: "center",
  },
  /**Divider with text in between */
  dividerBar: {
    height: "1px",
    background: "#808080",
    flexGrow: 1,
  },

  dividerContainer: {
    display: "flex",
    alignItems: "center",
    color: "#808080",
    width: "100%",
    padding: theme.spacing(1, 0),
  },

  /*containers*/
  header: {
    fontWeight: "bold",
    paddingTop: "0.67em",
    letterSpacing: theme.spacing(0.15),
    width: "100%",
    fontSize: theme.spacing(3.5),
    textTransform: "uppercase",
  },
  leftGridContainer: {
    display: "flex",
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    width: "350px",
    height: "350px",
  },
  formContainer: {
    width: "100%",
    border: "1px solid #292929",
    boxSizing: "border-box",
    overflow: "auto",
    borderRadius: "7px",
    transform: "matrix(1, 0, 0, 1, 0, 0)",
  },
  formHeaderBackground: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: "7px 7px 0px 0px",
  },
  formBody: {
    fontSize: theme.spacing(1.5),
    width: "100%",
    overflow: "auto",
    padding: theme.spacing(2, 6, 0, 6),
  },
  formFooter: {
    width: "100%",
    padding: theme.spacing(2, 6, 2, 6),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: "0px 0px 7px 7px",
  },

  loginContainer: {
    width: "100%",
    border: "1px solid #292929",
    alignItems: "center",
    boxSizing: "border-box",
    overflow: "auto",
    borderRadius: "7px 7px 7px 7px",
    transform: "matrix(1, 0, 0, 1, 0, 0)",
  },

  /*icon button spacing*/
  actionButton: {
    margin: theme.spacing(1, 0, 0),
    fontWeight: "bold",
    fontSize: theme.spacing(1.75),
  },
}));

export default function LogIn(props) {
  const classes = LoginStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <main>
        <Container maxWidth="md" className={classes.outerContainer}>
          <Grid container spacing={6}>
            {/**Text and Image */}
            <Grid item container xs={6} className={classes.leftGridContainer}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                className={classes.header}
              >
                Welcome Back
              </Typography>
              <Box my={1} className={classes.imageContainer}>
                <img
                  src={HandWave}
                  alt="Hand Waving"
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                We missed you. Go catch up on your project!
              </Typography>
            </Grid>
            {/**Login Page */}
            <Grid item xs={6}>
              <Grid
                container
                direction="column"
                justify="center"
                align="center"
                className={classes.formContainer}
              >
                <Grid item xs={12} className={classes.formHeaderBackground}>
                  <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    className={classes.header}
                    style={{ textTransform: "uppercase" }}
                  >
                    Log In
                  </Typography>
                </Grid>
                <Container className={classes.formBody}>
                  {/**Github Icon Button */}
                  <SignInButtons action="Sign In" />

                  <Divider
                    dividerContainer={classes.dividerContainer}
                    dividerBar={classes.dividerBar}
                    theme={theme}
                  />

                  {/** Right Grid **/}

                  <Grid id="row" container spacing={1}>
                    <Grid item xs={12}>
                      <TextField label="Username" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField type="password" label="Password" />
                    </Grid>

                    <Grid
                      item
                      container
                      xs={12}
                      display="flex"
                      justify="flex-end"
                    >
                      <Link
                        component={RouterLink}
                        to="/accountrecovery"
                        color="inherit"
                        underline="none"
                      >
                        Forgot your password?
                      </Link>
                    </Grid>
                  </Grid>

                  <Button
                    className={classes.actionButton}
                    fullWidth={true}
                    color="primary"
                    variant="contained"
                  >
                    Login
                  </Button>

                  {/**Divider with text "or" in between */}
                  <Divider
                    dividerContainer={classes.dividerContainer}
                    dividerBar={classes.dividerBar}
                    theme={theme}
                  />
                </Container>
                <Container className={classes.formFooter}>
                  <Button
                    component={RouterLink}
                    to="/signup"
                    fullWidth={true}
                    color="secondary"
                    variant="outlined"
                    className={classes.actionButton}
                  >
                    Create an Account
                  </Button>
                </Container>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

const Divider = (props) => {
  return (
    <Box className={props.dividerContainer}>
      <Box className={props.dividerBar} />
      <Typography variant="subtitle2">or</Typography>
      <Box className={props.dividerBar} />
    </Box>
  );
};
