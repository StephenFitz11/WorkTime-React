import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Popconfirm, Divider } from "antd";
import http from "../services/httpService";
import { apiTimeRoute } from "../config/default.json";

class TimeTable extends Component {
  state = {};

  async componentDidMount() {
    var tableData = {};

    if (this.props.user.userType === "Employee") {
      var { data } = await http.get(`${apiTimeRoute}?empTime=true`);
      tableData = data;
    } else {
      var { data } = await http.get(apiTimeRoute);
    }
    data.map(item => {
      item.timeMins = item.timeMins / 60;
      const date = new Date(item["date"]);
      item[
        "date"
      ] = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
      item["key"] = item._id;
    });
    this.setState({ data: data }, () => {
      // Reduces object occurences to 1.
      var clients = this.state.data.map(item => item.client.clientCompanyName);
      clients = [...new Set(clients)];

      // Returns an array of objects for the client filter in columns
      function getClientFilters() {
        return clients.map(function(item) {
          return {
            text: item,
            value: item
          };
        });
      }

      // Reduces object occurences to 1.
      const emps = this.state.data.map(item => item.user);
      const unqEmps = Array.from(new Set(emps.map(a => a._id))).map(_id => {
        return emps.find(a => a._id === _id);
      });

      // Returns an array of objects for the employee filter in columns
      function getEmpFilters() {
        return unqEmps.map(function(item) {
          return {
            text: `${item.firstName} ${item.lastName}`,
            value: item.lastName
          };
        });
      }

      var columns = [
        {
          title: "Date",
          dataIndex: "date",
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value, record) => record.name.indexOf(value) === 0,
          render: (text, record) => `${record.date}`,
          sorter: (a, b) => a.date.length - b.date.length,
          sortDirections: ["descend", "ascend"]
        },

        {
          title: "Client",
          dataIndex: "client.clientCompanyName",
          sorter: (a, b) =>
            a.client.clientCompanyName.length -
            b.client.clientCompanyName.length,
          render: (text, record) => `${record.client.clientCompanyName}`,
          filters: getClientFilters(),
          sortDirections: ["descend", "ascend"],
          onFilter: (value, record) =>
            record.client.clientCompanyName.indexOf(value) === 0
        },

        {
          title: "Time (Hours)",
          dataIndex: "timeMins",
          sorter: (a, b) => a.timeMins - b.timeMins,
          render: (text, record) => `${record.timeMins}`
        },

        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <span>
              <Link to={`/app/time/${record._id}`}>Edit</Link>
              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure you want to delete this time entry?"
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
      if (this.props.user.userType === "Company") {
        columns.splice(0, 0, {
          title: "Employee",
          dataIndex: "user.lastName",
          filters: getEmpFilters(),
          onFilter: (value, record) =>
            record.user.lastName.indexOf(value) === 0,
          render: (text, record) =>
            `${record.user.firstName} ${record.user.lastName}`,
          sorter: (a, b) => a.user.lastName.length - b.user.lastName.length,
          sortDirections: ["descend", "ascend"]
        });
      }
      this.setState({ columns: columns });
    });
  }

  filterDataByDate() {}

  render() {
    const data = this.state.data;

    return (
      <React.Fragment>
        <Table
          columns={this.state.columns}
          dataSource={data}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}

export default TimeTable;
