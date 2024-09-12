import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message, Space } from "antd";
import { useCart } from "../context/CartContext";
import { useTicketCart } from "../context/TicketCartContext";

// TODO目前優惠碼無法區分不同場活動
const DiscountInput = () => {
  const { applyDiscountCode, discountCode, getInput } = useTicketCart();
  return (
    <Space>
      <Input
        placeholder="輸入優惠碼"
        value={discountCode}
        onChange={(e) => getInput(e.target.value)}
      />
      <Button onClick={applyDiscountCode}>應用優惠</Button>
    </Space>
  );
};
export default DiscountInput;
