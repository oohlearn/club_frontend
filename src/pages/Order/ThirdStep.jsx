import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Row,
  Select,
  Col,
  Flex,
  Divider,
  Radio,
  Space,
  Checkbox,
  message,
} from "antd";
import styled from "styled-components";
import AddressSelect from "./Address";
import PolicyModal from "./PolicyModal";
import axios from "axios";

import { useProductCart } from "../../context/ProductCartContext";
import { useTicketCart } from "../../context/TicketCartContext";

const apiUrl = process.env.REACT_APP_API_URL;

// const layout = {
//   labelCol: {
//     span: 10,
//   },
//   wrapperCol: {
//     span: 14,
//   },
// };

const PaidStyle = styled.div`
  width: 400px;
  background-color: white;
  height: 220px;
  border: 2px solid gray;
  padding: 20px;
  margin-top: 5px;
`;

const PaidMethod = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <Form colon={false}>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value="ATM">ATM虛擬帳號</Radio>
            <Radio value="creditCard">信用卡</Radio>
          </Space>
        </Radio.Group>
        {value === "creditCard" && (
          <PaidStyle id="cardInfo">
            <Form.Item
              label=<h6>信用卡卡號：</h6>
              name="name"
              wrapperCol={{ span: 50 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label=<h6>有效期限：</h6>
              name="name"
              wrapperCol={{ span: 10 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label=<h6>驗證碼：</h6>
              name="name"
              wrapperCol={{ span: 20 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Row align={"middle"}>
                <Col span={6}>
                  <Input />
                </Col>
                <Col offset={1}>卡片背面末3碼</Col>
              </Row>
            </Form.Item>
          </PaidStyle>
        )}
      </Form>
    </>
  );
};

// TODO 服務條款確認
function PolicyCheck() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Checkbox onChange={onChange}>
      我已經閱讀並同意
      <Button type="link" onClick={showLoading}>
        服務條款與隱私權政策
      </Button>
      <PolicyModal loading={loading} setOpen={setOpen} open={open} />
    </Checkbox>
  );
}
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const Title = ({ title }) => {
  return (
    <Divider orientation="left">
      <h5>{title}</h5>
    </Divider>
  );
};

export const ThirdStep = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const { cartId } = location.state || {};
  const { getProductDiscountTotal, cartItems, clearCart } = useProductCart();
  const { getTicketDiscountTotal, choiceSeats, clearTicketCart } = useTicketCart();

  const navigate = useNavigate();
  const [cartData, setCartData] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    // 其他必要的客户信息字段
  });

  const [loading, setLoading] = useState(true);

  // TODO 這整塊都還不能用
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}cart/${cartId}/`, {
        customer: customerInfo,
        // 可能还需要其他支付相关的信息
      });
      if (response.data.success) {
        // 处理成功支付的逻辑
      }
    } catch (error) {
      console.error("Error updating cart with customer info:", error);
    }
  };
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`${apiUrl}cart/${location.state.cartId}/`);
        setCartData(response.data);
        console.log(cartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        message.error("Failed to load cart data. Please try again.");
        setLoading(false);
      }
    };

    if (location.state && location.state.cartId) {
      fetchCartData();
    } else {
      message.error("No cart ID found. Please start from the beginning.");
      navigate("/first-step");
    }
  }, [location.state, navigate]);

  const onFinish = async (values) => {
    try {
      const response = await axios.put(`${apiUrl}cart/${location.state.cartId}/`, {
        ...values,
        status: "pending", // 假設我們在此將訂單狀態更新為 'pending'
      });
      if (response.data.success) {
        message.success("Order placed successfully!");
        navigate("/order-confirmation", { state: { orderId: response.data.orderId } });
      } else {
        message.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Title title="聯絡人資料" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="訂購人姓名"
            name="name"
            wrapperCol={{ span: 50 }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="訂購人Email"
            name="email"
            wrapperCol={{ span: 50 }}
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="訂購人手機"
            name="phone"
            wrapperCol={{ span: 50 }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
      <Title title="取票方式" />
      <Row>
        <h6>電子票券</h6>
      </Row>
      <Row>
        <h6>請至信箱收信，以信中之QRCode驗票入場</h6>
      </Row>
      <Title title="周邊商品宅配地址" />

      <Form.Item
        label="郵遞區號"
        name="zip"
        wrapperCol={{ span: 5 }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AddressSelect />
      </Form.Item>
      <Form.Item
        label="地址"
        name="address"
        wrapperCol={{ span: 60 }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Title title="付款方式" />
      <PaidMethod />
      <br />
      <Row>
        <PolicyCheck />
      </Row>
      <br />

      <Row justify={"center"}>
        <Button type="primary" htmlType="submit">
          確認訂單，並繳費NT${cartData?.total_price || 0}
        </Button>
      </Row>
      <br />
      <Row justify={"center"}>
        <Button type="default" onClick={() => navigate("/checkout")}>
          回上一頁
        </Button>
      </Row>
    </>
  );
};
