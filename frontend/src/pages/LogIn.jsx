import React from "react";
import {
  makeStyles,
  useTheme,
  MuiThemeProvider,
  Box,
  Button,
  Link,
  createMuiTheme,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import SvgIcon from "@material-ui/core/SvgIcon";
import HandWave from "../assets/Hand waving.png";
import { Link as RouterLink } from "react-router-dom";

/**Icon Button Colors */
const blackTheme = createMuiTheme({ palette: { primary: { main: "#000" } } });
const redTheme = createMuiTheme({ palette: { primary: { main: "#ff411c" } } });
const blueTheme = createMuiTheme({ palette: { primary: { main: "#1c55ff" } } });

const LoginStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  outerContainer: {
    padding: theme.spacing(3),
  },
  /**Divider with text in between */
  dividerBar: {
    height: "1px",
    backgroundColor: "#808080",
    flexGrow: 1,
  },

  dividerContainer: {
    display: "flex",
    alignItems: "center",
    color: "#808080",
    width: "100%",
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

  loginContainer: {
    width: "100%",
    border: "1px solid #292929",
    alignItems: "center",
    boxSizing: "border-box",
    overflow: "auto",
    borderRadius: "7px 7px 7px 7px",
    transform: "matrix(1, 0, 0, 1, 0, 0)",
  },

  loginHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: "7px 7px 0px 0px",
  },

  loginFooter: {
    width: "100%",
    padding: theme.spacing(1, 6, 1, 6),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: "0px 0px 7px 7px",
  },

  loginBody: {
    fontSize: "12 px",
    width: "100%",
    overflow: "auto",
    padding: theme.spacing(1, 6, 1, 6),
  },

  textContainer: {
    position: "relative",
    fontSize: "12px",
    width: "100%",
    padding: theme.spacing(1, 1, 1, 1),
    alignItems: "center",
  },

  pageContainer: {
    height: "60 vmax",
    margin: "0 auto",
    textAlign: "center",
    background: theme.palette.background,
    overflow: "hidden",
    maxWidth: "70vw",
  },

  /*icon button spacing*/
  button: {
    margin: theme.spacing(1, 0, 0),
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
              <Typography variant="body1" gutterBottom>
                We missed you. Go catch up on your project!
              </Typography>
              <Box my={1} className={classes.imageContainer}>
                <img
                  src={HandWave}
                  alt="Hand Waving"
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                className={classes.header}
              >
                Welcome Back
              </Typography>
            </Grid>
            {/**Login Page */}
            <Grid item xs={6}>
              <Container
                disableGutters={true}
                direction="column"
                justify="center"
                alignItems="center"
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
                    Log In
                  </Typography>
                </Container>
                <Container className={classes.formBody}>
                  {/**Github Icon Button */}
                  <MuiThemeProvider theme={blackTheme}>
                    <Button
                      fullWidth={true}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<GitHubIcon />}
                    >
                      Sign In with Github
                    </Button>
                  </MuiThemeProvider>
                  {/**Google Icon Button */}
                  <MuiThemeProvider theme={redTheme}>
                    <Button
                      fullWidth={true}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={
                        <SvgIcon {...props}>
                          <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
                        </SvgIcon>
                      }
                    >
                      Sign In with Google
                    </Button>
                  </MuiThemeProvider>
                  {/**Facebook Icon Button */}
                  <MuiThemeProvider theme={blueTheme}>
                    <Button
                      fullWidth={true}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<FacebookIcon />}
                    >
                      Sign In with Facebook
                    </Button>
                  </MuiThemeProvider>
                  {/**Divider with text "or" in between */}
                  <Divider classes={classes} theme={theme} />
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
                    className={classes.button}
                    fullWidth={true}
                    color="primary"
                    variant="contained"
                  >
                    Login
                  </Button>

                  {/**Divider with text "or" in between */}
                  <Divider classes={classes} theme={theme} />
                </Container>
                <Container className={classes.formFooter}>
                  <Button
                    href="#"
                    component={RouterLink}
                    to="/signup"
                    fullWidth={true}
                    color="secondary"
                    variant="outlined"
                  >
                    Create an Account
                  </Button>
                </Container>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

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
