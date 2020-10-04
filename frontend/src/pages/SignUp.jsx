import React from "react";
import {
  makeStyles,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
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

export default function AuthForm(props) {
  const classes = LoginStyles();
  const individual =
    props.match.params.type.toLowerCase() === "individual" ? true : false;
  const organization = !individual;

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
                  <Grid id="row" container spacing={1}>
                    {individual && <IndividualFields />}
                    {organization && <OrganizationFields />}
                    <Grid item xs={12}>
                      <TextField required label="Email" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required type="password" label="Password" />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        type="password"
                        label="Re-enter Password"
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
                      />
                    </Grid>
                  </Grid>
                </Container>

                <Container className={classes.formFooter}>
                  <Button fullWidth={true} color="primary" variant="contained">
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
}

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
