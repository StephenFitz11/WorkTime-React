import React, { Component } from "react";

import { TimePicker } from "antd";
import moment from "moment";

class TimePick extends Component {
  onChange(time, timeString) {
    console.log(time, timeString);
  }

  render() {
    return (
      <TimePicker
        onChange={this.onChange}
        defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
      />
    );
  }
}

export default TimePick;
