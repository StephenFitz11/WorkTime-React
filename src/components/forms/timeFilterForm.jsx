import React, { Component } from "react";
import FormClass from "./../common/form";
import { Form, DatePicker, Button } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;

class FilterForm extends FormClass {
  state = {};
  onChange(dates, dateStrings) {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  }

  doSubmit() {
    console.log("Here");
  }
  render() {
    return (
      <React.Fragment>
        <Form layout="inline">
          <Form.Item>
            <RangePicker
              style={{ textAlign: "center" }}
              ranges={{
                Today: [moment(), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month")
                ]
              }}
              onChange={this.onChange}
            />
          </Form.Item>
          <Button shape="circle" icon="search" onClick={this.handleSubmit} />
        </Form>
      </React.Fragment>
    );
  }
}

const TimeFilterForm = Form.create({ name: "time_filter_form" })(FilterForm);

export default TimeFilterForm;
