import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Layout, Menu, Avatar } from "antd";
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
                className="loggedin-nav"
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: "64px" }}
              >
                {this.renderNavItem("2", "Logout", "logout")}

                <Menu.Item>
                  <div>
                    <Link to="/app">
                      <Avatar
                        style={{
                          backgroundColor: "#40A9FF",
                          verticalAlign: "middle"
                        }}
                        size="large"
                      >
                        {this.props.user.name[0]}
                      </Avatar>
                    </Link>
                  </div>
                </Menu.Item>
              </Menu>
            </React.Fragment>
          )}
        </Header>
      </Layout>
    );
  }
}

export default NavBar;
