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
      dark: "#323b4a", // dark grey of sidebar
      default: "#F2F2F2", // light gray in background
    },
    text: {
      primary: "#000", // black
      secondary: "#fff", // white
    },
  },
  navbar: {
    default: "#222831",
    height: "5vh",
  },
  sidebar: {
    color: "323b4a",
  },
  pageContent: {
    height: "90vh",
  },
  footer: {
    height: "5vh",
  },
  heroCTAButton: {
    left: "#205D67",
    right: "#DB5375",
  },

  overrides: {
    MuiLink: {
      root: {
        cursor: "pointer",
        // fontWeight: "bold",
      },
    },

    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },

    MuiTextField: {
      root: {
        backgroundColor: "#fff",
      },
    },

    MuiInputLabel: {
      root: {
        color: "#adadad",
      },
    },
    MuiToolbar: {
      regular: {
        "@media (min-width: 600px)": {
          minHeight: "2.5rem",
        },
      },
    },
  },
  //Global theme for textfields
  props: {
    MuiTextField: {
      size: "small",
      id: "outlined-basic",
      variant: "outlined",
      fullWidth: true,
    },
  },
});

export default theme;
