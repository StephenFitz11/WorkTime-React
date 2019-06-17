import React from "react";
import { Form, Checkbox, Modal } from "antd";

import FormClass from "./common/form";

import http from "../services/httpService";
import auth from "../services/authService";

class RegisterForm extends FormClass {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    visible: false
  };

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

      const response = await http.post(userEndpoint, newProfile);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/app";
    } catch (ex) {
      if (ex.response.status === 400) {
        this.setState({ errors: "failed" });
      }
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
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

    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
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
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked",
              rules: [
                {
                  required: true,
                  message: "Please check the box!"
                }
              ]
            })(
              <Checkbox>
                I have read the <a onClick={this.showModal}>agreement</a>
              </Checkbox>
            )}
          </Form.Item>
          {this.state.errors &&
            this.renderAlert(
              "An account with that email has already been registered.",
              tailFormItemLayout
            )}
          {this.renderSubmit("Register", tailFormItemLayout)}
        </Form>
        <Modal
          title="User Agreement"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          Please report any feedback to contact@stephenfitzsimmons.com
        </Modal>
      </React.Fragment>
    );
  }
}

const WrappedRegisterForm = Form.create({ name: "register_login" })(
  RegisterForm
);

export default WrappedRegisterForm;
