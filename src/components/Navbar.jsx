import React, { useState } from "react";

import { ShopOutlined, PhoneOutlined, StarOutlined } from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const { Header } = Layout;
const NavbarStyle = styled.div`
  NavLink {
    text-decoration: none;
  }
`;

function Navbar() {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const items = [
    {
      label: (
        <NavLink to="shop" style={{ textDecoration: "none" }}>
          周邊商品
        </NavLink>
      ),
      key: "mail",
      icon: <ShopOutlined />,
    },
    {
      label: "活動購票",
      key: "app",
      icon: <StarOutlined />,
    },
    {
      label: (
        <NavLink to="contact" style={{ textDecoration: "none" }}>
          聯絡我們
        </NavLink>
      ),
      key: "chat",
      icon: <PhoneOutlined />,
    },
  ];

  return (
    <NavbarStyle>
      <Header
        theme="light"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <a href={"/"}>
          <img src="/images/logo.jpg" alt="" width="70px" />
        </a>
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
      </Header>
    </NavbarStyle>
  );
}
export default Navbar;
