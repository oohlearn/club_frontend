import React, { useState } from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
function OpenCalendar() {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker />
    </Space>
  );
}
export default OpenCalendar;
