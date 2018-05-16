import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SocketLine from "./graph/SocketLine";
import History from "./graph/History";
import Price from "./currency/Price";
import Calculator from "./currency/Calculator";

class App extends Component {
	render() {
		return (
			<div>
				<Price />
				<Calculator />
				<History />
				<SocketLine />
			</div>
		);
	}
}

export default App;
