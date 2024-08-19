import React from "react";
import { FloatButton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
const FloatBtn = () => (
  <FloatButton
    onClick={() => console.log("onClick")}
    icon={<QuestionCircleOutlined style={{ fontSize: "30px" }} />}
    style={{ right: "20px", width: "70px", height: "70px" }}
  />
);
export default FloatBtn;
