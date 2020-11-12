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
import { Formik } from "formik";
import * as Yup from 'yup';

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
  errMsgStyle: {
    marginLeft: theme.spacing(0.5),
    color: "#D8000C", // may want to move this value to theme.js, idk
  }
}));

export default function AuthForm(props) {
  const classes = LoginStyles();
  const individual = props.match.params.type.toLowerCase() === "individual" ? true : false;
  const organization = !individual;

  const IndividualFields = (props) => {
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            reEnterPassword: '',
            aboutYou: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .min(2, 'Must be 2 characters or more')
              .test('alphabets', 'First name must only contain alphabets', (value) => {
                return /^[A-Za-z]+$/.test(value);})
              .required('Required*'),
            lastName: Yup.string()
              .max(20, 'Must be 20 characters or less') // placeholder
              .min(2, 'Must be 2 characters or more')
              .test('alphabets', 'Last name must only contain alphabets', (value) => {
                return /^[A-Za-z]+$/.test(value);})
              .required('Required*'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required*'),
            password: Yup.string()
              .min(8, 'Password must contain at least 8 characters')
              .required('Required*'),
            reEnterPassword: Yup.string()
              .oneOf([Yup.ref('password')], 'Password does not match')
              .required('Required*')
          })}
          onSubmit = {(values) => {
            // TODO: connect to backend so we can submit a new acc
            console.log(values);
          }}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <Container className={classes.formBody}>
              <Grid id="row" container spacing={1}>
                <Grid item xs={12}>
                  <TextField required label="First Name" {...formik.getFieldProps('firstName')} />
                </Grid>
                {formik.touched.firstName && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.firstName} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField required label="Last Name" {...formik.getFieldProps('lastName')}/>
                </Grid>
                {formik.touched.lastName && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.lastName} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField required label="Email" {...formik.getFieldProps('email')} />
                </Grid>
                {formik.touched.email && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.email} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField required type="password" label="Password" {...formik.getFieldProps('password')}/>
                </Grid>
                {formik.touched.password && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.password} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField required type="password" label="Re-enter Password" {...formik.getFieldProps('reEnterPassword')}
                  />
                </Grid>
                {formik.touched.reEnterPassword && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.reEnterPassword} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField type="string" label={"About you"} multiline rows={4} />
                </Grid>
              </Grid>
              </Container>
              <Container className={classes.formFooter}>
                <Button type="submit" fullWidth={true} color="primary" variant="contained">
                  Create an Account
                </Button>
              </Container>
            </form>
          )}
        </Formik>
      </React.Fragment>
    );
  };

  const OrganizationFields = (props) => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    return (
      <React.Fragment>
        <Formik
          initialValues={{
            organizationName: '',
            ein: '',
            phoneNumber: '',
            email: '',
            password: '',
            reEnterPassword: '',
            aboutOrg: '',
          }}
          validationSchema={Yup.object({
            organizationName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .min(5, 'Must be 5 characters or more')
              .required('Required*'),
            ein: Yup.number()
              .lessThan(999999999, 'Invalid EIN: Must be 9 digits long')
              .moreThan(0, 'Invalid EIN: Must be 9 digits long')
              .test('len', 'Invalid EIN: Must be 9 digits long', val => val.toString().length === 9)
              .typeError('Invalid EIN: Must be 9 digits long')
              .required('Required*'),
            phoneNumber: Yup.string()
              .matches(phoneRegExp, 'Invalid Phone number')
              .required('Required*'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required*'),
            password: Yup.string()
              .min(8, 'Password must contain at least 8 characters')
              .required('Required*'),
            reEnterPassword: Yup.string()
              .oneOf([Yup.ref('password')], 'Password does not match')
              .required('Required*')
          })}
          onSubmit={(values) => {
            // TODO: connect to backend so we can submit a new acc
            console.log(values);
          }}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <Container className={classes.formBody}>
              <Grid id="row" container spacing={1}>
                <Grid item xs={12}>
                  <TextField required label="Organization Name" {...formik.getFieldProps('organizationName')}/>
                </Grid>
                {formik.touched.organizationName && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.organizationName} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField required label="EIN (Employee Identification Number)" {...formik.getFieldProps('ein')}/>
                </Grid>
                {formik.touched.ein && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.ein} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField required label="Phone Number" {...formik.getFieldProps('phoneNumber')}/>
                </Grid>
                {formik.touched.phoneNumber && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.phoneNumber} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField required label="Email" {...formik.getFieldProps('email')}/>
                </Grid>
                {formik.touched.email && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.email} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField required type="password" label="Password" {...formik.getFieldProps('password')} />
                </Grid>
                {formik.touched.password && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.password} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField required type="password" label="Re-enter Password" {...formik.getFieldProps('reEnterPassword')}/>
                </Grid>
                {formik.touched.reEnterPassword && formik.errors
                  ? (<Grid item className={classes.errMsgStyle}> {formik.errors.reEnterPassword} </Grid>)
                  : null}

                <Grid item xs={12}>
                  <TextField type="string" label={"What does your organization do?"} multiline rows={4} />
                </Grid>
              </Grid>
              </Container>
              <Container className={classes.formFooter}>
                <Button type="submit" fullWidth={true} color="primary" variant="contained">
                  Create an Account
                </Button>
              </Container>
            </form>
          )}
        </Formik>
      </React.Fragment>
    );
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
                {individual && <IndividualFields />}
                {organization && <OrganizationFields />}
              </Container>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* End footer */}
    </React.Fragment>
  );
}
