import React from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

import LandingPage from "./components/LandingPage/LandingPage";
import NotFoundPage from "./components/NotFound";
import NewProjectForm from "./components/Forms/NewProjectForm";
import NewOrganizationForm from "./components/Forms/NewOrganizationForm";

const Header = () => (
  <header className="navbar">
    <h1 className="nav__brand">Code Against Racism</h1>
    <div className="nav__links">
      <NavLink
        to="/"
        activeClassName="is-active"
        exact={true}
        className="nav__item"
      >
        Home
      </NavLink>{" "}
      {/*activeClassName is only going to get applied to the link when we're on that page. */}
      <NavLink
        to="/project/new"
        activeClassName="is-active"
        exact={true}
        className="nav__item"
      >
        Create a New Project
      </NavLink>
      <NavLink
        to="/organization/new"
        activeClassName="is-active"
        exact={true}
        className="nav__item"
      >
        Create a New Organization
      </NavLink>
      <NavLink
        to="/help"
        activeClassName="is-active"
        exact={true}
        className="nav__item"
      >
        Help
      </NavLink>
    </div>
  </header>
);

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
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
      </BrowserRouter>
    );
  }
}

export default App;
