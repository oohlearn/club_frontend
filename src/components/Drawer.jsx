import React, { useEffect, useState } from "react";
import { Button, Drawer, Radio, Space, List, Divider, ConfigProvider } from "antd";
import styled from "styled-components";
const CartDrawer = ({ choiceSeats, onRemoveSeat }) => {
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
    if (choiceSeats.length > 1) {
      setOpen(true);
    }
  }, [choiceSeats]);

  const ContainerS = styled.div`
    .con {
      width: 500px;
      background: black;
    }
  `;

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
        <Drawer
          title="已選座位"
          placement="bottom"
          width={150}
          height={250}
          onClose={onClose}
          open={open}
          mask={false}
          extra={<Button>結帳</Button>}
        >
          <List
            dataSource={choiceSeats}
            renderItem={(seat) => (
              <List.Item>
                <Button onClick={() => onRemoveSeat(seat)} size="small">
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
                      {seat.area}區 {seat.seat_num[0]}排 {seat.seat_num.slice(1)}號 | {seat.price}元
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
      </>
    </ConfigProvider>
  );
};
export default CartDrawer;
