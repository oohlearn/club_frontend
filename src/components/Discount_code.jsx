import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
// TODO待修改成一排
const DiscountInput = () => (
  <Form
    style={{
      maxWidth: "none",
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="優惠碼"
      name="discount_code"
      labelCol={{ span: 6 }} // 控制 label 的寬度
      wrapperCol={{ span: 10 }}
    >
      <Input />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        使用優惠碼
      </Button>
    </Form.Item>
  </Form>
);
export default DiscountInput;
