import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import TitleComponent from "../../components/TitleComponent";
import { useAuth } from "../../context/AuthContext";

const UserLogin = () => {
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const user = await loginAuth(values.email, values.password);
      if (user) {
        navigate("/user/dashboard");
        console.log("登入成功", { user });
      }
    } catch (error) {
      console.log("登入失敗", error);
    }
  };

  return (
    <>
      <TitleComponent label="購物登入/註冊" />
      尚未有帳號？
      <Link to="/user/register">
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
