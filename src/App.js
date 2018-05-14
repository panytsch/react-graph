import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LineEx from "./graph/Line";
import SocketLine from "./graph/SocketLine";
import Websocket from "react-websocket";
import { Line } from "react-chartjs-2";

class App extends Component {
  render() {
    return (
      <div>
        <SocketLine />
      </div>
    );
  }
}

export default App;
