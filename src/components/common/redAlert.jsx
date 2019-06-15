import React from "react";

import { Alert } from "antd";

const RedAlert = () => {
  return (
    <div>
      <Alert message="Incorrect Email or Password" type="error" showIcon />
    </div>
  );
};

export default RedAlert;
