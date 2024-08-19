import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";
import React, { useState, useNavigate } from "react";
import { Col, Row, Card, Divider, Space, Flex, Button } from "antd";
import SeatsImage from "../../components/SeatsImage";
import { Link } from "react-router-dom";

const TicketList = () => (
  <Card
    title="電腦配位"
    style={{
      width: 300,
      background: "orange",
    }}
  >
    <Row align="middle" gutter={5}>
      <Col>票券1：</Col>
      <Col style={{ width: "10px", height: "10px", background: "gray" }}></Col>
      <Col> 100元</Col>
      <Col push={1}> 座號：</Col>
      <Col push={1}> 第 L 排 12 號</Col>
    </Row>

    <Divider />
    <Row justify={"end"}>
      <Col pull={5}>共 2 張</Col>
      <Col>總金額： NT$ 300</Col>
    </Row>
  </Card>
);
export const FirstStep = ({ activityData, newOrder }) => {
  return (
    <div>
      <TitleComponent label={activityData.title} />
      <Row align={"top"} gutter={15} justify={"start"}>
        <img src="/images/poster.jpg" alt="" style={{ width: "80px", marginLeft: "10px" }} />
        <Col push={1}>
          <Col>
            <h6>時間：{activityData.date}</h6>
          </Col>
          <Col>
            <h6>地點：{activityData.place}</h6>
          </Col>
          <Col>
            <h6>選擇票價：200元</h6>
          </Col>
          <Col>
            <h6>張數：2張</h6>
          </Col>
        </Col>
      </Row>
      <br />
      <br />
      <br />

      <Row align="center" gutter={100}>
        <Col span={12}>
          <SeatsImage style={{ marginLeft: "10px" }} stageImage={activityData.stageImage} />
        </Col>
        <Col span={12}>
          <TicketList />
          <br />
          <Flex vertical gap={"middle"}>
            <Button type="primary">確認訂單</Button>
            <Button type="default">
              <Link style={{ textDecoration: "none" }}>更改票價及數量</Link>
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};
