import React, { useState } from "react";
import {
  AppstoreOutlined,
  BellOutlined,
  YoutubeOutlined,
  CalendarOutlined,
  CameraOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Layout, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const { Header, Content, Sider } = Layout;

function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/user/logout");
  };
  const items = [
    {
      key: "1",
      icon: <BellOutlined />,
      label: (
        <Link to="/news" style={{ textDecoration: "none" }}>
          最新消息
        </Link>
      ),
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: (
        <Link to="/intro" style={{ textDecoration: "none" }}>
          關於我們
        </Link>
      ),
    },
    {
      key: "3",
      icon: <CalendarOutlined />,
      label: (
        <Link to="/activities" style={{ textDecoration: "none" }}>
          近期演出
        </Link>
      ),
    },
    {
      key: "4",
      icon: <CameraOutlined />,
      label: (
        <Link to="/albums" style={{ textDecoration: "none" }}>
          活動紀錄
        </Link>
      ),
    },
    {
      key: "5",
      icon: <YoutubeOutlined />,
      label: (
        <Link to="/videos" style={{ textDecoration: "none" }}>
          精華影片
        </Link>
      ),
    },
    user
      ? {
          key: "6",
          icon: <LogoutOutlined />,
          onClick: handleLogout,
          label: "登出",
        }
      : {
          key: "6",
          icon: <UserOutlined />,
          label: (
            <Link to="/user/login" style={{ textDecoration: "none" }}>
              登入/註冊
            </Link>
          ),
        },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Sider
      style={{
        background: colorBgContainer,
      }}
      width={160}
    >
      <Menu
        mode="inline"
        style={{
          height: "100%",
        }}
        items={items}
        user={user}
        handleLogout={handleLogout}
      />
    </Sider>
  );
}
export default Sidebar;
