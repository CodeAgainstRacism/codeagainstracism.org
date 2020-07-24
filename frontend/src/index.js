import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
<<<<<<< HEAD
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
=======

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
>>>>>>> a53ff1dee3614355503f2e36f50cd12cfa71aa2e

serviceWorker.unregister();
