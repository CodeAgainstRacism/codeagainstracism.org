import React, { useState } from "react";
import {
  makeStyles,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import DiversityTeam from "../assets/create_a_team.png";

const LoginStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  /*containers*/
  outerContainer: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "center",
    alignItems: "center",
  },
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
    // TODO
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
    padding: theme.spacing(2, 6, 2, 6),
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
}));

const SignUp = (props) => {
  const [newUser, setNewUser] = useState(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [EIN, setEIN] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const classes = LoginStyles();
  const individual =
    props.match.params.type.toLowerCase() === "individual" ? true : false;
  const organization = !individual;

  const { errors, history, removeError } = props;
  // listen for any change in the route. If there is, call removeError to remove the error message. This is necessary when we switch between Login and Signup form to clear the error message
  history.listen(() => {
    removeError();
  });

  async function handleIndividualSubmit(values) {
    setNewUser("test");

    const signUpData = {
      firstName,
      lastName,
      email,
      password,
      description,
    };

    console.log(signUpData);

    props.onAuth("signup", signUpData).then(() => {
      //redirect user to another page
      console.log("SIGNED UP! YAY");
    });

    // axios
    //   .post("" + PORT + "/users/register", signUpData)
    //   .then((response) => {
    //     console.log(response);
    //     authenticationService
    //       .login(signUpData.username, signUpData.password)
    //       .then(
    //         (user) => {
    //           history.push("/dashboard");
    //         },
    //         (error) => {
    //           console.log(error);
    //         }
    //       );
    //   });
  }

  const handleOrgSubmit = () => {
    setNewUser("test");

    const signUpData = {
      organizationName,
      EIN,
      phoneNumber,
      email,
      password,
      description,
    };

    console.log(signUpData);
  };

  return (
    <React.Fragment>
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
                {organization ? "Create Your Team" : "Join Your Team"}
              </Typography>

              <Box my={1} className={classes.imageContainer}>
                <img
                  src={DiversityTeam}
                  alt="diversity team"
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography variant="body1" gutterBottom>
                We are a team of dedicated warriors who fight against racism in
                Tech. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Morbi et nisl hendrerit, aliquet mi sed, scelerisque tortor.
                Aliquam eu scelerisque quam, ac tristique dolor.
              </Typography>
            </Grid>
            {/**Right Grid*/}
            <Grid item xs={6}>
              <Container
                disableGutters={true}
                direction="column"
                justify="center"
                align="center"
                className={classes.formContainer}
              >
                <Container className={classes.formHeaderBackground}>
                  <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    className={classes.header}
                    style={{ textTransform: "uppercase" }}
                  >
                    Sign up
                  </Typography>
                </Container>
                <Container className={classes.formBody}>
                  {/* Display 3 Buttons for Google, Facebook, Github */}
                  {/* Display error message from BE if neccessary */}

                  <Grid id="row" container spacing={1}>
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
                    {individual && (
                      <IndividualFields
                        firstName={firstName}
                        lastName={lastName}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                      />
                    )}
                    {organization && (
                      <OrganizationFields
                        setOrganizationName={setOrganizationName}
                        setEIN={setEIN}
                        setPhoneNumber={setPhoneNumber}
                        organizationName={organizationName}
                        EIN={EIN}
                        phoneNumber={phoneNumber}
                      />
                    )}
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        type="password"
                        label="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        type="password"
                        label="Re-enter Password"
                        name="reEnteredPassword"
                        value={reEnteredPassword}
                        onChange={(e) => setReEnteredPassword(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        type="string"
                        label={
                          organization
                            ? "What does your organization do?"
                            : "About you"
                        }
                        multiline
                        rows={4}
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Container>

                <Container className={classes.formFooter}>
                  <Button
                    fullWidth={true}
                    color="primary"
                    variant="contained"
                    onClick={
                      individual ? handleIndividualSubmit : handleOrgSubmit
                    }
                  >
                    Create an Account
                  </Button>
                </Container>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* End footer */}
    </React.Fragment>
  );
};

const IndividualFields = (props) => {
  const { setFirstName, setLastName, firstName, lastName } = props;

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <TextField
          required
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Grid>
    </React.Fragment>
  );
};

const OrganizationFields = (props) => {
  const {
    setOrganizationName,
    setEIN,
    setPhoneNumber,
    organizationName,
    EIN,
    phoneNumber,
  } = props;
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <TextField
          required
          label="Organization Name"
          name="organizationName"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="EIN (Employee Identification Number)"
          name="EIN"
          value={EIN}
          onChange={(e) => setEIN(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Grid>
    </React.Fragment>
  );
};

export default SignUp;
