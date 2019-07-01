import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Popconfirm, Divider, DatePicker } from "antd";
import moment from "moment";
import http from "../services/httpService";
import { apiTimeRoute } from "../config/default.json";

const { RangePicker } = DatePicker;

class TimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

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
      const dateFormatted = new Date(item["date"]);
      item[
        "dateFormatted"
      ] = `${dateFormatted.getMonth()}/${dateFormatted.getDate()}/${dateFormatted.getFullYear()}`;
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
          render: (text, record) => `${record.dateFormatted}`,
          sorter: (a, b) => a.dateFormatted.length - b.dateFormatted.length,
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

  // TODO: Filter by date
  filterDatabyDate = (dates, dateStrings) => {
    const data = this.state.data;
    console.log("dates");
    console.log(dates);
    console.log("data");
    console.log(data);

    console.log(dates);
    console.log(dateStrings);
  };

  handleDelete = record => {};

  render() {
    const data = this.state.data;

    return (
      <React.Fragment>
        <RangePicker
          format="MM-DD-YYYY"
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")]
          }}
          onChange={this.filterDatabyDate}
        />
        <Table columns={this.state.columns} dataSource={this.state.data} />
      </React.Fragment>
    );
  }
}

export default TimeTable;
