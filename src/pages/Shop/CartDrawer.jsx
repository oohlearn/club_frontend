import React, { useEffect, useState } from "react";
import { Button, Drawer, Radio, Space, List, Divider, ConfigProvider } from "antd";
import styled from "styled-components";

const CartDrawer = ({ cartItem, onRemoveItem }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (cartItem.length > 0) {
      setOpen(true);
    }
  }, [cartItem]);

  const containerStyle = {
    border: "1px solid black",
    position: "relative",
    height: 500,
    padding: 20,
    overflow: "hidden",
  };

  return (
    <ConfigProvider
      theme={{
        token: { lineHeight: 0.5 },
        components: {
          List: {
            itemPadding: "2px 0",
            itemPaddingLG: "5px 12px",
          },
        },
      }}
    >
      <>
        <Space>
          <Button type="primary" onClick={showDrawer}>
            選購清單
          </Button>
        </Space>
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
            extra={<Button>結帳</Button>}
          >
            <List
              dataSource={cartItem}
              renderItem={(item) => (
                <List.Item>
                  <Button onClick={() => onRemoveItem(item)} size="small">
                    X
                  </Button>
                  <h6>數量</h6>
                </List.Item>
              )}
            />
            <Divider />
            <h5>總金額：元 </h5>
          </Drawer>
        </div>
      </>
    </ConfigProvider>
  );
};
export default CartDrawer;
