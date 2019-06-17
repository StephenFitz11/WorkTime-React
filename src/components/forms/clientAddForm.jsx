import React from "react";
import FormClass from "../common/form";
import http from "../../services/httpService";
import { apiClientRoute } from "../../config/default.json";
import { Form, Button, Col, Row } from "antd";

class AddClientForm extends FormClass {
  state = { visible: false };

  async doSubmit() {
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

    console.log(apiClientRoute);

    const reponse = await http.post(apiClientRoute, newClient);
    window.location = "/app/clients";

    console.log(this.props.form.getFieldsValue());
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
              {this.renderFormatNumberInput("Bill Rate (per day)", "billRate")}
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
