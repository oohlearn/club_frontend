import React, { useState } from "react";
import { Button, Form, Input, Row, Select, Col, Flex, Divider, Radio, Space, Checkbox } from "antd";
import styled from "styled-components";
import AddressSelect from "../pages/Order/Address";
import PolicyModal from "../pages/Order/PolicyModal";

// const layout = {
//   labelCol: {
//     span: 10,
//   },
//   wrapperCol: {
//     span: 14,
//   },
// };

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
      <PolicyModal loading={loading} setOpen={setOpen} open={open}></PolicyModal>
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

export const ThirdStep = () => (
  <>
    <Title title="聯絡人資料" />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form>
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
    <Form>
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
    </Form>
    <Title title="付款方式" />
    <PaidMethod />
    <br />
    <Row>
      <PolicyCheck />
    </Row>
    <br />

    <Row justify={"center"}>
      <Button type="primary">確認訂單，並繳費NT$200</Button>
    </Row>
    <br />
    <Row justify={"center"}>
      <Button type="default">回上一頁</Button>
    </Row>
  </>
);
