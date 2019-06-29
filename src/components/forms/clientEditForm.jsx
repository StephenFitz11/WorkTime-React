import React, { Component } from "react";
import http from "../../services/httpService";
import { Form, Button, Col, Row, message } from "antd";
import FormClass from "./../common/form";
import { apiClientRoute } from "../../config/default.json";

class UnwrappedClientEditForm extends FormClass {
  state = {};

  async doSubmit() {
    const {
      clientCompanyName,
      email,
      billRate,
      street,
      state,
      city,
      zip,
      description
    } = this.props.form.getFieldsValue();

    const updateClient = {
      clientId: this.props.initials._id,
      clientCompanyName,
      email,
      billRate,
      street,
      state,
      city,
      zip,
      description
    };

    try {
      await http.put(apiClientRoute, updateClient);
      window.location = `/app/clients/${this.props.initials._id}`;
      message.success("Employee Updated! ");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        message.error(ex.response.data);
      }
    }
  }

  render() {
    const { initials } = this.props;
    return (
      <React.Fragment>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "clientCompanyName",
                required: true,
                placeholder: "Client Company Name",
                label: "Company Name",
                initialValue: initials.clientCompanyName
              })}
            </Col>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "email",
                label: "Email",
                placeholder: "Client's Email address (Contact Person)",
                initialValue: initials.email
              })}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderOpInput({
                fieldName: "street",
                placeholder: "Client Street Address",
                label: "Street",
                initialValue: initials.street
              })}
            </Col>
            <Col span={4}>
              {this.renderOpInput({
                fieldName: "city",
                label: "City",
                placeholder: "City",
                initialValue: initials.city
              })}
            </Col>
            <Col span={4}>
              {this.renderOpInput({
                fieldName: "state",
                label: "State",
                placeholder: "State",
                initialValue: initials.state
              })}
            </Col>
            <Col span={4}>
              {this.renderOpInput({
                fieldName: "zip",
                label: "Zip",
                placeholder: "Zip",
                initialValue: initials.zip
              })}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderFormatNumberInput({
                fieldName: "billRate",
                label: "Bill Rate (per day)",
                required: true,
                initialValue: initials.billRate
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
                rows: 4,
                initialValue: initials.description
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

const ClientEditForm = Form.create()(UnwrappedClientEditForm);

export default ClientEditForm;
