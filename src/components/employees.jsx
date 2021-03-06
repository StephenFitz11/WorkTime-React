import React, { Component } from "react";
import { Drawer, Button, Icon } from "antd";
import EmployeeTable from "./employeeTable";
import EmployeeAddForm from "./forms/employeeAddForm";

class Employees extends Component {
  state = { visible: false };

  toggleDrawer = () => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
  };

  render() {
    return (
      <div className="table">
        <Button type="primary" onClick={this.toggleDrawer}>
          <Icon type="plus" /> New Employee
        </Button>
        <Drawer
          title="Add a new Employee."
          width={720}
          onClose={this.toggleDrawer}
          visible={this.state.visible}
        >
          <EmployeeAddForm />
        </Drawer>
        <EmployeeTable />
      </div>
    );
  }
}

export default Employees;
