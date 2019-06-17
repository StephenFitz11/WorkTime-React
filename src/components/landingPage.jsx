import React from "react";

import { Button, Layout } from "antd";
import { Link } from "react-router-dom";
const { Content } = Layout;

const LandingPage = () => {
  return (
    <Layout>
      <Content>
        <div className="home-box">
          <h1>Welcome to WorkTime</h1>
          <p>Please select an option:</p>

          <div className="options">
            <Button type="primary" block>
              <Link to="/register">Register</Link>
            </Button>
            <Button type="primary" block>
              <Link to="/login">Login</Link>
            </Button>
          </div>
          <p>Fancy landing page coming soon</p>
        </div>
      </Content>
    </Layout>
  );
};

export default LandingPage;
