import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import News from "./pages/News";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import NotFoundPage from "./pages/NotFound";
import NavBar from "./components/NavBar";
import UserTypePage from "./pages/UserType";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/projects/:id" component={ProjectDetails} />

              <Route exact path="/news" component={News} />
              <Route exact path="/faq" component={FAQ} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/userType" component={UserTypePage} />
              <Route
                exact
                path="/signUp/Individual"
                render={() => <SignUp individual />}
              />
              <Route
                exact
                path="/signUp/Organization"
                render={() => <SignUp organization />}
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
