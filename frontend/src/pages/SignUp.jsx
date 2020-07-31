import React from "react";
import Plan from "../assets/plan.svg";
import Blogging from "../assets/blogging.svg";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  flexBoxCenter: {
    display: "flex",
    alignContent: "center",
    textAlign: "center"
  },
  headerStyle: {
    marginTop: "1rem"
  }, 
  contentCenter: {
    display: "flex",
    justifyContent: "center",
  },
  textStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    color: "white",
    backgroundColor: "black",
    width: "10rem",
  },
  radioStyle: {
    '&$checked': {
      color: "black"
    }
  },
  checked: {},
}));

const UserTypePage = () => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Container maxWidth="lg" direction="column">
      <Grid item container className={classes.contentCenter}>
        <Grid item xs={12} sm={8} container direction="column">
          <Grid item className={classes.flexBoxCenter} direction="column">
            <Typography
              variant="h3"
              gutterBottom
              className={classNames(classes.textStyle, classes.headerStyle)}
            >
              Welcome to Code Against Racism
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
            >
              We are so excited to see you join our teams of warriors!
            </Typography>
          </Grid>
          <Grid item container>
            <Grid item xs={12} sm={6}>
              <CardActionArea classeName={classes.textCenter}>
                <img src={Blogging} alt="blogging" />
                <Typography
                  variant="paragraph"
                  className={classes.textStyle}
                >
                  I want to join an existing team
                </Typography>
              </CardActionArea>
              <Radio
                className={classNames(classes.contentCenter, classes.radioStyle, classes.checked)}
                disableRipple="True"
                checked={selectedValue === "join"}
                onChange={handleChange}
                value="join"
                inputProps={{ "aria-label": "join" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardActionArea>
                <img src={Plan} alt="plan" />
                <Typography
                  variant="paragraph"
                  className={classes.textStyle}
                >
                  I want to create a new team
                </Typography>
              </CardActionArea>
              <Radio
                className={classNames(classes.contentCenter, classes.radioStyle, classes.checked)}
                disableRipple="True"
                checked={selectedValue === "create"}
                onChange={handleChange}
                value="create"
                inputProps={{ "aria-label": "create" }}
              />
            </Grid>
          </Grid>
          <Grid item className={classes.contentCenter}>
            <Button
              variant="contained"
              className={classes.buttonStyle}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserTypePage;

{
// import React from "react";
//
// class SignUp extends React.Component {
//   render() {
//     return (
//       <div>
//         <form className="auth-form-container">
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
//
// export default SignUp;
}
