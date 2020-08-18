import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import Projects from "../pages/Projects";
import News from "../pages/News";
import FAQ from "../pages/FAQ";
import About from "../pages/About";
import NotFoundPage from "../pages/NotFound";
import UserTypePage from "../pages/UserType";

const Main = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/news" component={News} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/userType" component={UserTypePage} />
        <Route
          exact
          path="/signUp/Individual"
          component={(props) => <SignUp individual {...props} />}
        />
        <Route
          exact
          path="/signUp/Organization"
          render={(props) => <SignUp organization {...props} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (storeState) => {
  return {
    currentUser: storeState.currentUser,
  };
};

export default withRouter(connect(mapStateToProps)(Main));
