import React from "react";
import { BrowserRouter, Route, Link, Switch, NavLink } from "react-router-dom";
import axios from "axios";

import { BACKEND_URL } from "./config";
import "normalize.css/normalize.css"
import "./styles/styles.scss";

import LandingPage from "./components/LandingPage/LandingPage";
import NotFoundPage from "./components/NotFound";

const HelpPage = () => (
  <div>
    Help Page
  </div>
)

const Header = () => (    // Functional Component 
  <header>
    <h1>Code Against Racism</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>     {/*activeClassName is only going to get applied to the link when we're on that page. */}
    {/* <NavLink to="/create" activeClassName="is-active" exact={true}>Add </NavLink> */}
    {/* <NavLink to="/edit" activeClassName="is-active" exact={true}>Edit </NavLink> */}
    <NavLink to="/help" activeClassName="is-active" exact={true}>Help</NavLink>
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
          <Switch>
            <Route exact={true} path="/" component={LandingPage}  />
            {/* <Route path="/create" component={} exact={true} />   */}
            {/* <Route path="/edit/:id" component={} exact={true} />     id is URL parameter. id of a transaction */}
            <Route exact={true} path="/help" component={HelpPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
    </BrowserRouter>
    )
  }
}

export default App;