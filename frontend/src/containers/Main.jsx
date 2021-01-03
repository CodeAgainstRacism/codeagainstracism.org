import React, { Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../redux-store/actions/auth";
import { removeError } from "../redux-store/actions/errors";
import "normalize.css/normalize.css";


import LandingPage from "../pages/LandingPage";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import ContactUs from "../pages/ContactUs";
import FAQ from "../pages/FAQ";
import About from "../pages/About";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import AccountRecovery from "../pages/AccountRecovery";
import NotFoundPage from "../pages/NotFound";

import UserTypePage from "../pages/UserType";
import AccountInfo from "../pages/AccountInfo";
import YourProjects from "../pages/YourProjects";
import YourTeams from "../pages/YourTeams";
import NewProjectForm from "../pages/NewProjectForm";

const Main = (props) => {
  const { authUser, errors, removeError, currentUser } = props;

  return (
    <Fragment>
      <Switch>
        {/* <Route exact path="/" component={LandingPage} /> */}
        <Route exact path="/" render={(props) => <LandingPage currentUser={currentUser} {...props} />} />
        <Route exact path="/about" component={About} />
        <Route
          path="/projects/new"
          render={(props) => (
            <NewProjectForm
              onAuth={authUser}
              errors={errors}
              removeError={removeError}
              {...props}
            />
          )}
        />
        <Route path="/projects" component={Projects} />
        <Route exact path="/projects/:id" component={ProjectDetails} />
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/faq" component={FAQ} />

        <Route
          path="/account_details"
          component={AccountInfo}
          exact={true}
        />
        <Route
          exact path="/yourprojects"
          render={(props) => <YourProjects currentUser={currentUser} {...props} />}
        />
        <Route path="/yourteams" component={YourTeams} exact={true} />
        <Route
          exact
          path="/accountrecovery"
          component={AccountRecovery}
        />
        <Route
          exact
          path="/login"
          render={(props) => (
            <LogIn
              onAuth={authUser}
              errors={errors}
              removeError={removeError}
              {...props}
            />
          )}
        />
        <Route exact path="/signup" component={UserTypePage} />
        <Route
          path="/signup/:type"
          render={(props) => (
            <SignUp
              onAuth={authUser}
              errors={errors}
              removeError={removeError}
              {...props}
            />
          )}
        />
        <Route exact path="/accountrecovery" component={AccountRecovery} />
        <Route render={() => (<NotFoundPage currentUser={currentUser} />)} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = (storeState) => {
  return {
    currentUser: storeState.currentUser,
    errors: storeState.errors,
  };
};

export default withRouter(
  connect(mapStateToProps, { authUser, removeError })(Main)
);
