import React from "react";
import { Form } from "antd";
import { Link } from "react-router-dom";
import http from "../services/httpService";

import FormClass from "./common/form";
import RedAlert from "./common/redAlert";

class NormalLoginForm extends FormClass {
  state = {};

  doSubmit = async () => {
    try {
      const { email, password } = this.props.form.getFieldsValue();
      const login = { email, password };
      const authEndpoint = "http://localhost:5000/api/auth";
      const { data: jwt } = await http.post(authEndpoint, login);
      localStorage.setItem("token", jwt);
    } catch (ex) {
      this.renderError();
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {this.renderInput("email", "Email", "", true)}
        {this.renderInput("password", "Password", "", true)}
        {this.state.failedLogin && <RedAlert />}
        {this.renderCheckbox("checked", "Remember me")}
        {this.renderSubmit("Login")}
        {this.renderError()}
        Or <Link to="/register">register now!</Link>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
