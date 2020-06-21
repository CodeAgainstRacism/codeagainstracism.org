import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./App";

const routing = (
  <Router>
    <Route exact path="/" component={App} />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

serviceWorker.unregister();
