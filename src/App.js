import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LineEx from "./graph/Line";
import SocketLine from "./graph/SocketLine";
import Price from "./currency/Price";
import Calculator from "./currency/Calculator";

class App extends Component {
  render() {
    return (
      <div>
        {/* <Price /> */}
        <Calculator />
        {/* <SocketLine /> */}
      </div>
    );
  }
}

export default App;
