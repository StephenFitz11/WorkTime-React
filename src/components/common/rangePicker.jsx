import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function onChange(dates, dateStrings) {
  console.log("From: ", dates[0], ", to: ", dates[1]);
  console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
}

const RangePick = () => {
  return (
    <React.Fragment>
      <RangePicker
        format="MM-DD-YYYY"
        ranges={{
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")]
        }}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

export default RangePick;
