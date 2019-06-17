import React, { Component } from "react";
import { apiClientRoute } from "../config/default.json";
import http from "../services/httpService.js";
import { Card, Col, Row } from "antd";

class ClientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  async componentDidMount() {
    const { data } = await http.get(
      `${apiClientRoute}/${this.props.match.params.id}`
    );
    this.setState({ data: data }, () => {
      console.log(this.state);
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Row gutter={16}>
          <Col>
            <Card title="Client Information" bordered={false}>
              <Row>
                <p>{data.clientCompanyName}</p>
              </Row>
              <Row>
                <p>{data.street}</p>
              </Row>
              <Row>
                <p>
                  {data.city}, {data.state} {data.zip}
                </p>
              </Row>
              <Row>
                <p>{data.email}</p>
              </Row>
              <Row>
                <p>Bill Rate: ${data.billRate}/day</p>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ClientDetails;
