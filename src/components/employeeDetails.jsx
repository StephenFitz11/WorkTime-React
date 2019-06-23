import React, { Component } from "react";
import http from "../services/httpService.js";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button, Icon, Drawer, PageHeader } from "antd";
import DescriptionItem from "./common/descriptionItem";
import EmployeeEditForm from "./forms/employeeEditForm.jsx";
import { apiEmployeeRoute } from "../config/default.json";

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, visible: false };
  }

  async componentDidMount() {
    const { data } = await http.get(
      `${apiEmployeeRoute}/${this.props.match.params.id}`
    );
    const date = new Date(data.startDate);
    data.startDate = date.toDateString();

    this.setState({ data: data }, () => {
      console.log(this.state);
    });
  }

  toggleDrawer = () => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
  };

  render() {
    const { data } = this.state;
    const clients = this.state.data.clients;

    return (
      <div>
        <Link to="/app/employees">
          <PageHeader onBack={() => null} subTitle="Back to Employees " />
        </Link>
        <Row gutter={16}>
          <Col>
            <Card
              title="Employee Information"
              bordered={false}
              // TODO: Implement Edit
              // extra={
              //   <Button type="primary" onClick={this.toggleDrawer}>
              //     <Icon type="edit" /> Edit Employee
              //   </Button>
              // }
            >
              <Row>
                <DescriptionItem
                  title="Name: "
                  content={`${data.firstName} ${data.lastName}`}
                />
              </Row>
              <Row>
                <DescriptionItem title="Phone: " content={`${data.phone} `} />
              </Row>
              <Row>
                <DescriptionItem title="Email: " content={`${data.email}`} />
              </Row>
              <Row>
                <DescriptionItem
                  title="Start Date: "
                  content={`${data.startDate}`}
                />
              </Row>
              <Row>
                <DescriptionItem
                  title="Clients:  "
                  content={
                    clients
                      ? clients.map(item => item.clientCompanyName).join(", ")
                      : null
                  }
                />
              </Row>
              <Row>
                <DescriptionItem
                  title="Day Rate: "
                  content={`$${data.dayRate}`}
                />
              </Row>
            </Card>
          </Col>
          <Col />
        </Row>
        <Drawer
          title="Add a new Employee."
          width={720}
          onClose={this.toggleDrawer}
          visible={this.state.visible}
        >
          <EmployeeEditForm />
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          />
        </Drawer>
      </div>
    );
  }
}

export default EmployeeDetails;
