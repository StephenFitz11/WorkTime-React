import React, { Component } from "react";
import { Form, Button, Col, Row, Select, message, Input } from "antd";
import FormClass from "../common/form";

import { apiClientRoute, apiEmployeeRoute } from "../../config/default.json";
import http from "../../services/httpService";
const { Option } = Select;

class UnWrappedEmployeeEditForm extends FormClass {
  state = {};

  componentDidMount() {}

  async doSubmit() {
    // const {
    //   companyName,
    //   firstName,
    //   lastName,
    //   phone,
    //   email,
    //   dayRate,
    //   description,
    //   clients
    // } = this.props.form.getFieldsValue();
    // const newEmployee = {
    //   companyName,
    //   firstName,
    //   lastName,
    //   phone,
    //   email,
    //   dayRate,
    //   description,
    //   clients
    // };
    // try {
    //   // TODO: Make a way to display a notifcation before the reload.
    //   await http.post(apiEmployeeRoute, newEmployee);
    //   window.location = "/app/employees";
    //   message.success(
    //     "Employee Added! An email has been sent to them with login instructions."
    //   );
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 400) {
    //     message.error(ex.response.data);
    //   }
    // }
    // console.log(this.props.form.getFieldsValue());
  }

  render() {
    const fields = this.state.fields;

    return this.renderInput("firstName", "Employee's Name", "First Name", true);
  }
}

const EmployeeEditForm = Form.create()(UnWrappedEmployeeEditForm);

export default EmployeeEditForm;
