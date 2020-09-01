import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./redux-store";
import { BrowserRouter } from "react-router-dom";

import "normalize.css/normalize.css";
import NavBar from "./components/NavBar";
import Main from "./containers/Main";

const reduxStore = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <BrowserRouter>
          <div>
            <NavBar />
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
