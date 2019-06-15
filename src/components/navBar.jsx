import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Layout, Menu } from "antd";
const { Header } = Layout;

class NavBar extends Component {
  renderNavItem = (key, label, path) => {
    return (
      <Menu.Item key={key}>
        <Link to={"/" + path}>{label}</Link>
      </Menu.Item>
    );
  };

  render() {
    const { user } = this.props;
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />

          {!user && (
            <React.Fragment>
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: "64px" }}
              >
                {this.renderNavItem("1", "Home", "home")}
                {this.renderNavItem("2", "Register", "register")}
                {this.renderNavItem("3", "Login", "login")}
              </Menu>
            </React.Fragment>
          )}

          {user && (
            <React.Fragment>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                style={{ lineHeight: "64px" }}
              >
                {this.renderNavItem("1", user)}
                {this.renderNavItem("2", "Dashboard")}
                {this.renderNavItem("3", "Reports")}
              </Menu>
            </React.Fragment>
          )}
        </Header>
      </Layout>
    );
  }
}

export default NavBar;
