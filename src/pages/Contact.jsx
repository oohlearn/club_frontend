import React from "react";
import { Button, Form, Input, Row, Select } from "antd";
import TitleComponent from "../components/TitleComponent";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};

const Contact = () => (
  <>
    <Row style={{ textAlign: "center", justifyContent: "center" }}>
      <TitleComponent label="聯絡我們" />
    </Row>
    <br />
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      <Form.Item name={["user", "name"]} label="姓名">
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[
          {
            type: "email",
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["user", "phone"]} label="手機">
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "category"]}
        label="種類"
        rules={[
          {
            required: true,
            message: "請填寫種類，或選『其他』",
          },
        ]}
      >
        <Select
          style={{
            width: "100%",
          }}
          options={[
            {
              value: "qActivity",
              label: "活動諮詢（購票、演出內容）",
            },
            {
              value: "qShopping",
              label: "周邊商品問題（商品細節、訂單、退換貨）",
            },
            {
              value: "qCooperate",
              label: "合作洽談（商演、商品聯名）",
            },
            {
              value: "qAdvice",
              label: "建議或申訴",
            },
            {
              value: "qWebsite",
              label: "網頁瀏覽問題反映",
            },
            {
              value: "qOther",
              label: "其他 - 請於標題或內容詳述",
            },
          ]}
        />
      </Form.Item>

      <Form.Item
        name={["user", "title"]}
        label="標題"
        rules={[
          {
            required: true,
            message: "請填寫標題",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["user", "introduction"]}
        label="內容"
        rules={[
          {
            required: true,
            message: "請填寫內容",
          },
        ]}
      >
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          送出
        </Button>
      </Form.Item>
    </Form>
  </>
);
export default Contact;
