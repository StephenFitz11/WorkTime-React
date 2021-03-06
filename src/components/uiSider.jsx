import React from "react";
import { Link } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

const UiSider = props => {
  const { userType } = props.user;
  return (
    <Sider className="app-sider" breakpoint="lg" collapsedWidth="0">
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1">
          <Link to="/app">
            <Icon type="dashboard" />
            <span className="nav-text">Dashboard</span>
          </Link>
        </Menu.Item>

        {userType === "Company" ? (
          <Menu.Item key="2">
            <Link to="/app/clients">
              <Icon type="solution" />
              <span className="nav-text">Clients</span>
            </Link>{" "}
          </Menu.Item>
        ) : null}

        {userType === "Company" ? (
          <Menu.Item key="3">
            <Link to="/app/employees">
              <Icon type="user" />
              <span className="nav-text">Employees</span>
            </Link>
          </Menu.Item>
        ) : null}

        <Menu.Item key="4">
          <Link to="/app/time">
            <Icon type="compass" />
            <span className="nav-text">Manage Time</span>
          </Link>
        </Menu.Item>

        {userType === "Company" ? (
          <Menu.Item key="5">
            <Link to="/app/invoices">
              <Icon type="upload" />
              <span className="nav-text">Invoices</span>
            </Link>
          </Menu.Item>
        ) : null}

        <Menu.Item key="6">
          <Link to="/app/account">
            <Icon type="setting" />
            <span className="nav-text">Account</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default UiSider;
