import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Col, Row, List, Card, Divider, Space, Flex, Button, Input, Select, message } from "antd";

import { useProductCart } from "../../context/ProductCartContext";
import { useTicketCart } from "../../context/TicketCartContext";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import TimerDisplay from "../../components/TimeDisplay";
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
  } = useProductCart();

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
const apiUrl = process.env.REACT_APP_API_URL;

export const SecondStep = () => {
  const navigate = useNavigate();
  const { getProductDiscountTotal, removeFromCart } = useProductCart();
  const { getTicketDiscountTotal, removeTicketFromCart } = useTicketCart();
  const { productItems, ticketItems, getTotalAmount, getDiscountTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  let orderTotalAmount = getProductDiscountTotal() + getTicketDiscountTotal();
  const handleProceedToPayment = async () => {
    if (!isAuthenticated) {
      // 登入檢查
      message.info("請先登入以繼續結帳流程");
      navigate("/user/login", { state: { from: "shop/checkout" } });
      return;
    }
    const orderData = {
      cartItems: productItems.map((item) => ({
        product: item.id,
        size: item.details.size,
        quantity: item.details.size.qty,
      })),
      ticketItems: ticketItems.map((item) => ({
        seat: item.row_num ? item.id : null,
        seat_v2: !item.row_num ? item.id : null,
      })),
      total_amount: getProductDiscountTotal() + getTicketDiscountTotal(),
    };

    try {
      const response = await axios.post(`${apiUrl}create-cart/`, orderData);
      if (response.data.success) {
        clearCart();
        navigate("/shop/payment", { state: { cartId: response.data.cart_id } });
      } else {
        message.error("建立購物車失敗。請再試一次。");
      }
    } catch (error) {
      message.error("請再試一次");
      console.log(typeof getTicketDiscountTotal());

      console.error("Error creating cart:", error.response?.data || error);
    }
  };
  return (
    <Row style={{ marginTop: "10px" }}>
      {ticketItems?.length > 0 ? <TimerDisplay /> : ""}
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
          <Button type="primary" onClick={handleProceedToPayment}>
            填寫付款資訊及繳費
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};
