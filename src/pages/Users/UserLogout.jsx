import TitleComponent from "../../components/TitleComponent";
import { Row, Menu, Button } from "antd";
import React, { useState } from "react";
import { NavLink, Outlet, Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UserLogout() {
  const { user, login, logout, isAuthenticated } = useAuth();
  return (
    <>
      <TitleComponent label="登出" />
      <Row justify={"center"}>hello 已成功登出</Row>
      <br />
      <Outlet />
    </>
  );
}

export default UserLogout;
