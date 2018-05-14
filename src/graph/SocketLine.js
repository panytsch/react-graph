import React from "react";
import Websocket from "react-websocket";
import { Line } from "react-chartjs-2";

class LiveChart extends React.Component {
  chartData = [];
  chartTime = [];
  length = 20;
  state = {
    data: null
  };

  handleData(dat) {
    let result = JSON.parse(dat);
    if (!result.socket_sequence) {
      return;
    }
    let encodedTime = new Date(result.timestampms).toLocaleTimeString();
    this.chartTime.push(encodedTime);
    this.chartData.push(+result.events[0].price);
    if (this.chartTime.length > this.length) {
      this.chartTime.splice(0, 1);
      this.chartData.splice(0, 1);
    }
    console.log(this.chartTime, this.chartData);
    this.setState({
      data: {
        labels: [...this.chartTime],
        datasets: [
          {
            label: "BTC Real-time",
            fill: true,
            lineTension: 0.1,
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
            data: [...this.chartData]
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
