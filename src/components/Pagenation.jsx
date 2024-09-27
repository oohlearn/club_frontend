import React from "react";
import { Pagination } from "antd";
import styled from "styled-components";

const StylePagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;

const onChange = (pageNumber) => {
  console.log("Page: ", pageNumber);
};

const PaginationComponent = ({ current, pageSize, total, onChange }) => (
  <StylePagination>
    <Pagination
      showQuickJumper
      showSizeChanger
      current={current}
      total={total}
      onChange={onChange}
      pageSize={pageSize}
      onShowSizeChange={onChange}
    />
  </StylePagination>
);
export default PaginationComponent;
