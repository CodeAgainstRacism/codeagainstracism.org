import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Link, Switch, NavLink } from "react-router-dom";
import { BACKEND_URL } from "./config";
import "normalize.css/normalize.css"
import "./styles/styles.scss";

import LandingPage from "./components/LandingPage/LandingPage";
import NotFoundPage from "./components/NotFound";
//import NewProjectForm from "./components/Forms/NewProjectForm";
import Create_Project from "./components/Forms/create_proj";
import NewOrganizationForm from "./components/Forms/NewOrganizationForm";

const HelpPage = () => (
  <div>
    Help Page
  </div>
)

const Header = () => (    // Functional Component 
  <header className="navbar">
    <h1 className="nav__brand">Code Against Racism</h1>
    <div className="nav__links">
      <NavLink to="/" activeClassName="is-active" exact={true} className="nav__item">Home</NavLink>     {/*activeClassName is only going to get applied to the link when we're on that page. */}
      <NavLink to="/project/new" activeClassName="is-active" exact={true} className="nav__item">Create a New Project</NavLink>
      <NavLink to="/organization/new" activeClassName="is-active" exact={true} className="nav__item">Create a New Organization</NavLink>
      <NavLink to="/help" activeClassName="is-active" exact={true} className="nav__item">Help</NavLink>
    </div>
  </header>
)

class App extends React.Component {
  state = {
    helloWord: undefined,
  };

  componentDidMount() {
    axios.get(BACKEND_URL).then((res) => {
      this.setState({ helloWord: res.data });
    });
  }

  
  render() {
    return (
      <BrowserRouter>
        <div> 
          <Header />      { /* <Header /> outside of <Switch /> will show up on every page */}
          <div className = "container"> 
          <Switch>
            <Route exact={true} path="/" component={LandingPage}  />
            <Route path="/project/new" component={Create_Project} exact={true} /> 
            <Route path="/organization/new" component={NewOrganizationForm} exact={true} />
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
export default App;