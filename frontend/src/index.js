import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
