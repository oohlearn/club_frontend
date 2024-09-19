import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from "antd";
import axios from "axios";
import TitleComponent from "../../components/TitleComponent";
const { Option } = Select;

const apiUrl = process.env.REACT_APP_API_URL;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const UserRegister = () => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const userData = {
        username: values.email, // 使用 email 作為 username
        password: values.password,
        email: values.email,
        name: values.name,
      };
      const response = await axios.post(`${apiUrl}user/register/`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        message.success("表單提交成功！");
        form.resetFields();
      } else {
        message.error("提交失敗，請稍後再試。");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("提交時發生錯誤，請稍後再試。");
      if (error.response) {
        console.error("錯誤響應數據:", error.response.data);
        console.error("錯誤響應狀態:", error.response.status);
        console.error("錯誤響應頭:", error.response.headers);
        message.error(`提交失敗：${error.response.data.error || "未知錯誤"}`);
      } else if (error.request) {
        console.error("沒有收到響應，請求詳情:", error.request);
        message.error("無法連接到服務器，請檢查網絡連接");
      } else {
        console.error("錯誤詳情:", error.message);
        message.error("發生錯誤，請稍後再試");
      }
    }
    console.log("Received values of form: ", values);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <TitleComponent label="購物登入/註冊" />
      已有帳號？
      <Link to="/user/login">
        <Button block type="primary" htmlType="submit">
          登入
        </Button>
      </Link>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "86",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail 兼登入帳號"
          rules={[
            {
              type: "email",
              message: "請輸入有效E-mail!",
            },
            {
              required: true,
              message: "請輸入E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The new password that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label="稱呼"
          rules={[
            {
              required: true,
              message: "請輸入您的稱呼",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            註冊
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default UserRegister;
