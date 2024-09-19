import React, { useState } from "react";

import {
  ShopOutlined,
  PhoneOutlined,
  StarOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../context/AuthContext";

const { Header } = Layout;
const NavbarStyle = styled.div`
  NavLink {
    text-decoration: none;
  }
`;

function Navbar() {
  const [current, setCurrent] = useState("mail");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handleLogout = () => {
    logout();
    navigate("/user/logout");

    // 可以在這裡添加重定向到首頁或登入頁的邏輯
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
      label: (
        <NavLink to="activities" style={{ textDecoration: "none" }}>
          活動購票
        </NavLink>
      ),
      key: "app",
      icon: <StarOutlined />,
    },
    user
      ? {
          label: "登出",
          key: "logout",
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        }
      : {
          label: (
            <NavLink to="user/login" style={{ textDecoration: "none" }}>
              登入/註冊
            </NavLink>
          ),
          key: "login",
          icon: <UserOutlined />,
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
