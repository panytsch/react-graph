import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Websocket from "react-websocket";
import { defaults } from "react-chartjs-2";

defaults.global.animation = false;

class LiveChart extends Component {
  state = {
    data: undefined
  };
  length = 10;
  handleData(data) {
    let result = JSON.parse(data);
    let dataToChart =
      (this.state.data && this.state.data.datasets[0].data) || [];
    let encodedTimes = (this.state.data && this.state.data.labels) || [];
    let encodedTime = new Date(result.timestampms).toLocaleTimeString();
    encodedTimes.push(encodedTime);
    dataToChart.push(+result.events[0].price);
    if (encodedTimes.length > this.length) {
      encodedTimes.splice(0, 1);
      dataToChart.splice(0, 1);
    }
    console.log(encodedTimes, dataToChart);
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
            pointBorderWidth: 5,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataToChart
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

export default LiveChart;
