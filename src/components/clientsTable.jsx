import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Divider } from "antd";

import http from "../services/httpService";

class ClientsTable extends Component {
  state = {};

  async componentDidMount() {
    const clientEndpoint = "http://localhost:5000/api/clients";
    const { data } = await http.get(clientEndpoint);
    data.map(item => {
      item["key"] = item._id;
    });
    console.log(data);
    this.setState({ data });
  }

  onChange(pagination, filters, sorter) {
    console.log("params", pagination, filters, sorter);
  }

  handleClick(id) {
    console.log(id);
  }

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
            <a onClick={() => this.handleClick(record._id)} href="javascript:;">
              Invite
            </a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
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

export default ClientsTable;
