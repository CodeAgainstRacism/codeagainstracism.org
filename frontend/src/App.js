import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "normalize.css/normalize.css";
import ScrollToTop from "./components/ScrollToTop";

import LandingPage from "./pages/LandingPage";
import Projects from "./pages/Projects";
import News from "./pages/News";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import AccountRecovery from "./pages/AccountRecovery";
import NotFoundPage from "./pages/NotFound";
import NavBar from "./components/NavBar";

import UserTypePage from "./pages/UserType";
import AccountInfo from "./pages/AccountInfo";
import YourProjects from "./pages/YourProjects";
import YourTeams from "./pages/YourTeams";
import NewProjectForm from "./pages/NewProjectForm";

// import Footer from "./components/Footer";


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/news" component={News} />
              <Route exact path="/faq" component={FAQ} />
              <Route exact path="/login" component={LogIn} />
              <Route path="/newProjectForm" component={NewProjectForm} exact={true} />
              <Route path="/account_details" component={AccountInfo} exact={true} />
              <Route path="/your_projects" component={YourProjects} exact={true} />
              <Route path="/your_teams" component={YourTeams} exact={true} />
              <Route
                exact
                path="/accountrecovery"
                component={AccountRecovery}
              />
              <Route exact path="/signup" component={UserTypePage} />
              <Route
                path="/signup/:type"
                render={(props) => <SignUp {...props} />}
              />
              <Route component={NotFoundPage} />
            </Switch>
            {/* <Footer /> */}
          </div>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default App;
