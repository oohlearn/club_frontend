import IndexStory from "../components/IndexStory";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Foot from "../components/Foot";
import { Link, Outlet, useLocation } from "react-router-dom";
import React from "react";

import { Breadcrumb, Layout, theme } from "antd";
import FloatBtn from "../components/FloatBtn";
const { Content } = Layout;

const FontLayout = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="">首頁</Link>
    </Breadcrumb.Item>,
    ...pathSnippets.map((snippet, index) => {
      const url = `${pathSnippets.slice(0, index + 1).join("-")}`;
      const upperUrl = snippet.charAt(0).toUpperCase() + snippet.slice(1);
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{upperUrl}</Link>
        </Breadcrumb.Item>
      );
    }),
  ];
  return (
    <Layout>
      <Navbar />
      <IndexStory />
      <Content
        style={{
          padding: "0 36px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          {breadcrumbItems}
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sidebar />
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Foot />
      <FloatBtn />
    </Layout>
  );
};
export default FontLayout;
