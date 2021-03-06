import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Websocket from "react-websocket";
let arr = [];
class Chart extends Component {
  state = {
    data: undefined
  };

  handleData(data) {
    let result = JSON.parse(data);
    let dataToChart = [];
    let encodedTimes = [];

    let encodedTime = new Date(result.timestampms).toLocaleTimeString();
    while (encodedTimes.length < 20) {
      encodedTimes.push(encodedTime);
    }
    encodedTimes.splice(0, 1);
    encodedTimes.splice(19, 0, encodedTime);
    arr.push(+result.events[0].price);
    if (arr.length > 20) {
      arr.shift();
    }
    console.log("igor array:" + dataToChart);
    console.log("my array:" + arr);
    this.setState({
      data: {
        labels: encodedTimes,
        datasets: [
          {
            label: "BTC Real-time",
            fill: true,
            lineTension: 0.05,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: arr
          }
        ]
      }
    });
  }

  render() {
    return (
      <div>
        <Websocket
          url="wss://api.gemini.com/v1/marketdata/btcusd"
          onMessage={this.handleData.bind(this)}
        />
        {this.state.data && (
          <Line
            width={90}
            height={30}
            data={this.state.data}
            options={{
              position: "right",
              maintainAspectRatio: true
            }}
          />
        )}
      </div>
    );
  }
}

export default Chart;
