import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row, Select, Steps, message, theme } from "antd";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";
import { useProductCart } from "../../context/ProductCartContext";
import { useTicketCart } from "../../context/TicketCartContext";
import { useCart } from "../../context/CartContext";

const current = 0;

const orderData = [
  {
    index: 1,
    "2024DVD": 1,
  },
];

// TODO 票券和商品的優惠碼欄位

const StepsComponent = ({ cartItems, choiceSeats }) => {
  const steps = [
    {
      title: "確認訂單內容",
      content: <SecondStep cartItems={cartItems} choiceSeats={choiceSeats} />,
    },
    {
      title: "填寫訂購人資料及繳費",
      content: <ThirdStep cartItems={cartItems} />,
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps
        current={current}
        items={items}
        cartItems={cartItems}
        orderData={orderData}
        style={{ width: "60%", marginLeft: "50px" }}
      />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 45,
          justifyContent: "center",
          display: "flex",
        }}
      >
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}

        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            填寫付款資訊及繳費
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success("Processing complete!")}>
            確認訂單，並繳費NT$待補cart context同步
          </Button>
        )}
      </div>
    </>
  );
};

function Checkout() {
  const navigate = useNavigate();
  const { getProductDiscountTotal, removeFromCart } = useProductCart();
  const { getTicketDiscountTotal, removeTicketFromCart } = useTicketCart();
  const { productItems, ticketItems, getTotalAmount, getDiscountTotal, clearCart } = useCart();

  // 检查 Data 是否存在
  if (!orderData) {
    // 如果活动不存在，可以重定向到一个错误页面或者首页
    navigate("/");
    return null;
  }

  return (
    <>
      <StepsComponent
        current={current}
        removeFromCart={removeFromCart}
        removeTicketFromCart={removeTicketFromCart}
        ticketItems={ticketItems}
        productItems={productItems}
        getTotalAmount={getTotalAmount}
      />
      <br />
    </>
  );
}

export default Checkout;
