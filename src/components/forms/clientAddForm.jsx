import React from "react";
import FormClass from "../common/form";
import http from "../../services/httpService";
import { apiClientRoute } from "../../config/default.json";
import { Form, Button, Col, Row, message } from "antd";

class AddClientForm extends FormClass {
  state = { visible: false };

  // TODO: Delete clientmaker before production. Used to create dummy clients for testing
  async clientMaker(count) {
    let rate = 1000;
    for (let i = 0; i < count; i++) {
      const newClient = {
        clientCompanyName: `Client ${i}`,
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
    // this.clientMaker(5);
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

  render() {
    return (
      <React.Fragment>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderInput(
                "clientCompanyName",
                "Enter Client's Company Name",
                "Company Name",
                true
              )}
            </Col>
            <Col span={12}>
              {this.renderInput(
                "email",
                "Client's Email address (Contact Person)",
                "Email"
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderInput("street", "Client Address", "Address")}
            </Col>
            <Col span={4}>{this.renderInput("city", "City", "City")}</Col>
            <Col span={4}>{this.renderInput("state", "State", "State")}</Col>
            <Col span={4}>{this.renderInput("zip", "Zip", "Zip")}</Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {this.renderFormatNumberInput(
                "Bill Rate (per day)",
                "billRate",
                null,
                true
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {this.renderDescriptionBox(
                "Description",
                "Enter additional information"
              )}
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
