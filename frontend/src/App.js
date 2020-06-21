import React from "react";
import axios from "axios";

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
    return <div>{this.state.helloWord}</div>;
  }
}
