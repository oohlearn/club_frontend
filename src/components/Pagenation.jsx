import React from "react";
import { Pagination } from "antd";
import styled from "styled-components";
const onChange = (pageNumber) => {
  console.log("Page: ", pageNumber);
};

const PaginationComponent = () => (
  <>
    <Pagination showQuickJumper defaultCurrent={1} total={50} onChange={onChange} />
  </>
);
export default PaginationComponent;
