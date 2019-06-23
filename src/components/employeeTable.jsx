import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Popconfirm, message } from "antd";

import http from "../services/httpService";

import { apiEmployeeRoute } from "../config/default.json";

class EmployeeTable extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await http.get(apiEmployeeRoute);

    data.map(item => {
      item["key"] = item._id;
    });

    this.setState({ data });
  }

  onChange(pagination, filters, sorter) {
    console.log("params", pagination, filters, sorter);
  }

  // TODO: Implement DELETE Client

  async handleDelete(client) {
    const originalData = this.state.data;

    const data = this.state.data.filter(m => m._id !== client._id);
    this.setState({ data });
    try {
      await http.delete(`${apiEmployeeRoute}/${client._id}`);

      message.success("Client was deleted");
    } catch (ex) {
      message.error("An error occured. Employee was not deleted.");
      this.setState({ data: originalData });
    }
  }

  render() {
    const data = this.state.data;
    const columns = [
      {
        title: "Name",
        dataIndex: "firstName",
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        render: (text, record) => (
          <Link to={`/app/employees/${record._id}`}>{`${record.firstName} ${
            record.lastName
          }`}</Link>
        ),
        sorter: (a, b) =>
          a.clientCompanyName.length - b.clientCompanyName.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Email",
        dataIndex: "email",
        sorter: (a, b) => a.email - b.email,

        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Are you sure delete this client?"
              onConfirm={() => this.handleDelete(record)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          </span>
        )
      }
    ];

    return (
      <React.Fragment>
        <Table columns={columns} dataSource={data} onChange={this.onChange} />
      </React.Fragment>
    );
  }
}

export default EmployeeTable;
