import React from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function OpenCalendar({ onChange }) {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={onChange} />
    </Space>
  );
}
export default OpenCalendar;
