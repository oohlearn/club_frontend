import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, message } from "antd";
import TitleComponent from "../../components/TitleComponent";
import { useAuth } from "../../context/AuthContext";
import { useTicketCart } from "../../context/TicketCartContext";
import TimerDisplay from "../../components/TimeDisplay";

// TODO 購物跳轉後的路徑不對
const UserLogin = () => {
  const { loginAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/user/dashboard";

  const { ticketItems } = useTicketCart();

  const onFinish = async (values) => {
    try {
      const user = await loginAuth(values.email, values.password);
      if (user) {
        message.success("登入成功");
        navigate(from, { replace: true });
        console.log("登入成功", { user });
      }
    } catch (error) {
      message.error("登入失敗");
      console.log("登入失敗", error);
    }
  };

  return (
    <>
      <TitleComponent label="購物 登入" />
      {ticketItems?.length > 0 ? <TimerDisplay /> : ""}
      尚未有帳號？
      <Link to="/user/register" state={{ from: from }}>
        <Button block type="primary">
          註冊
        </Button>
      </Link>
      <br />
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "請輸入email",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "請輸入密碼",
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Row justify="center" align="center">
            <p>若忘記密碼，請洽管理員</p>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            登入
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default UserLogin;
