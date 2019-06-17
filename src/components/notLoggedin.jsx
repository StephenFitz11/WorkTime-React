import React from "react";

import { Layout } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

const NotLoggedIn = () => {
  return (
    <Content>
      <div className="home-box">
        <h1>Oops! You are not logged in!</h1>
        <h2>Please login or register to use WorkTime</h2>

        <div className="options">
          <Button type="primary" block>
            <Link to="/register">Register</Link>
          </Button>
          <Button type="primary" block>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </Content>
  );
};

export default NotLoggedIn;
