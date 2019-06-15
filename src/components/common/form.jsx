import React, { Component } from "react";

import { Form, Icon, Input, message, Button, Checkbox } from "antd";

class FormClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(err => {
      if (!err) {
        this.doSubmit();
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  renderValidatedInputs() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please enter your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
      </React.Fragment>
    );
  }

  renderInput(
    fieldName,
    placeholder,
    label,
    required = false,
    type = "text",
    prefix = undefined
  ) {
    const { getFieldDecorator } = this.props.form;

    if (required) {
      var object = new Object();
      object.rules = [
        {
          required: true,
          message: `Please enter your ${label || placeholder}!`
        }
      ];
    }

    return (
      <React.Fragment>
        <Form.Item label={label && <span>{label}</span>}>
          {getFieldDecorator(fieldName, object)(
            <Input
              prefix={
                prefix && (
                  <Icon type={prefix} style={{ color: "rgba(0,0,0,.25)" }} />
                )
              }
              type={type}
              placeholder={placeholder}
            />
          )}
        </Form.Item>
      </React.Fragment>
    );
  }

  renderCheckbox(fieldName, text) {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item>
        {getFieldDecorator(fieldName, {
          valuePropName: "checked",
          initialValue: true
        })(<Checkbox>Remember me</Checkbox>)}
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
    );
  }

  renderSubmit(label, options = undefined, error = undefined) {
    return (
      <Form.Item {...options}>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          options={options}
        >
          {label}
        </Button>
      </Form.Item>
    );
  }

  renderError() {
    const errorMessage = () => {
      message.error("This is a message of error");
    };

    return (
      <Button
        style={{ display: "none" }}
        onClick={errorMessage => {
          this.renderError();
        }}
      >
        Error
      </Button>
    );
  }
}

export default FormClass;
