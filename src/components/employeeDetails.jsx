import React, { Component } from "react";
import { apiEmployeeRoute } from "../config/default.json";
import http from "../services/httpService.js";
import { Card, Col, Row } from "antd";

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  async componentDidMount() {
    const { data } = await http.get(
      `${apiEmployeeRoute}/${this.props.match.params.id}`
    );
    this.setState({ data: data }, () => {
      console.log(this.state);
    });
  }

  render() {
    const { data } = this.state;
    const clients = this.state.data.clients;

    return (
      <div>
        <Row gutter={16}>
          <Col>
            <Card title="Employee Information" bordered={false}>
              <Row>
                <p>{`Name: ${data.firstName} ${data.lastName}`}</p>
              </Row>
              <Row>
                <p>{`Phone No: ${data.phone} `}</p>
              </Row>
              <Row>
                <p>{`Email: ${data.email}`}</p>
              </Row>
              <Row>
                <p>{`Start Date: ${data.startDate}`}</p>
              </Row>
              <Row>
                <p>{`Dayrate: ${data.dayRate}`}</p>
              </Row>
              <Row>
                {clients &&
                  clients.map(item => <p>{item.clientCompanyName}</p>)}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EmployeeDetails;
