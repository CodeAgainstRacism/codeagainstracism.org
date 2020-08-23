import React from "react";
import {
  makeStyles,
  Container,
  CssBaseline,
  Grid,
  Button,
} from "@material-ui/core";
import SignUpImage from "../assets/SignUpImage.png";
import organization from "../components/SignUpOrganization";
import individual from "../components/SignUpIndividual";

//make the body a component so it varies from individual and organization

const signStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  /*containers*/
  innerContainer: {
    alignItems: "stretch",
    background: theme.palette.background.default,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2, 2),
    textAlign: "center",
  },

  signContainer: {
    width: "100%",
    border: "1px solid #292929",
    alignItems: "center",
    boxSizing: "border-box",
    borderRadius: "7px",
    transform: "matrix(1, 0, 0, 1, 0, 0)",
  },

  signHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: "7px 7px 0px 0px",
  },

  signFooter: {
    width: "100%",
    padding: theme.spacing(1, 6, 1, 6),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "white",
    borderRadius: "0px 0px 7px 7px",
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
    background: "#f2f2f2",
    overflow: "hidden",
    maxWidth: "70vw",
  },
}));

const SignUp = (props) => {
  const classes = signStyles();
  //     return (
  //       <div>
  //         <form className="auth-form-container">
  //           <h1> {this.props.individual ? "Individual" : "Organization"} </h1>
  //           <div>
  //             <label htmlFor="name">Name of Organization: </label>
  //             <input type="text" name="name"></input>
  //           </div>
  //           <div>
  //             <label htmlFor="EIN">EIN (Employer Identification Number):</label>
  //             <input type="text" name="EIN"></input>
  //           </div>
  //           <div>
  //             <label htmlFor="phoneNumber">Phone Number:</label>
  //             <input type="tel" name="phoneNumber"></input>
  //           </div>
  //           <div>
  //             <label htmlFor="email">Email</label>
  //             <input type="email" name="email"></input>
  //           </div>
  //           <div>
  //             <label htmlFor="password">Password</label>
  //             <input type="password" name="password"></input>
  //           </div>
  //           <div>
  //             <label htmlFor="confirm-password">Confirm Password</label>
  //             <input type="password" name="confirm-password"></input>
  //           </div>
  //           <div>
  //             <label htmlFor="description">Description of Organization:</label>
  //             <textarea name="description" id="description" rows="5" cols="33" />
  //           </div>
  //           <button className="submit-button">Submit</button>
  //         </form>
  //       </div>
  //     );
  //   }
  // }
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container maxWidth="lg">
          <Container disableGutters={true} className={classes.pageContainer}>
            <Container disableGutters={true} className={classes.innerContainer}>
              <div className={classes.root}>
                <Grid container spacing={0}>
                  {/*Text and Image */}
                  <Grid item xs={5}>
                    <Container className={classes.textContainer}>
                      <h1>Create Your Team</h1>
                      <Container>
                        <h4>~ Description of our organization ~</h4>
                        <img src={SignUpImage} alt="hand" />
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Quam, tempora eligendi! Nisi provident quidem
                          ex. Eligendi blanditiis consequatur reiciendis ullam
                          autem ducimus in nulla modi, tenetur doloremque nemo
                          voluptas delectus. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Culpa provident incidunt
                          quia. Eligendi incidunt possimus, cum omnis facere
                          voluptatibus atque! Autem maxime sequi numquam quod
                          quibusdam ratione quasi, nesciunt consequuntur?
                        </p>
                      </Container>
                    </Container>
                  </Grid>
                  {/*Sign up box */}
                  <Grid item xs={6}>
                    <Container
                      disableGutters={true}
                      className={classes.signContainer}
                    >
                      <Container className={classes.signHeader}>
                        <h1>SIGN UP</h1>
                      </Container>
                      {/**renders here differently depending on usertype */}
                      {props.individual ? individual : organization}
                      <Container className={classes.signFooter}>
                        <Button
                          fullWidth={true}
                          color="primary"
                          variant="contained"
                        >
                          Sign Up
                        </Button>
                      </Container>
                    </Container>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Container>
          {/* Footer */}
          <Footer />
        </Container>
      </main>
      {/* End footer */}
    </React.Fragment>
  );
};
export default SignUp;
