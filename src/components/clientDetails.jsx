import React, { Component } from "react";
import http from "../services/httpService.js";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button, Icon, PageHeader } from "antd";
import DescriptionItem from "./common/descriptionItem";
import { apiClientRoute } from "../config/default.json";

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
        <Link to="/app/clients">
          <PageHeader onBack={() => null} subTitle="Back to Clients " />
        </Link>
        <Row gutter={16}>
          <Col>
            <Card
              title="Client Information"
              bordered={false}
              // TODO: Implement Edit Client drawer to respond to this button.
              // extra={
              //   <Button type="primary" onClick={this.toggleDrawer}>
              //     <Icon type="edit" /> Edit Client
              //   </Button>
              // }
            >
              <Row>
                <DescriptionItem
                  title="Client Name: "
                  content={data.clientCompanyName}
                />
              </Row>
              <Row>
                <DescriptionItem
                  title="Address: "
                  content={`${data.street}, ${data.city}, ${data.state} ${
                    data.zip
                  }`}
                />
              </Row>
              <Row>
                <DescriptionItem title="Email: " content={data.email} />
              </Row>
              <Row>
                <DescriptionItem
                  title="Bill Rate: "
                  content={`$ ${data.billRate}`}
                />
              </Row>
              <Row>
                <DescriptionItem
                  title="Additional Info: "
                  content={data.description}
                />
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ClientDetails;
