import { Col, Row } from "antd";
import React from "react";
import { IntroductionText } from "../../textFile";

function IntroHome() {
  return (
    <>
      <Row justify={"center"}>
        <img src="./images/團照.jpg" alt="" width={"80%"} height={"auto"} />
      </Row>
      <br />
      <Row gutter={20}>
        <Col span={6}>
          <img src="./images/logo.jpg" alt="" width={"80%"} height={"auto"} />
        </Col>
        <Col span={18}>
          <IntroductionText />
        </Col>
      </Row>
    </>
  );
}

export default IntroHome;
