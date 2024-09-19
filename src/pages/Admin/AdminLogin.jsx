import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import TitleComponent from "../../components/TitleComponent";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const { adminLoginAuth } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await adminLoginAuth(values.username, values.password);
      navigate("/admin-link");
      console.log("Received values of form: ", values);
    } catch (error) {
      console.log("登入失敗", error);
    }
  };
  return (
    <>
      <TitleComponent label="幹部登入" />

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
export default AdminLogin;
