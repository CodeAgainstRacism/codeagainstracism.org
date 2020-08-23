import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "normalize.css/normalize.css";

import LandingPage from "./pages/LandingPage";
import Projects from "./pages/Projects";
import News from "./pages/News";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import AccountRecovery from "./pages/AccountRecovery";
import NotFoundPage from "./pages/NotFound";
import NavBar from "./components/NavBar";
import UserTypePage from "./pages/UserType";
import Footer from "./components/Footer";
import AuthForm from "./components/AuthForm";

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
              <Route exact path="/news" component={News} />
              <Route exact path="/faq" component={FAQ} />
              <Route exact path="/userType" component={UserTypePage} />

              <Route
                exact
                path="/login"
                component={(props) => (
                  <AuthForm login message="Welcome Back!" {...props} />
                )}
              />
              <Route
                exact
                path="/signUp/Individual"
                render={(props) => (
                  <AuthForm
                    signup
                    individual
                    message="Create A Team"
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/signUp/Organization"
                render={(props) => (
                  <AuthForm
                    signup
                    organization
                    action="Sign Up"
                    message="Create A Team"
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/accountrecovery"
                component={AccountRecovery}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
