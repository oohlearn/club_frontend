import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row, Select, Steps, message, theme } from "antd";
import { SecondStep } from "../../components/SecondStep";
import { ThirdStep } from "../../components/ThirdStep";

const current = 0;

const orderData = [
  {
    index: 1,
    "2024DVD": 1,
  },
];

const StepsComponent = ({ orderData, newOrder }) => {
  const steps = [
    {
      title: "確認訂單內容",
      content: <SecondStep orderData={orderData} newOrder={newOrder} />,
    },
    {
      title: "填寫訂購人資料及繳費",
      content: <ThirdStep orderData={orderData} newOrder={newOrder} />,
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
        orderData={orderData}
        newOrder={newOrder}
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
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success("Processing complete!")}>
            Done
          </Button>
        )}
      </div>
    </>
  );
};

function Checkout() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    index: "",
    items: [],
    totalPrice: "",
  });

  // 检查 Data 是否存在
  if (!orderData) {
    // 如果活动不存在，可以重定向到一个错误页面或者首页
    navigate("/");
    return null;
  }

  return (
    <>
      <StepsComponent current={current} orderData={orderData} />
      <br />
    </>
  );
}

export default Checkout;
