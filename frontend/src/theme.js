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
});

export default theme;

// "#222831"      dark blue
