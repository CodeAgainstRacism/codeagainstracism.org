import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import theme   from "./buttonTheme";  

import App from "./App";

const routing = (
  <ThemeProvider theme = {theme}>
  <Router>
    <Route exact path="/" component={App} />
  </Router>
  </ThemeProvider>
);

ReactDOM.render(routing, document.getElementById("root"));

serviceWorker.unregister();
