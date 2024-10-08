import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  List,
  Card,
  Divider,
  Space,
  Flex,
  Button,
  Input,
  Select,
  ConfigProvider,
} from "antd";

import { useCart } from "../context/CartContext";
import { useTicketCart } from "../context/TicketCartContext";

const ListItem = styled(List.Item)`
  display: flex;
  justify-content: space-between;
`;

const CardStyle = styled(Card)`
  background: orange;
  width: 500px;
`;

const selectOptions = Array.from({ length: 11 }, (_, i) => ({ value: i, label: i }));

const ShoppingList = () => {
  const {
    cartItems,
    removeFromCart,
    getTotalAmount,
    discountCode,
    getInput,
    applyDiscountCode,
    appliedDiscounts,
    getProductDiscountTotal,
  } = useCart();

  return (
    <Flex vertical gap="middle" justify="center">
      <h5>費用說明</h5>
      <div>
        <h6>若有訂購任一演出活動票券，免運費100元</h6>
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
        <Row justify={"start"} gutter={5}>
          <Space>
            <Input
              placeholder="輸入優惠碼"
              value={discountCode}
              onChange={(e) => getInput(e.target.value)}
            />
            <Button onClick={applyDiscountCode}>使用優惠</Button>
          </Space>
          <br />
        </Row>
        <Divider />
        {appliedDiscounts.code ? (
          <Col>
            已使用優惠碼：{appliedDiscounts.name} {appliedDiscounts.code} （
            {appliedDiscounts.description}）
          </Col>
        ) : (
          ""
        )}

        <Row justify={"end"}>
          <h6>總金額：NT$ {getProductDiscountTotal()} </h6>
        </Row>
      </CardStyle>
    </Flex>
  );
};

const TicketList = () => {
  const {
    choiceSeats,
    removeTicketFromCart,
    getTicketDiscountTotal,
    discountCode,
    getInput,
    applyDiscountCode,
    appliedDiscounts,
  } = useTicketCart();
  return (
    <Flex vertical>
      <CardStyle title="活動票券">
        <List
          dataSource={choiceSeats}
          renderItem={(item) => (
            <ListItem>
              <span>
                <Button onClick={() => removeTicketFromCart(item)} size="small">
                  X
                </Button>
              </span>
              <span>
                <Col>{discountCode.name}</Col>
                <Col style={{ color: "gray", fontSize: "small" }}>地點：蘆洲功學社音樂廳</Col>
              </span>
              <span style={{ margin: "0 5px" }}>
                {item.row_num ? (
                  <div>
                    座位： {item.seat_num[0]}排 {item.seat_num[1]}號
                  </div>
                ) : (
                  <div>
                    座位：
                    {item.area}區 {item.seat_num[0]}排 {item.seat_num.slice(1)}號
                  </div>
                )}
              </span>
              <span style={{ marginLeft: "5px" }}>
                <Col></Col>
                <Col>{item.price}元</Col>
              </span>
            </ListItem>
          )}
        />
        <Divider />
        <Row justify={"start"} gutter={2}>
          <Space>
            <Input
              placeholder="輸入優惠碼"
              value={discountCode}
              onChange={(e) => getInput(e.target.value)}
            />
            <Button onClick={applyDiscountCode}>使用優惠</Button>
          </Space>
          <br />
        </Row>
        <Divider />

        <Row justify={"start"}>
          {appliedDiscounts.code ? (
            <Col>
              已使用優惠碼：{appliedDiscounts.name}
              {appliedDiscounts.code} （{appliedDiscounts.description}）
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Row justify={"end"}>
          <h6>總金額：NT$ {getTicketDiscountTotal()} </h6>
        </Row>
      </CardStyle>
    </Flex>
  );
};

export const SecondStep = () => {
  const { getProductDiscountTotal } = useCart();
  const { getTicketDiscountTotal } = useTicketCart();
  let orderTotalAmount = getProductDiscountTotal() + getTicketDiscountTotal();
  return (
    <Row style={{ marginTop: "10px" }}>
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
            {getTicketDiscountTotal() <= 0 && orderTotalAmount !== 0
              ? (orderTotalAmount += 100)
              : orderTotalAmount}
          </Col>
          <a href="ThirdStep">
            <Button type="primary">填寫付款資訊及繳費</Button>
          </a>
        </Flex>
      </Col>
    </Row>
  );
};
