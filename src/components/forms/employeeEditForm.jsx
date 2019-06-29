import React, { Component } from "react";
import http from "../../services/httpService";
import { Form, Button, Col, Row, Select, message, Input, Icon } from "antd";
import FormClass from "../common/form";

import { apiClientRoute, apiEmployeeRoute } from "../../config/default.json";

const { Option } = Select;

class UnWrappedEmployeeEditForm extends FormClass {
  state = {};

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

    const updateEmployee = {
      empId: this.props.initials._id,
      companyName,
      firstName,
      lastName,
      phone,
      email,
      dayRate,
      description,
      clients
    };

    console.log(updateEmployee);

    try {
      // TODO: Make a way to display a notifcation before the reload.
      await http.put(apiEmployeeRoute, updateEmployee);
      window.location = "/app/employees";
      message.success("Employee Updated! ");
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
    const { initials } = this.props;
    let initalClients = initials.clients.map(item => item._id);

    return (
      <React.Fragment>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={6}>
              {this.renderOpInput({
                fieldName: "firstName",
                required: true,
                placeholder: "Employee's Name",
                label: "First Name",
                initialValue: initials.firstName
              })}
            </Col>
            <Col span={6}>
              {this.renderOpInput({
                fieldName: "lastName",
                required: true,
                placeholder: "Last Name",
                label: "Last Name",
                initialValue: initials.lastName || undefined
              })}
            </Col>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "companyName",
                placeholder: "Employee's LLC (Optional)",
                label: "LLC Name",
                initialValue: initials.companyName
              })}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "email",
                placeholder: "Employee Email",
                label: "Email",
                required: true,

                initialValue: initials.email
              })}
            </Col>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "phone",
                placeholder: "Employee's phone (Optional)",
                label: "Phone",
                initialValue: initials.phone || undefined
              })}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderSearchableSelect(
                options,
                "Clients",
                true,
                "",
                initalClients
              )}
            </Col>
            <Col span={12}>
              {this.renderFormatNumberInput({
                fieldName: "dayRate",
                label: "Day Rate (per day)",
                required: true,
                initialValue: initials.dayRate
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
            Update
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

const EmployeeEditForm = Form.create()(UnWrappedEmployeeEditForm);

export default EmployeeEditForm;
