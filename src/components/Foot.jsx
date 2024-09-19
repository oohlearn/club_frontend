import React, { useState } from "react";
import { ShopOutlined, PhoneOutlined, StarOutlined } from "@ant-design/icons";
import { Menu, Col, Row, Flex, Layout } from "antd";
import { NavLink } from "react-router-dom";

function Foot() {
  const { Footer, Content } = Layout;
  const items = [
    {
      label: (
        <NavLink to="admin-login" style={{ textDecoration: "none" }}>
          幹部登入
        </NavLink>
      ),
      key: "mail",
      icon: <ShopOutlined />,
    },
    {
      label: (
        <NavLink to="admin-register" style={{ textDecoration: "none" }}>
          幹部註冊
        </NavLink>
      ),
      key: "app",
      icon: <StarOutlined />,
    },
    {
      label: "聯絡我們",
      key: "chat",
      icon: <PhoneOutlined />,
    },
  ];
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <Footer>
        <Content
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <img src="/images/logo.jpg" alt="" width="50px" />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
              justifyContent: "flex-end",
            }}
          />
        </Content>

        <Content style={{ display: "flex", justifyContent: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Content>
      </Footer>
    </>
  );
}
export default Foot;
