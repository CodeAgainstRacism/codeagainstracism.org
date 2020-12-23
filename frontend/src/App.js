import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./redux-store";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import NavBar from "./components/NavBar";
import Main from "./containers/Main";

import "normalize.css/normalize.css";

const reduxStore = configureStore();

class App extends React.Component {
  // TODO: change this to functional component
  render() {
    return (
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
  }
}

export default App;
