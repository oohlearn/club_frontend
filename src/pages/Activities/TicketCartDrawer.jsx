import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Drawer, Radio, Space, List, Divider, ConfigProvider } from "antd";
import styled from "styled-components";
import { useTicketCart } from "../../context/TicketCartContext";

const TicketCartDrawer = () => {
  const [open, setOpen] = useState(false);
  const { choiceSeats, removeTicketFromCart } = useTicketCart();
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
    if (choiceSeats.length > 0) {
      setOpen(true);
    }
  }, [choiceSeats]);

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
            選購清單 ({choiceSeats.length})
          </Button>
        </Space>
        <div style={containerStyle}>
          <Drawer
            title="已選座位"
            placement="right"
            width={"100%"}
            height={500}
            getContainer={false}
            onClose={onClose}
            open={open}
            mask={false}
            extra={
              <Link to="/shop/checkout">
                <Button>結帳</Button>
              </Link>
            }
          >
            <List
              dataSource={choiceSeats}
              renderItem={(seat) => (
                <List.Item>
                  <Button onClick={() => removeTicketFromCart(seat)} size="small">
                    X
                  </Button>
                  <h6>
                    {seat.row_num ? (
                      <div>
                        座位： 價格: {seat.price}元{seat.seat_num[0]}排 {seat.seat_num[1]}號 | 價格:{" "}
                        {seat.price}元
                      </div>
                    ) : (
                      <div>
                        座位：
                        {seat.area}區 {seat.seat_num[0]}排 {seat.seat_num.slice(1)}號 | {seat.price}
                        元
                      </div>
                    )}
                  </h6>
                </List.Item>
              )}
            />
            <Divider />
            <h5>已選擇：{choiceSeats.length}張票</h5>
            <h5>總金額：{choiceSeats.reduce((total, seat) => total + seat.price, 0)} 元 </h5>
          </Drawer>
        </div>
      </>
    </ConfigProvider>
  );
};
export default TicketCartDrawer;
