import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SocketLine from "./graph/SocketLine";
import History from "./graph/History";
import Price from "./currency/Price";
import Calculator from "./currency/Calculator";
import DIVA from "./Styles";

class App extends Component {
  render() {
    return (
      <DIVA>
        <Price />
        <Calculator />
        <History />
        <SocketLine />
      </DIVA>
    );
  }
}

export default App;
