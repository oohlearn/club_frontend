import TitleComponent from "../../components/TitleComponent";
import { Row, Menu, Button } from "antd";
import React, { useState } from "react";
import { NavLink, Outlet, Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const adminUrl = process.env.REACT_APP_ADMIN_URL;

function UserDashBoard() {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }

  return (
    <>
      <TitleComponent label="個人資料" />
      <Row justify={"center"}>hello {user.name}</Row>
      <br />
      {user && user.is_staff ? (
        <Link to={adminUrl}>
          <Button>後臺管理系統連結</Button>
        </Link>
      ) : (
        ""
      )}
      <Outlet />
    </>
  );
}

export default UserDashBoard;
