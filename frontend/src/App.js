import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

import LandingPage from "./components/LandingPage/LandingPage";
import NotFoundPage from "./components/NotFound";
import NewProjectForm from "./components/Forms/NewProjectForm";
import NewOrganizationForm from "./components/Forms/NewOrganizationForm";
import NavBar from "./components/NavBar";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact={true} path="/" component={LandingPage} />
              <Route
                path="/project/new"
                component={NewProjectForm}
                exact={true}
              />
              <Route
                path="/organization/new"
                component={NewOrganizationForm}
                exact={true}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
