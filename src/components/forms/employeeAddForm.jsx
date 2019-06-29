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
    const fNames = [
      "Emily",
      "Hannah",
      "Madison",
      "Ashley",
      "Sarah",
      "Alexis",
      "Samantha",
      "Jessica",
      "Elizabeth",
      "Taylor"
    ];
    const lNames = [
      "Parris",
      "Paulette",
      "Raena",
      "Samiya",
      "Stephenie",
      "Stormi",
      "Takara",
      "Taniah",
      "Taylin",
      "Theodora",
      "Ursula",
      "Vada"
    ];
    const clients = [
      "5d0fa91205eb7a488cb04523",
      "5d0fa91205eb7a488cb04524",
      "5d0fa91205eb7a488cb04525",
      "5d0fa91205eb7a488cb04526",
      "5d0fa91205eb7a488cb04527",
      "5d0faa8514302f9c1cb32d2c"
    ];
    let rate = 250;
    for (let i = 0; i < count; i++) {
      const fName = fNames[Math.floor(Math.random() * fNames.length)];
      const lName = lNames[Math.floor(Math.random() * lNames.length)];
      const fClient = clients[Math.floor(Math.random() * clients.length)];
      const lClient = clients[Math.floor(Math.random() * clients.length)];

      const newEmployee = {
        companyName: `Employee LLC ${i}`,
        email: `email${i + 7}@test.com`,
        firstName: fName,
        lastName: lName,
        phone: "867-5309",
        dayRate: rate,
        clients: [fClient, lClient]
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
    const options = this.state.children;

    return (
      <React.Fragment>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={6}>
              {this.renderOpInput({
                fieldName: "firstName",
                required: true,
                placeholder: "Employee's Name",
                label: "First Name"
              })}
            </Col>
            <Col span={6}>
              {this.renderOpInput({
                fieldName: "lastName",
                required: true,
                placeholder: "Last Name",
                label: "Last Name"
              })}
            </Col>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "companyName",
                placeholder: "Employee's LLC (Optional)",
                label: "LLC Name"
              })}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "email",
                placeholder: "Employee Email",
                label: "Email",
                required: true
              })}
            </Col>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "phone",
                placeholder: "Employee's phone (Optional)",
                label: "Phone"
              })}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderSelect(
                options,
                "Clients",
                true,
                "+ Clients Employee can bill to",
                "multiple"
              )}
            </Col>
            <Col span={12}>
              {this.renderFormatNumberInput({
                fieldName: "dayRate",
                label: "Bill Rate (per day)",
                required: true
              })}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {this.renderOpInput({
                fieldName: "description",
                label: "Description",
                formItemType: "description",
                placeholder: "Please enter a description",
                rows: 4
              })}
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
