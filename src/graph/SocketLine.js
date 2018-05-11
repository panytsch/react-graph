import React from "react";
import { Line } from "react-chartjs-2";

class SocketLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
    this.displayName = props.displayName || "Current currency";
  }

  render() {
    return (
      <div>
        <h2>Line Example</h2>
        <Line data={this.state.data} />
      </div>
    );
  }
}

export default SocketLine;
