import React, { Fragment } from "react";
import { Button, Box, Container, Grid, makeStyles, Typography, TextField } from "@material-ui/core";
import LineOnSideHeader from "../components/LineOnSideHeader";
import { Formik } from "formik";
import * as Yup from 'yup';
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  header: {
    alignText: "center",
    display: "inline",
    padding: theme.spacing(0, 5),
    whiteSpace: "nowrap",
  },
  contentStyle: {
    display: "flex",
    justifyContent: "center",
  },
  marginStyle: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  formContainer: {
    width: "100%",
    border: "1px solid #292929",
    boxSizing: "border-box",
    overflow: "auto",
    borderRadius: "7px",
    transform: "matrix(1, 0, 0, 1, 0, 0)",
  },
  formBody: {
    fontSize: theme.spacing(1.5),
    width: "100%",
    overflow: "auto",
    padding: theme.spacing(2, 6, 2, 6),
  },
  whiteGap: {
    width: "100%",
    padding: theme.spacing(2, 6, 2, 6),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: "0px 0px 7px 7px",
  },
  formTextSpacing: {
    margin: theme.spacing(1),
  },
  lineStyle: {
    margin: theme.spacing(3),
  },
  boldStyle: {
    fontWeight: "bold"
  },
  errMsgStyle: {
    margin: theme.spacing(1),
    color: "#D8000C",
    fontSize: "1rem",
  },
  viewStyle: {
    maxHeight: "100vh",
  }
}));

export default function AccountRecovery() {
  const classes = useStyles();

  return (
    <Fragment>
      <Container maxWidth="md" direction="column" className={classes.viewStyle}>
        <Grid container direction="column" className={classes.contentStyle}>
          <Grid item className={classes.marginStyle}>
            <LineOnSideHeader
              title="Account Recovery"
              variant="h4"
              className={classes.header}
            />
          </Grid>
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Container
                disableGutters={true}
                direction="column"
                justify="center"
                align="center"
                className={classes.formContainer}
              >
                <Box className={classes.whiteGap} />
                <Container className={classes.formBody}>
                  <Grid>
                    <Typography className={classNames(classes.formTextSpacing, classes.boldStyle)}>
                      Uh oh!
                    </Typography>

                    <Typography className={classes.formTextSpacing}>
                      It seems like you were unable to log onto your account.
                      Please enter your email and we will send you instructions
                      on how to recover your account.
                    </Typography>

                    <hr className={classes.lineStyle} />

                    <Typography className={classes.formTextSpacing}>
                      Enter your email:
                    </Typography>

                    <Formik
                      initialValues={{
                        recoveryEmail: '',
                      }}
                      validationSchema={Yup.object({
                        recoveryEmail: Yup.string()
                          .email('Invalid email address')
                          .required('Required*'),
                      })}
                      onSubmit={(values) => {
                        // submit function
                      }}
                    >
                      {formik => (
                        <form onSubmit={formik.handleSubmit}>
                          <TextField
                            className={classes.formTextSpacing}
                            {...formik.getFieldProps('recoveryEmail')}
                          />
                          {formik.touched.recoveryEmail && formik.errors
                            ? (<div item className={classes.errMsgStyle}> {formik.errors.recoveryEmail} </div>)
                            : null}

                          <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            className={classes.formTextSpacing}
                          >
                            Enter
                          </Button>
                        </form>
                      )}
                    </Formik>
                  </Grid>
                </Container>
                <Box className={classes.whiteGap} />
              </Container>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
