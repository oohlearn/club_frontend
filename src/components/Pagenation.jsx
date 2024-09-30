import React from "react";
import { Pagination } from "antd";
import styled from "styled-components";

const StylePagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;

const PaginationComponent = ({ current, pageSize, total, onChange }) => {
  const handleChange = (page, pageSize) => {
    console.log("頁碼: ", page, "每頁項目數: ", pageSize);
    onChange(page, pageSize);
  };
  return (
    <StylePagination>
      <Pagination
        showQuickJumper
        showSizeChanger
        current={current}
        total={total}
        onChange={handleChange}
        pageSize={pageSize}
        onShowSizeChange={handleChange}
      />
    </StylePagination>
  );
};
export default PaginationComponent;
