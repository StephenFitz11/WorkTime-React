import React from "react";
import _ from "lodash";
import FormClass from "./../common/form";
import FormItem from "antd/lib/form/FormItem";
import { Form, Button, Col, Row, Select } from "antd";

import http from "../../services/httpService";
import { apiClientRoute, apiTimeRoute } from "../../config/default.json";

const { Option } = Select;

class UnWrappedTimeForm extends FormClass {
  constructor(props) {
    super(props);
    this.state = {
      children: []
    };
  }

  async componentDidMount() {
    if (this.props.user.userType === "Employee") {
      const { data } = await http.get(`${apiClientRoute}?empClients=true`);
      console.log(data);

      const names = data.clients.map(item => (
        <Option key={item._id}>{item.clientCompanyName}</Option>
      ));
      this.setState({ children: names }, () => {
        console.log(this.state.children);
      });
    } else {
      const { data } = await http.get(apiClientRoute);

      const names = data.map(item => (
        <Option key={item._id}>{item.clientCompanyName}</Option>
      ));
      this.setState({ children: names }, () => {
        console.log(this.state.children);
      });
    }
  }

  async doSubmit() {
    let values = this.props.form.getFieldsValue();
    values.mins = Number(values.mins) + Number(values.hours) * 60;

    const { user } = this.props;
    const { client, date, mins, description } = values;

    const newTime = {
      parent: user.parent || user._id,
      client,
      date: date._d,
      timeMins: mins,
      description
    };

    await http.post(apiTimeRoute, newTime);
    window.location = "/app/time";
  }

  render() {
    const options = this.state.children;
    const hours = _.range(9);
    const mins = ["00", "15", "30", "45"];
    return (
      <React.Fragment>
        <Form>
          <Row gutter={16}>
            <Col span={6}>
              {this.renderSearchableSelect(options, "Client", true)}
            </Col>
            <Col span={6}>{this.renderDatePicker("Date", true)}</Col>
            <Col span={6}>
              {this.renderSelect(
                hours.map(m => <Option key={m}>{m}</Option>),
                "Hours",
                true,
                "Hours worked"
              )}
            </Col>
            <Col span={6}>
              {this.renderSelect(
                mins.map(m => <Option key={m}>{m}</Option>),
                "Mins",
                true,
                "Minutes"
              )}
            </Col>
          </Row>
          <Row gutter={16} />

          <Row gutter={16}>
            <Col span={24}>
              {this.renderDescriptionBox(
                "Description",

                "Additional information (optional, 400 characters or less)"
              )}
            </Col>
          </Row>

          <Button onClick={this.handleSubmit} type="primary">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

const TimeForm = Form.create({ name: "time_form" })(UnWrappedTimeForm);

export default TimeForm;
