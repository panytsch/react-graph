import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Line from "./graph/Line";
import Websocket from "react-websocket";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
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
      data: [8557.89, 8592.8, 8674.95, 8578.84, 8578.84, 8516.91, 8575.48]
    }
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      lineData: data
    };
    this.temp = data.datasets[0].data[data.datasets[0].data.length - 1];
  }
  componentDidMount() {
    setInterval(() => {
      let buff = this.state.lineData;
      buff.datasets[0].data.push(this.temp);
      buff.datasets[0].data.splice(0, 1);
      this.setState({
        lineData: buff
      });
      console.log(this.state.lineData);
    }, 5000);
  }
  handleData(d) {
    let result = JSON.parse(d);
    if (!result.socket_sequence) {
      return;
    }
    this.temp = +result.events[0].price;
    console.log(this.temp);
  }
  render() {
    return (
      <div>
        <Line data={this.state.lineData} />
        Data:{" "}
        <p>
          {
            this.state.lineData.datasets[0].data[
              this.state.lineData.datasets[0].data.length - 1
            ]
          }
        </p>
        <Websocket
          url="wss://api.gemini.com/v1/marketdata/btcusd"
          onMessage={this.handleData.bind(this)}
        />
      </div>
    );
  }
}

export default App;
