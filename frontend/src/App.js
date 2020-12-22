import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./redux-store";
import { setAuthorizationToken, setCurrentUser } from "./redux-store/actions/auth";
import jwtDecode from "jwt-decode"; // decode the jwt's payload to object
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import "normalize.css/normalize.css";
import NavBar from "./components/NavBar";
import Main from "./containers/Main";

const reduxStore = configureStore();

// this code runs when page loads/reloads
if (localStorage.jwtToken) {
  // add jwtToken to all future Axios request
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering with the key of jwtToken in localStorage.
  try {
    // if we got the right token
    reduxStore.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    console.log(jwtDecode(localStorage.jwtToken));      // this one has password in it
  } catch (e) {
    // if tampering is detected, forcefully log users out before they can send the request
    reduxStore.dispatch(setCurrentUser({}));
  }
}


const App = (props) => (
  // TODO: change this to functional component
  <Provider store={reduxStore}>
    <BrowserRouter>
      <ScrollToTop>
        <div>
          <NavBar />
          <Main />
        </div>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

export default App;
