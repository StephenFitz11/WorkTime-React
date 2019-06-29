import React from "react";
import FormClass from "../common/form";
import http from "../../services/httpService";
import { apiClientRoute } from "../../config/default.json";
import { Form, Button, Col, Row, Input, Icon } from "antd";
import { element } from "prop-types";

let id = 0;

class AddClientForm extends FormClass {
  state = { visible: false };

  // TODO: Delete clientmaker before production. Used to create dummy clients for testing
  async clientMaker() {
    const companies = ["Exxon", "Chevron", "Sinopec", "EOG", "Haliburton"];
    let rate = 1000;
    for (let i = 0; i < companies.length; i++) {
      const elem = companies[i];
      const newClient = {
        clientCompanyName: elem,
        email: `email${i}@test.com`,
        street: `${i}0${i} North Cherry St. `,
        city: `Oklahoma City`,
        state: "OK",
        zip: "73116",
        billRate: rate
      };
      rate += 50;
      await http.post(apiClientRoute, newClient);
    }
  }

  async doSubmit() {
    // TODO: Delete below before production. Used to create dummy clients.
    // this.clientMaker();
    console.log(this.props.form.getFieldsValue());

    const {
      clientCompanyName,
      email,
      street,
      city,
      state,
      zip,
      billRate,
      description
    } = this.props.form.getFieldsValue();

    const newClient = {
      clientCompanyName,
      email,
      street,
      city,
      state,
      zip,
      billRate,
      description
    };
    // TODO: Make a way to diplay a notifcation before the reload.
    await http.post(apiClientRoute, newClient);
    window.location = "/app/clients";
  }

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    // TODO: Change to inputObject
    return (
      <React.Fragment>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "clientCompanyName",
                required: true,
                placeholder: "Client Company Name",
                label: "Company Name"
              })}
            </Col>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "email",
                label: "Email",
                placeholder: "Client's Email address (Contact Person)"
              })}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "street",
                placeholder: "Client Street Address",
                label: "Street"
              })}
            </Col>
            <Col span={4}>
              {this.renderOpInput({
                fieldName: "city",
                label: "City",
                placeholder: "City"
              })}
            </Col>
            <Col span={4}>
              {this.renderOpInput({
                fieldName: "state",
                label: "State",
                placeholder: "State"
              })}
            </Col>
            <Col span={4}>
              {this.renderOpInput({
                fieldName: "zip",
                label: "Zip",
                placeholder: "Zip"
              })}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderFormatNumberInput({
                fieldName: "billRate",
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

const ClientAddForm = Form.create()(AddClientForm);

export default ClientAddForm;
