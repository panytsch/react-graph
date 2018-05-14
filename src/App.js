import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LineEx from "./graph/Line";
import SocketLine from "./graph/SocketLine";
import Websocket from "react-websocket";
import { Line } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";

// Disable animating charts by default.
defaults.global.animation = false;

const maxLength = 10;
const data = {
  labels: [
    // new Date(1526065839024).toLocaleTimeString(),
    // new Date(1526065849034).toLocaleTimeString(),
    // new Date(1526065859044).toLocaleTimeString(),
    // new Date(1526065869054).toLocaleTimeString(),
    // new Date(1526065879064).toLocaleTimeString(),
    // new Date(1526065889074).toLocaleTimeString(),
    // new Date(1526065899084).toLocaleTimeString()
  ],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      // data: [8557.89, 8592.8, 8674.95, 8578.84, 8578.84, 8516.91, 8575.48]
      data: []
    }
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineData: data
    };
  }
  handleData(d) {
    let result = JSON.parse(d);
    if (!result.socket_sequence) {
      return;
    }

    let tempData = +result.events[0].price;
    let newData = data.datasets[0].data;
    newData.push(tempData);
    data.datasets[0].data = newData;
    let tempTime = new Date(result.timestampms).toLocaleTimeString();
    let newTime = data.labels;
    newTime.push(tempTime);
    data.labels = newTime;

    if (this.state.lineData.datasets[0].data.length > maxLength) {
      data.labels.shift();
      data.datasets[0].data.shift();
    }
    this.setState({ lineData: data });
  }
  render() {
    return (
      <div>
        <SocketLine data={this.state.lineData} displayName="Currency" />
        {/* <Line data={this.state.lineData} /> */}
        <Websocket
          url="wss://api.gemini.com/v1/marketdata/btcusd"
          onMessage={this.handleData.bind(this)}
        />
      </div>
    );
  }
}

export default App;
