import React from "react";
import { Line } from "react-chartjs-2";

class LineExample extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      data: props.data
    };
  }

  displayName: "LineExample";
  render() {
    return (
      <div>
        <h2>Line Example</h2>
        <Line data={this.state.data} />
      </div>
    );
  }
}

export default LineExample;
