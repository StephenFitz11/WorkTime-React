import React, { Component } from "react";

import { Route } from "react-router-dom";

import { Layout } from "antd";

import NotLoggedIn from "./notLoggedin";
import UiSider from "./uiSider";
import DashBoard from "./dashboard";

import Employees from "./employees";
import Invoices from "./invoices";
import Account from "./account";
import Clients from "./clients";
import ClientDetails from "./clientDetails";
import EmployeeDetails from "./employeeDetails";

const { Header, Content, Footer } = Layout;

class UserInterface extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <Layout>
        {!user && <NotLoggedIn />}

        {user && (
          <React.Fragment>
            <UiSider />
            <Layout>
              <Header style={{ background: "#fff", padding: 0 }} />
              <Content style={{ margin: "24px 16px 0" }}>
                <div
                  style={{ padding: 24, background: "#fff", minHeight: 360 }}
                >
                  <Route
                    path="/app/employees/:id"
                    component={EmployeeDetails}
                  />
                  <Route path="/app/clients/:id" component={ClientDetails} />
                  <Route path="/app/clients" exact component={Clients} />
                  <Route path="/app/employees" exact component={Employees} />
                  <Route path="/app/invoices" component={Invoices} />
                  <Route path="/app/account" component={Account} />
                  <Route path="/app" exact component={DashBoard} />
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
              </Footer>
            </Layout>
          </React.Fragment>
        )}
      </Layout>
    );
  }
}

export default UserInterface;
