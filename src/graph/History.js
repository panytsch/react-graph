import React from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Line } from "react-chartjs-2";
import axios from "axios";
const API = "https://api.coindesk.com/v1/bpi/historical/close.json";
const lineData = {
  data: {
    labels: [],
    datasets: [
      {
        label: "BTC",
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
        data: []
      }
    ]
  }
};

const day = 86400000;
const week = day * 7;
const month = new Date(2018, new Date().getMonth(), 0).getDate() * day;
const year = new Date(2018, 2, 0).getDate() === 28 ? 365 * day : 366 * day;
let thisDayNum = new Date().valueOf() - day;
const getStringDate = num => {
  let time = new Date(num);
  let arr = [];
  arr.push(time.getFullYear());
  arr.push(time.getMonth());
  arr.push(time.getDate());
  arr[1] = arr[1] < 10 ? "0" + arr[1] : arr[1];
  arr[2] = arr[2] < 10 ? "0" + arr[2] : arr[2];
  return arr.join("-");
};

let thisDay = getStringDate(thisDayNum);
class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.fetchData(thisDay, getStringDate(thisDayNum - week));
  }
  fetchData(end, start) {
    let _this = this;
    axios.get(`${API}?start=${start}&end=${end}`).then(res => {
      let graphLabels = [],
        graphData = [],
        { bpi } = res.data;
      Object.entries(bpi).map(i => {
        graphLabels.push(i[0]);
        graphData.push(i[1]);
      });
      lineData.data.labels = graphLabels;
      lineData.data.datasets[0].data = graphData;
      _this.setState(Object.assign(_this.state, lineData));
    });
  }
  render() {
    return (
      <div>
        <Form
          onSubmit={() => {}}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <Field name="dateStamp">
                {obj => {
                  return (
                    <select {...obj.input}>
                      <option value={week}>Week</option>
                      <option value={day}>Day</option>
                      <option value={month}>Month</option>
                      <option value={year}>Year</option>
                    </select>
                  );
                }}
              </Field>
              <OnChange name="dateStamp">
                {v => {
                  this.fetchData(thisDay, getStringDate(thisDayNum - v * 2));
                }}
              </OnChange>
            </form>
          )}
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

export default History;
