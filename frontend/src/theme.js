import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFC43D", // for Learn More button, yellow
    },
    secondary: {
      main: "#F96D00", // accent buttons, orange
    },
    background: {
      default: "#F2F2F2", // light gray in background
    },
    text: {
      primary: "#000", // black
      secondary: "#fff", // white
    },
  },
  navbar: {
    default: "#222831",
  },
  heroCTAButton: {
    left: "#205D67",
    right: "#DB5375",
  },
  overrides: {
    MuiLink: {
      root: {
        cursor: "pointer",
      },
    },
  },
  //Global theme for textfields
  props: {
    MuiTextField: {
      color: "#FFC43D",
      size: "small",
      id: "outlined-basic",
      variant: "outlined",
      fullWidth: true,
    },
  }

});

export default theme;
