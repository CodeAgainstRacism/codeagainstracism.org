import React, { useState } from "react";
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
import { Alert } from "@material-ui/lab";
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
    width: "300px",
    height: "300px",
  },
  formContainer: {
    width: "100%",
    border: "1px solid #292929",
    boxSizing: "border-box",
    overflow: "auto",
    borderRadius: "7px 7px 0px 0px",
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
    ontSize: theme.spacing(1.5),
    minWidth: "350px",
    minHeight: "350px",
    overflow: "auto",
    padding: theme.spacing(6, 6),
  },
  formFooter: {
    width: "100%",
    padding: theme.spacing(2, 6, 2, 6),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    border: "1px solid #292929",
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errors, history, removeError } = props;

  const classes = LoginStyles();
  const theme = useTheme();
  // listen for any change in the route. If there is, call removeError to remove the error message. This is necessary when we switch between Login and Signup form to clear the error message
  history.listen(() => {
    removeError();
  });

  async function handleLogIn(values) {
    const loginData = { email, password };
    // onAuth returns a promise. When the promise is resolve, then() is run
    props
      .onAuth("login", loginData)
      .then(() => {
        //redirect user to their homepage 
        console.log("Redirecting Now!")
        props.history.push("/yourprojects");
      })
      .catch(() => {
        return;
      });
  };

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
                <Grid
                  item
                  container
                  className={classes.formBody}
                  spacing={1}
                  direction="column"
                  justify="center"
                >
                  {/** Right Grid **/}

                  {/* <Grid id="row" container > */}
                  {/* Display error message from BE if neccessary */}
                  {errors.message && (
                    <Grid item xs={12}>
                      <Alert
                        severity="error"
                        variant="filled"
                        style={{ fontWeight: "bold" }}
                      >
                        {errors.message}
                      </Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      id="email"
                      label="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      id="password"
                      label="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
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
                      <Typography variant="body2">
                        Forgot your password?
                      </Typography>
                    </Link>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      className={classes.actionButton}
                      fullWidth={true}
                      color="primary"
                      variant="contained"
                      onClick={handleLogIn}
                    >
                      Login
                    </Button>
                  </Grid>
                  {/**Divider with text "or" in between */}
                  <Grid item xs={12}>
                    <Divider
                      dividerContainer={classes.dividerContainer}
                      dividerBar={classes.dividerBar}
                      theme={theme}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      component={RouterLink}
                      to="/signup"
                      fullWidth={true}
                      color="secondary"
                      variant="contained"
                      className={classes.actionButton}
                    >
                      Create an Account
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

const Divider = (props) => {
  const { theme } = props;

  return (
    <Box className={props.dividerContainer}>
      <Box className={props.dividerBar} />
      <Typography variant="subtitle2" style={{ padding: theme.spacing(0, 1) }}>
        or
      </Typography>
      <Box className={props.dividerBar} />
    </Box>
  );
};
