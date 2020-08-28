import React from "react";
import {
  makeStyles,
  useTheme,
  Box,
  Link,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import SignInButtons from "./SignInButtons";
import HandWave from "../assets/Hand waving.png";
import DiversityTeam from "../assets/create_a_team.png";
import { Link as RouterLink } from "react-router-dom";

const LoginStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  /**Divider with text in between */
  dividerBar: {
    height: "1px",
    backgroundColor: "#808080",
    flexGrow: 1,
  },

  dividerContainer: {
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    color: "#808080",
    width: "100%",
    height: theme.spacing(5),
  },
  /*containers*/
  outerContainer: {
    padding: theme.spacing(3),
  },
  header: {
    fontWeight: "bold",
    paddingTop: "0.67em",
    letterSpacing: theme.spacing(0.15),
    width: "100%",
    fontSize: "1.75rem",
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
    alignItems: "center",
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
    padding: theme.spacing(2, 6, 2, 6),
  },
  footer: {
    width: "100%",
    padding: theme.spacing(2, 6, 2, 6),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: "0px 0px 7px 7px",
  },

  /*icon button spacing*/
}));

export default function AuthForm(props) {
  const classes = LoginStyles();
  const theme = useTheme();
  const { signup, login, individual, organization, message } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container maxWidth="md" className={classes.outerContainer}>
          <Grid container spacing={6}>
            <Grid item container xs={6} className={classes.leftGridContainer}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                className={classes.header}
              >
                {message}
              </Typography>
              <Typography variant="body1" gutterBottom>
                ~ Description of our organization. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nulla itaque quam minus ad
                voluptate non, hic iure quisquam, repellat vel dicta!
                Reprehenderit, neque beatae! ~
              </Typography>
              <Box my={1} className={classes.imageContainer}>
                <img
                  src={login ? HandWave : DiversityTeam}
                  alt={login ? "hand-waving" : "diversity team"}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Grid>
            {/**Right Grid*/}
            <Grid item xs={6}>
              <Container
                disableGutters={true}
                className={classes.formContainer}
              >
                <Container className={classes.formHeaderBackground}>
                  <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    className={classes.header}
                  >
                    {login ? "Login".toUpperCase() : "Sign up".toUpperCase()}
                  </Typography>
                </Container>
                <Container className={classes.formBody}>
                  {/* Display 3 Buttons for Google, Facebook, Github */}
                  {(login || individual) && (
                    <React.Fragment>
                      <SignInButtons
                        classes={classes}
                        theme={theme}
                        action={login ? "Sign In" : "Sign Up"}
                      />
                      <Divider classes={classes} theme={theme} />
                    </React.Fragment>
                  )}
                  <Grid id="row" container spacing={1}>
                    {signup && individual && <IndividualFields />}
                    {signup && organization && <OrganizationFields />}

                    <Grid item xs={12}>
                      <TextField required label="Email" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required type="password" label="Password" />
                    </Grid>

                    {signup && (
                      <Grid item xs={12}>
                        <TextField
                          required
                          type="password"
                          label="Re-enter Password"
                        />
                      </Grid>
                    )}
                    {signup && organization && (
                      <Grid item xs={12}>
                        <TextField
                          type="string"
                          label="What does your organization do?"
                          multiline
                          rows={4}
                        />
                      </Grid>
                    )}

                    {login && (
                      <React.Fragment>
                        <Grid container item xs={12} justify="flex-end">
                          <Link
                            component={RouterLink}
                            to="/accountrecovery"
                            color="inherit"
                            underline="none"
                            style={{ color: "#808080" }}
                          >
                            Forgot your password?
                          </Link>
                        </Grid>

                        {/* Button to submit form */}
                        <Button
                          className={classes.button}
                          fullWidth={true}
                          color="primary"
                          variant="contained"
                        >
                          LOGIN
                        </Button>

                        <Divider classes={classes} theme={theme} />
                      </React.Fragment>
                    )}
                  </Grid>
                </Container>

                <Container className={classes.footer}>
                  {login ? (
                    // in log in page, we redirect user to /userType
                    <Button
                      fullWidth={true}
                      color="secondary"
                      variant="outlined"
                      component={RouterLink}
                      to="/userType"
                    >
                      Create an Account
                    </Button>
                  ) : (
                    // in sign up page, we submit the form
                    <Button
                      fullWidth={true}
                      color="primary"
                      variant="contained"
                    >
                      Create an Account
                    </Button>
                  )}
                </Container>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* End footer */}
    </React.Fragment>
  );
}

/**Divider with text "or" in between */
const Divider = (props) => {
  const classes = props.classes;
  const theme = props.theme;
  return (
    <Box className={classes.dividerContainer}>
      <Container className={classes.dividerBar}></Container>
      <Typography variant="subtitle2" style={{ padding: theme.spacing(0, 2) }}>
        or
      </Typography>
      <Container className={classes.dividerBar}></Container>
    </Box>
  );
};

const IndividualFields = (props) => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <TextField required label="First Name" />
      </Grid>
      <Grid item xs={12}>
        <TextField required label="Last Name" />
      </Grid>
    </React.Fragment>
  );
};

const OrganizationFields = (props) => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <TextField required label="Organization Name" />
      </Grid>
      <Grid item xs={12}>
        <TextField required label="EIN (Employee Identification Number)" />
      </Grid>
      <Grid item xs={12}>
        <TextField required label="Phone Number" />
      </Grid>
    </React.Fragment>
  );
};
