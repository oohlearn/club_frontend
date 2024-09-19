import React, { useState } from "react";
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
const AdminRegister = () => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const userData = {
        username: values.email, // 使用 email 作為 username
        password: values.password,
        email: values.email,
        name: values.name,
        work_title: values.work_title,
      };
      const response = await axios.post(`${apiUrl}admin-register/`, userData, {
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

  return (
    <>
      <TitleComponent label="幹部註冊" />
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
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
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
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
          label="姓名"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="work_title"
          label="幹部職稱"
          tooltip="職稱或簡述工作內容"
          rules={[
            {
              required: true,
              message: "輸入您的職稱或簡述工作內容",
              whitespace: true,
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
export default AdminRegister;
