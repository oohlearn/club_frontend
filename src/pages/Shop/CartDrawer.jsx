import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Drawer, List, Divider, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CartDrawer = ({ cartItems, removeFromCart }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (cartItems) {
      if (cartItems.length > 0) {
        setOpen(true);
      }
    }
    console.log({ cartItems });
  }, [cartItems]);

  const getTotalAmount = () => {
    if (!cartItems || cartItems.length === 0) {
      return 0; // 當 cartItem 為 undefined 或空陣列時，總金額設為 0
    }
    return cartItems.reduce((total, item) => {
      const price = item.on_discount ? item.discount_price : item.price;
      return total + price * item.details.qty;
    }, 0);
  };

  const containerStyle = {
    border: "1px solid black",
    position: "relative",
    height: 500,
    overflow: "hidden",
  };

  return (
    <ConfigProvider
      theme={{
        // token: { lineHeight: 0.5 },
        components: {
          List: {
            // itemPadding: "px 0",
            itemPaddingLG: "5px 12px",
          },
        },
      }}
    >
      <>
        <Button type="primary" onClick={showDrawer}>
          選購清單
        </Button>
        <div style={containerStyle}>
          <Drawer
            title="購物車"
            placement="right"
            width={"100%"}
            height={500}
            getContainer={false}
            onClose={onClose}
            open={open}
            mask={false}
            extra={
              <>
                <Link to="/activities">
                  <Button style={{ marginRight: "20px" }}>購票</Button>
                </Link>
                <Link to="shop/checkout">
                  <Button type="primary">結帳</Button>
                </Link>
              </>
            }
          >
            <List
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item>
                  <div>
                    <Button
                      onClick={() => removeFromCart(item.id, item.details.size, item.index)}
                      size="small"
                    >
                      X
                    </Button>
                  </div>
                  <span>{item.name}</span>
                  <span>{item.details.qty}件</span>
                  <span>
                    <span>尺寸：{item.details.size || "單一尺寸"}</span>
                    <br />
                    <span>單價：NT$ {item.on_discount ? item.discount_price : item.price}</span>
                  </span>
                </List.Item>
              )}
            />
            <Divider />
            <h5>總金額：NT$ {getTotalAmount()} </h5>
            <p>商品加票券總金額超過500元，免運費100元</p>
          </Drawer>
        </div>
      </>
    </ConfigProvider>
  );
};
export default CartDrawer;
