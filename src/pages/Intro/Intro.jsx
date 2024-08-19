import TitleComponent from "../../components/TitleComponent";
import { Row, Menu } from "antd";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const IntroMenu = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} mode="horizontal" items={introItems} selectedKeys={current} />;
};

const introItems = [
  {
    key: "1",
    label: (
      <NavLink to="" style={{ textDecoration: "none" }}>
        關於我們
      </NavLink>
    ),
  },
  {
    key: "2",
    label: (
      <NavLink to="experiences" style={{ textDecoration: "none" }}>
        歷年重要經歷
      </NavLink>
    ),
  },
  {
    key: "3",
    label: (
      <NavLink to="conductors" style={{ textDecoration: "none" }}>
        指揮介紹
      </NavLink>
    ),
  },

  {
    key: "4",
    label: (
      <NavLink to="teachers" style={{ textDecoration: "none" }}>
        老師介紹
      </NavLink>
    ),
  },
];

function IntroPage() {
  return (
    <>
      <TitleComponent label="成德國小國樂團" />
      <Row justify={"center"}>
        <IntroMenu mode="horizontal" />
      </Row>
      <br />
      <Outlet />
    </>
  );
}

export default IntroPage;
