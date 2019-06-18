import React from "react";
import { Form } from "antd";
import { Link } from "react-router-dom";
import FormClass from "./../common/form";
import { apiUrl } from "../../config/default.json";
import http from "../../services/httpService";
const authEndpoint = apiUrl + "/auth";

class UnWrappedLoginForm extends FormClass {
  doSubmit = async () => {
    try {
      const { email, password } = this.props.form.getFieldsValue();
      const response = await http.post(authEndpoint, { email, password });
      localStorage.setItem("token", response.headers["x-auth-token"]);
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

const LoginForm = Form.create({ name: "login_form" })(UnWrappedLoginForm);

export default LoginForm;
