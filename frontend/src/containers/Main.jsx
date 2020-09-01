import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../redux-store/actions/auth";
import LandingPage from "../pages/LandingPage";
import Projects from "../pages/Projects";
import News from "../pages/News";
import FAQ from "../pages/FAQ";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import AccountRecovery from "../pages/AccountRecovery";
import UserTypePage from "../pages/UserType";
import NotFoundPage from "../pages/NotFound";

const Main = (props) => {
  const { authUser } = props;
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/news" component={News} />
        <Route exact path="/faq" component={FAQ} />
        <Route
          exact
          path="/login"
          render={(props) => <LogIn onAuth={authUser} {...props} />}
        />
        <Route exact path="/signup" component={UserTypePage} />
        <Route
          path="/signup/:type"
          render={(props) => <SignUp onAuth={authUser} {...props} />}
        />
        <Route exact path="/accountrecovery" component={AccountRecovery} />
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

export default withRouter(connect(mapStateToProps, { authUser })(Main));
