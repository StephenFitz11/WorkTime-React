import React, { Component } from "react";
import { Drawer, Button, Icon } from "antd";
import ClientsTable from "./clientsTable";
import ClientAddForm from "./forms/clientAddForm";

class Clients extends Component {
  state = {
    visible: false
  };

  toggleDrawer = () => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
  };

  render() {
    return (
      <div className="table">
        <Button type="primary" onClick={this.toggleDrawer}>
          <Icon type="plus" /> New Client
        </Button>
        <Drawer
          title="Add a new client."
          width={720}
          onClose={this.toggleDrawer}
          visible={this.state.visible}
        >
          <ClientAddForm />
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
        <ClientsTable />
      </div>
    );
  }
}

export default Clients;
