import React from "react";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Row } from "antd";
import TitleComponent from "../../components/TitleComponent";
const UserLogin = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <TitleComponent label="購物登入/註冊" />
      尚未有帳號？
      <Link to="/register">
        <Button block type="primary" htmlType="submit">
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
          name="username"
          rules={[
            {
              required: true,
              message: "請輸入帳號",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
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
