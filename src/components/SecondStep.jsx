import styled from "styled-components";
import React, { useState } from "react";
import { Col, Row, List, Card, Divider, Space, Flex, Button, Select, ConfigProvider } from "antd";

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import DiscountInput from "./Discount_code";

const ListItem = styled(List.Item)`
  display: flex;
  justify-content: space-between;
`;

const CardStyle = styled(Card)`
  background: orange;
  width: 450px;
`;

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
const ShoppingList = ({ cartItems, removeFromCart, getTotalAmount }) => (
  <Flex vertical gap="middle" justify="center">
    <h5>費用說明</h5>
    <div>
      <h6>商品及票券總金額超過500元，免運費100元</h6>
    </div>
    <CardStyle title="周邊商品">
      <List
        dataSource={cartItems}
        renderItem={(item) => (
          <ListItem>
            <span>
              <Button
                onClick={() => removeFromCart(item.id, item.details.size, item.index)}
                size="small"
              >
                X
              </Button>
            </span>
            <span style={{ margin: "0 10px" }}>{item.name}</span>
            <span style={{ margin: "0 10px" }}>{item.details.qty} 件</span>
            <span style={{ marginLeft: "20px" }}>
              <Col>尺寸：{item.details.size || "單一尺寸"}</Col>
              <Col>單價：NT$ {item.on_discount ? item.discount_price : item.price}</Col>
            </span>
          </ListItem>
        )}
      />
      <Divider />
      <Row justify={"start"}>
        <DiscountInput />
      </Row>
      <Row justify={"end"}>
        <h6>總金額：NT$ {getTotalAmount()} </h6>
      </Row>
    </CardStyle>
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
  const { cartItems, removeFromCart, getTotalAmount } = useCart();
  return (
    <Row style={{ marginTop: "10px" }}>
      <Col span={16} offset={2}>
        <ShoppingList
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          getTotalAmount={getTotalAmount}
        />
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
