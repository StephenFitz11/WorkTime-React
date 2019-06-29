import React, { Component } from "react";
import _ from "lodash";

import {
  Form,
  Icon,
  Input,
  message,
  Button,
  Checkbox,
  InputNumber,
  Alert,
  Select,
  TimePicker,
  DatePicker
} from "antd";
import moment from "moment";
import { objectTypeAnnotation } from "@babel/types";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

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
    prefix = undefined,
    initial = undefined
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

  renderOpInput(options) {
    const { getFieldDecorator } = this.props.form;

    let decOps = {};
    if (options.required === true) {
      decOps = {
        rules: [
          {
            required: true,
            message: `${options.label || options.placeholder} is required`
          }
        ]
      };
    }

    if (options.initialValue) {
      decOps.initialValue = options.initialValue;
    }

    var input = (
      <Input
        prefix={
          options.prefix ? (
            <Icon type={options.prefix} style={{ color: "rgba(0,0,0,.25)" }} />
          ) : (
            undefined
          )
        }
        type={options.type || "text"}
        placeholder={options.placeholder || undefined}
        allowClear={options.allowClear}
      />
    );

    if (options.formItemType === "description") {
      input = (
        <Input.TextArea
          rows={options.rows || undefined}
          prefix={
            options.prefix ? (
              <Icon
                type={options.prefix}
                style={{ color: "rgba(0,0,0,.25)" }}
              />
            ) : (
              undefined
            )
          }
          placeholder={options.placeholder || undefined}
        />
      );
    }

    let formInput = (
      <React.Fragment>
        <Form.Item label={<span>{options.label}</span> || undefined}>
          {getFieldDecorator(options.fieldName, decOps)(input)}
        </Form.Item>
      </React.Fragment>
    );

    return formInput;
  }

  renderFormatNumberInput(options) {
    const { getFieldDecorator } = this.props.form;
    if (options.required === true) {
      var decOps = {
        rules: [
          {
            required: true,
            message: `${options.label || options.placeholder} is required`
          }
        ]
      };
    }

    if (options.initialValue) {
      decOps.initialValue = options.initialValue;
    }
    let formInput = (
      <React.Fragment>
        <Form.Item label={options.label}>
          {getFieldDecorator(options.fieldName, decOps)(
            <InputNumber
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
            />
          )}
        </Form.Item>
      </React.Fragment>
    );

    return formInput;
  }

  renderSelect(
    data,
    label,
    required = false,
    placeholder = undefined,
    mode = undefined,
    style = undefined
  ) {
    const { getFieldDecorator } = this.props.form;
    const fieldName = label.toLowerCase();
    if (required) {
      var object = {};
      object.rules = [
        {
          required: true,
          message: `Please enter your ${label || placeholder}!`
        }
      ];
    }
    return (
      <Form.Item label={label}>
        {getFieldDecorator(fieldName, object)(
          <Select
            mode={mode}
            style={{ style }}
            onChange={this.handleChange}
            placeholder={placeholder}
          >
            {data}
          </Select>
        )}
      </Form.Item>
    );
  }

  renderSearchableSelect(
    options,
    label,
    required = false,
    placeholder = false,
    clients
  ) {
    const { getFieldDecorator } = this.props.form;
    const fieldName = label.toLowerCase();
    if (required) {
      var object = {};
      object.rules = [
        {
          required: true,
          message: `Please enter your ${label || placeholder}!`
        }
      ];
      object.initialValue = clients;
    }

    return (
      <Form.Item label={label}>
        {getFieldDecorator(fieldName, object)(
          <Select
            mode="multiple"
            showSearch
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {options}
          </Select>
        )}
      </Form.Item>
    );
  }

  // Renders a small drowdown to choose the date
  renderDatePicker(label, required = false, placeholder = undefined) {
    const { getFieldDecorator } = this.props.form;
    const fieldName = label.toLowerCase();
    if (required) {
      var object = {};
      object.rules = [
        {
          required: true,
          message: `Please enter your ${label || placeholder}!`
        }
      ];
    }
    return (
      <Form.Item label={label}>
        {getFieldDecorator(fieldName, object)(<DatePicker />)}
      </Form.Item>
    );
  }

  // // Date Range picker
  // renderDateRangePicker(label) {
  //   <Form.Item label={label}>
  //     <RangePicker
  //       ranges={{
  //         Today: [moment(), moment()],
  //         "This Month": [moment().startOf("month"), moment().endOf("month")]
  //       }}
  //       onChange={onChange}
  //     />
  //     <br />
  //     <RangePicker
  //       ranges={{
  //         Today: [moment(), moment()],
  //         "This Month": [moment().startOf("month"), moment().endOf("month")]
  //       }}
  //       showTime
  //       format="YYYY/MM/DD HH:mm:ss"
  //       onChange={onChange}
  //     />
  //   </Form.Item>;
  // }

  // Renders a small dropdown to choose time in HH:mm:ss format
  renderTimePicker(
    label,
    fieldName,
    format,
    required = false,
    placeholder = undefined
  ) {
    const { getFieldDecorator } = this.props.form;
    if (required) {
      var object = {};
      object.rules = [
        {
          required: true,
          message: `Please enter your ${label || placeholder}!`
        }
      ];
    }
    return (
      <Form.Item label={label}>
        {getFieldDecorator(fieldName, object)(
          <TimePicker
            minuteStep={15}
            defaultOpenValue={moment("00:00", format)}
            format={format}
          />
        )}
      </Form.Item>
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

  renderAlert(message, options = undefined) {
    return (
      <Form.Item {...options}>
        <div>
          <Alert message={message} type="error" showIcon />
        </div>
      </Form.Item>
    );
  }
}

export default FormClass;
