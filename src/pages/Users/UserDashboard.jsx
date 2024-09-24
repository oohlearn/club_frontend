import TitleComponent from "../../components/TitleComponent";
import { Row, Menu, Button, Col, List, Divider } from "antd";
import React, { useState } from "react";
import { NavLink, Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { UserOutlined, EditOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const adminUrl = process.env.REACT_APP_ADMIN_URL;

function UserDashBoard() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { productItems, ticketItems, getTotalAmount, getDiscountTotal } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/user/logout");
  };

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }
  const hasItems = productItems.length > 0 || ticketItems.length > 0;
  // TODO 將購物車變成下拉式抽屜
  // TODO 增加修改密碼功能
  return (
    <>
      <TitleComponent label={`${user.name}的個人頁面`} />
      <Row justify={"center"}>
        <h5>hello {user.name}</h5>
      </Row>

      {hasItems && (
        <div>
          <h3>您的購物車</h3>
          這裡可以看到您暫存的購物清單。 <br />
          提醒您～購物車內若有尚未付款的票券，將於
          <strong style={{ color: "red" }}>10分鐘</strong>
          後自動刪除，敬請留意付款時間！（商品類則會保存）
          <Divider />
          <List
            dataSource={ticketItems}
            renderItem={(item) => (
              <List.Item>
                <span>
                  <Col style={{ color: "gray", fontSize: "small" }}>地點：蘆洲功學社音樂廳</Col>
                </span>
                <span style={{ margin: "0 5px" }}>
                  {item.row_num ? (
                    <div>
                      座位： {item.seat_num[0]}排 {item.seat_num[1]}號
                    </div>
                  ) : (
                    <div>
                      座位：
                      {item.area}區 {item.seat_num[0]}排 {item.seat_num.slice(1)}號
                    </div>
                  )}
                </span>
                <span style={{ marginLeft: "5px" }}>
                  <Col></Col>
                  <Col>{item.price}元</Col>
                </span>
              </List.Item>
            )}
          />
          <p>商品數量: {productItems.length}</p>
          <p>票券數量: {ticketItems.length}</p>
          <p>總計: ${getTotalAmount()}</p>
          <p>折扣後總計: ${getDiscountTotal()}</p>
          <Row justify={"center"} gutter={12}>
            <Col>
              <Link to="/shop/payment">
                <Button type="primary">
                  <ShoppingCartOutlined />
                  結帳往這走～
                </Button>
              </Link>
            </Col>
            <Col>
              <Link to="/shop/checkout">
                <Button type="default">
                  <EditOutlined />
                  修改訂單
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      )}
      <br />
      <Divider orientation="left">修改密碼</Divider>
      <Row justify={"end"}>
        <Button type="primary" onClick={handleLogout}>
          <UserOutlined />
          登出
        </Button>
      </Row>

      <Divider orientation="left">幹部專區</Divider>
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
