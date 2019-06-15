import React from "react";
import { Form } from "antd";

import FormClass from "./common/form";
import http from "../services/httpService";

class RegisterForm extends FormClass {
  doSubmit = async () => {
    try {
      

      const {
        companyName,
        firstName,
        lastName,
        email,
        password,
        phone
      } = this.props.form.getFieldsValue();

      const newProfile = {
        companyName: companyName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone
      };

      const userEndpoint = "http://localhost:5000/api/users";

      const { data: jwt } = await http.post(userEndpoint, newProfile);
      localStorage.setItem("token", jwt);
    } catch (ex) {
      if (ex.response.status === 400) {
        this.setState({ errors: "failed" });
      }
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form
        onSubmit={this.handleSubmit}
        {...formItemLayout}
        className="register-form"
      >
        {this.renderInput("companyName", "", "Company Name", true)}
        {this.renderInput("firstName", "", "First Name", true)}
        {this.renderInput("lastName", "", "Last Name", true)}
        {this.renderInput("email", "", "Email", true)}
        {this.renderValidatedInputs()}
        {this.renderInput("phone", "", "Phone")}
        {this.renderSubmit("Register", tailFormItemLayout)}
      </Form>
    );
  }
}

const WrappedRegisterForm = Form.create({ name: "register_login" })(
  RegisterForm
);

export default WrappedRegisterForm;
