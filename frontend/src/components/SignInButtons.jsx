import React from "react";
import {
  createMuiTheme,
  useTheme,
  MuiThemeProvider,
  Button,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import SvgIcon from "@material-ui/core/SvgIcon";

/**Icon Button Colors */
const blackTheme = createMuiTheme({ palette: { primary: { main: "#000" } } });
const redTheme = createMuiTheme({ palette: { primary: { main: "#ff411c" } } });
const blueTheme = createMuiTheme({ palette: { primary: { main: "#1c55ff" } } });

const SignInButtons = (props) => {
  const { action } = props;
  const theme = useTheme();
  const options = [
    {
      name: "Github",
      icon: <GitHubIcon />,
      theme: blackTheme,
    },
    {
      name: "Google",
      icon: (
        <SvgIcon {...props}>
          <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
        </SvgIcon>
      ),
      theme: redTheme,
    },
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      theme: blueTheme,
    },
  ];

  return (
    <React.Fragment>
      {options.map((option) => (
        <MuiThemeProvider theme={option.theme}>
          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            style={{ margin: theme.spacing(1, 0, 0) }}
            startIcon={option.icon}
          >
            {action} with {option.name}
          </Button>
        </MuiThemeProvider>
      ))}
    </React.Fragment>
  );
};

export default SignInButtons;
