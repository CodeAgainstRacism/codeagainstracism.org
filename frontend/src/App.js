import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./redux-store";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import Main from "./containers/Main";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

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
