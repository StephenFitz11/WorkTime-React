import React, { Component } from "react";
import http from "../services/httpService";
import { Statistic, Row, Col, Button, Card, Icon } from "antd";

class DashBoard extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await http.get("http://localhost:2000/");
    console.log(data);
  }
  render() {
    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Active Employees" value={37} />
          </Col>
          <Col span={12}>
            <Statistic title="Total Clients" value={8} />
          </Col>
          <Col span={12}>
            <Statistic title="Billable Hours" value={637.5} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Period Invoice ($)"
              value={112893}
              precision={2}
            />
            <Button style={{ marginTop: 16 }} type="primary">
              Draft Invoices
            </Button>
          </Col>
        </Row>
        <div style={{ background: "#ECECEC", margin: "20px", padding: "30px" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<Icon type="arrow-up" />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<Icon type="arrow-down" />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default DashBoard;
