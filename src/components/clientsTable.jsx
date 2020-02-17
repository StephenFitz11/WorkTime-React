import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Popconfirm, message, Divider, Drawer } from "antd";

import http from "../services/httpService";

import { apiClientRoute } from "../config/default.json";
import ClientEditForm from "./forms/clientEditForm";

class ClientsTable extends Component {
  state = { visible: false };

  async componentDidMount() {
    const { data } = await http.get(apiClientRoute);
    data.map(item => {
      item["key"] = item._id;
    });

    this.setState({ data });
  }

  async handleDelete(client) {
    const originalData = this.state.data;

    const data = this.state.data.filter(m => m._id !== client._id);
    this.setState({ data });
    try {
      await http.delete(`${apiClientRoute}/${client._id}`);

      message.success("Client was deleted");
    } catch (ex) {
      message.error("An error occured. Client was not deleted.");
      this.setState({ data: originalData });
    }
  }

  enableEditForm = record => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });

    this.setState({ record });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const data = this.state.data;
    const columns = [
      {
        title: "Name",
        dataIndex: "clientCompanyName",
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        render: (text, record) => (
          <Link to={`/app/clients/${record._id}`}>
            {record.clientCompanyName}
          </Link>
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
        title: "Rate",
        dataIndex: "billRate",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.billRate - b.billRate,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a onClick={() => this.enableEditForm(record)} href="javascript:;">
              Edit
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure you want to delete this client?"
              onConfirm={() => this.handleDelete(record)}
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
        <Drawer
          title="Edit Client Details."
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <ClientEditForm initials={this.state.record} />
        </Drawer>
      </React.Fragment>
    );
  }
}

export default ClientsTable;
