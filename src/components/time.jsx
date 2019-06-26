import React, { Component } from "react";
import { Drawer, Button, Icon, Row, Col } from "antd";
import TimeTable from "./timeTable";
import TimeForm from "./forms/timeForm";

import FormClass from "./common/form";
import TimeFilterForm from "./forms/timeFilterForm";

class Time extends Component {
  state = { visible: false };

  toggleDrawer = () => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
  };

  render() {
    const { user } = this.props;
    return (
      <div className="table">
        <Row gutter={18}>
          <Col span={16}>
            <Button type="primary" onClick={this.toggleDrawer}>
              <Icon type="plus" /> Enter Time
            </Button>
          </Col>
          <Col>
            <TimeFilterForm />
          </Col>
        </Row>
        <TimeTable user={user} />
        <Drawer
          title="Enter time."
          width={720}
          onClose={this.toggleDrawer}
          visible={this.state.visible}
        >
          <TimeForm user={user} />
        </Drawer>
      </div>
    );
  }
}

export default Time;
