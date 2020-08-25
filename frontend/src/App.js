import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "normalize.css/normalize.css";

import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Projects from "./pages/Projects";
import News from "./pages/News";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import NotFoundPage from "./pages/NotFound";
import NewProjectForm from "./pages/NewProjectForm";
import NavBar from "./components/NavBar";
import AccountInfo from "./pages/AccountInfo";
import YourProjects from "./pages/YourProjects";
import YourTeams from "./pages/YourTeams";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <div>
            <Switch>
              <Route exact={true} path="/" component={LandingPage} />
              <Route path="/about" component={About} exact={true} />
              <Route path="/projects" component={Projects} exact={true} /> {/**originally projects */}
              <Route path="/news" component={News} exact={true} />
              <Route path="/faq" component={FAQ} exact={true} />
              <Route path="/signup" component={SignUp} exact={true} />
              <Route path="/create_projects" component={NewProjectForm} exact={true} />
              <Route path="/account_details" component={AccountInfo} exact={true} />
              <Route path="/your_projects" component={YourProjects} exact={true} />
              <Route path="/your_teams" component={YourTeams} exact={true} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
