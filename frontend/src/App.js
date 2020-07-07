import React from "react";
import axios from "axios";
<<<<<<< Updated upstream
=======
import { BrowserRouter, Route, Link, Switch, NavLink } from "react-router-dom";
import { BACKEND_URL } from "./config";
import "normalize.css/normalize.css"
import "./styles/styles.scss";

import LandingPage from "./components/LandingPage/LandingPage";
import NotFoundPage from "./components/NotFound";
//import NewProjectForm from "./components/Forms/NewProjectForm";
import Create_Project from "./components/Forms/create_proj";
//import NewOrganizationForm from "./components/Forms/NewOrganizationForm";
import Project_overview from "./components/Forms/Project_overview";
>>>>>>> Stashed changes

import { BACKEND_URL } from "./config";

export default class App extends React.Component {
  state = {
    helloWord: undefined,
  };

  componentDidMount() {
    axios.get(BACKEND_URL).then((res) => {
      this.setState({ helloWord: res.data });
    });
  }

  render() {
<<<<<<< Updated upstream
    return <div>{this.state.helloWord}</div>;
  }
}
=======
    return (
      <BrowserRouter>
        <div> 
          <Header />      { /* <Header /> outside of <Switch /> will show up on every page */}
          <div className = "container"> 
          <Switch>
            <Route exact={true} path="/" component={LandingPage}  />
            <Route path="/project/new" component={Create_Project} exact={true} /> 
            <Route path="/organization/new" component={Project_overview} exact={true} />
            <Route exact={true} path="/help" component={HelpPage} />
            <Route component={NotFoundPage} />
          </Switch>
          </div>
        </div>
    </BrowserRouter>
    )
  }
}
//<Route path="/project/new" component={NewProjectForm} exact={true} /> 
//line 47 original was just div
//<Route path="/organization/new" component={NewOrganizationForm} exact={true} />
export default App;
>>>>>>> Stashed changes
