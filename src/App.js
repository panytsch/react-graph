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
      data: [65, 59, 80, 81, 56, 55, 40]
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
  }
  handleData(d) {
    let result = JSON.parse(d);
    this.setState({
      userData: result,
      lineData: this.state.lineData.datasets[0].data.push(
        result.events[0].price
      )
    });
    // console.log(result.events[0].price);
    // data.datasets[0].data.push(result.events[0].price);
  }
  render() {
    return (
      <div>
        <Line data={this.state.lineData} />
        Data:{" "}
        <p>{this.state.userData && this.state.userData.events[0].price}</p>
        {/* {console.log(
          this.state.userData && this.state.userData.events[0].price
        )} */}
        <Websocket
          url="wss://api.gemini.com/v1/marketdata/btcusd"
          onMessage={this.handleData.bind(this)}
        />
      </div>
    );
  }
}

export default App;
