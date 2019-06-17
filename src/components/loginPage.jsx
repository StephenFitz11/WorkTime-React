import React from "react";
import { Form } from "antd";
import { Link } from "react-router-dom";
import http from "../services/httpService";
import auth from "../services/authService";

import FormClass from "./common/form";

class NormalLoginForm extends FormClass {
  state = {};

  doSubmit = async () => {
    try {
      const { email, password } = this.props.form.getFieldsValue();
      await auth.login(email, password);
      window.location = "/app";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: "failed" });
        console.log(this.state);
      }
      console.log(ex.message);
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {this.renderInput("email", "Email", "", true)}
        {this.renderInput("password", "Password", "", true, "password")}
        {this.state.errors && this.renderAlert("Incorrect Login or Password")}
        {this.renderCheckbox("checked", "Remember me")}
        {this.renderSubmit("Login")}
        Or <Link to="/register">register now!</Link>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
