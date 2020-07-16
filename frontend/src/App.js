import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

import LandingPage from "./pages/LandingPage/LandingPage";
import NotFoundPage from "./pages/NotFound";
import NewProjectForm from "./pages/Forms/NewProjectForm";
import NewOrganizationForm from "./pages/Forms/NewOrganizationForm";
import NavBar from "./components/NavBar";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <div>
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
