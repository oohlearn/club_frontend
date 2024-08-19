import styled from "styled-components";
import React, { useState } from "react";
import { Col, Row, Card, Divider, Space, Flex, Button, Select, ConfigProvider } from "antd";

import { Link } from "react-router-dom";

const selectOptions = Array.from({ length: 11 }, (_, i) => ({ value: i, label: i }));

const ShoppingListComponent = () => (
  <Flex align="center" gap="middle" justify="space-around">
    <Col span={1}>
      <a href="#" style={{ textDecoration: "none" }}>
        X
      </a>
    </Col>
    <Col span={2}>
      <img src="/images/logo.jpg" alt="" width={"30px"} />
    </Col>
    <Col span={7} offset={1}>
      <Col>2023演出DVD</Col>
      <Col style={{ color: "gray", fontSize: "small" }}>NT$150</Col>
    </Col>
    <Col span={5}>
      <ConfigProvider
        theme={{
          components: {
            Select: { optionPadding: 5 },
          },
        }}
      >
        <Select size="small" defaultValue={0} options={selectOptions}></Select>
      </ConfigProvider>
    </Col>
    <Col span={6}>小計：300</Col>
  </Flex>
);

const ShoppingList = () => (
  <Flex vertical gap="middle" justify="center">
    <Card
      title="我的購物車"
      extra={<a href="#">More</a>}
      style={{
        width: 450,
        background: "gray",
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <ShoppingListComponent key={index} />
      ))}
      <Row>
        {/* <Route path="shop" element={<Shop />}></Route> */}
        <Col span={16} offset={2}>
          <Col>宅配運費</Col>
          <Col style={{ color: "gray", fontSize: "small" }}>
            （周邊商品滿500元或購買任一演出票券，免運費）
          </Col>
        </Col>
        <Col span={6} push={2}>
          小計：70
        </Col>
      </Row>

      <Divider />
      <Row justify={"end"}>
        <Col>總金額： NT$ 300</Col>
      </Row>
    </Card>
  </Flex>
);

const TicketListComponent = () => (
  <>
    <Flex align="center" gap="middle" justify="space-around">
      <Col span={1}>
        <a href="#" style={{ textDecoration: "none" }}>
          X
        </a>
      </Col>
      <Col span={2}>
        <img src="/images/logo.jpg" alt="" width={"30px"} />
      </Col>
      <Col span={10}>
        <Col>2024巡迴公演-台北場</Col>
      </Col>
      <Col span={10}>
        <Col style={{ color: "gray", fontSize: "small" }}>時間；2024.7.30（一）</Col>
        <Col style={{ color: "gray", fontSize: "small" }}>地點：蘆洲功學社音樂廳</Col>
      </Col>
    </Flex>
    <br />
    <Flex vertical>
      <Col span={24}>票券資訊</Col>

      <Row align="middle" gutter={5} justify="end">
        <Col>票券1：</Col>
        <Col style={{ width: "10px", height: "10px", background: "gray" }}></Col>
        <Col> 100元</Col>
        <Col push={1}> 座號：</Col>
        <Col push={1}> 第 L 排 12 號</Col>
      </Row>
      <Row align="middle" gutter={5} justify="end">
        <Col>票券1：</Col>
        <Col style={{ width: "10px", height: "10px", background: "gray" }}></Col>
        <Col> 100元</Col>
        <Col push={1}> 座號：</Col>
        <Col push={1}> 第 L 排 12 號</Col>
      </Row>
    </Flex>
  </>
);

const TicketList = () => (
  <Flex vertical>
    <Card
      title="活動票券"
      style={{
        width: 450,
        background: "white",
      }}
    >
      <Row>
        <TicketListComponent />
      </Row>
      <Divider />
      <Row justify={"end"}>
        <Col>總金額： NT$ 300</Col>
      </Row>
    </Card>
  </Flex>
);

export const SecondStep = () => {
  return (
    <Row style={{ marginTop: "10ox" }}>
      <Col span={16} offset={2}>
        <ShoppingList />
        <br />
        <TicketList />
      </Col>
      <Col span={6}>
        <Flex vertical gap={"middle"}>
          <Col style={{ textAlign: "center" }}>
            <h5>
              <strong>總金額</strong>
            </h5>
            <h5>
              <strong>NT$ 200</strong>
            </h5>
          </Col>
          <a href="ThirdStep">
            <Button type="default">填寫付款資訊及繳費</Button>
          </a>
        </Flex>
      </Col>
    </Row>
  );
};
