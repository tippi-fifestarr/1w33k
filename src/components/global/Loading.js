import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Loading.css";
const Loading = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="loading-content">
      <Spin indicator={antIcon} />
    </div>
  );
};

export default Loading;
