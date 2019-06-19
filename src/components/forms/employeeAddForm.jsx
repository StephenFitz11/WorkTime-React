import React, { Component } from "react";
import { Form, Button, Col, Row, Select, message } from "antd";
import FormClass from "./../common/form";

import { apiClientRoute, apiEmployeeRoute } from "../../config/default.json";
import http from "../../services/httpService";
const { Option } = Select;

class UnWrappedEmployeeAddForm extends FormClass {
  constructor(props) {
    super(props);
    this.state = { children: [] };
  }

  // TODO: Delete employee maker before production. Used to create dummy employees for testing
  async employeeMaker(count) {
    let rate = 250;
    for (let i = 0; i < count; i++) {
      const newEmployee = {
        companyName: `Employee LLC ${i}`,
        email: `email${i}@test.com`,
        firstName: `Name ${i}`,
        lastName: `Name ${i + 1}`,
        phone: "867-5309",
        dayRate: rate,
        clients: "5d08ea6bb8706a5ff8af5e9c"
      };
      rate += 25;
      await http.post(apiEmployeeRoute, newEmployee);
    }
  }

  async componentDidMount() {
    // this.employeeMaker(5);
    const { data } = await http.get(apiClientRoute);
    const names = data.map(item => (
      <Option key={item._id}>{item.clientCompanyName}</Option>
    ));

    this.setState({ children: names }, () => {
      console.log(this.state.children);
    });
  }

  async doSubmit() {
    const {
      companyName,
      firstName,
      lastName,
      phone,
      email,
      dayRate,
      description,
      clients
    } = this.props.form.getFieldsValue();

    const newEmployee = {
      companyName,
      firstName,
      lastName,
      phone,
      email,
      dayRate,
      description,
      clients
    };
    try {
      // TODO: Make a way to display a notifcation before the reload.
      await http.post(apiEmployeeRoute, newEmployee);
      window.location = "/app/employees";
      message.success(
        "Employee Added! An email has been sent to them with login instructions."
      );
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        message.error(ex.response.data);
      }
    }

    console.log(this.props.form.getFieldsValue());
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const clients = this.state.children;

    return (
      <React.Fragment>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={6}>
              {this.renderInput(
                "firstName",
                "Employee's Name",
                "First Name",
                true
              )}
            </Col>
            <Col span={6}>
              {this.renderInput("lastName", "Last Name", "Last Name", true)}
            </Col>
            <Col span={12}>
              {this.renderInput(
                "companyName",
                "Employee's LLC (Optional)",
                "LLC Name"
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderInput("email", "Employee Email", "Email", true)}
            </Col>
            <Col span={12}>
              {this.renderInput(
                "phone",
                "Employees Phone Number (Optional)",
                "Phone"
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderSelect(clients, "Clients", "clients", "multiple")}
            </Col>
            <Col span={12}>
              {this.renderFormatNumberInput("Day Rate", "dayRate", null, true)}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {this.renderDescriptionBox(
                "Description",
                "description",
                "Additional information (optional)"
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

const EmployeeAddForm = Form.create()(UnWrappedEmployeeAddForm);

export default EmployeeAddForm;
