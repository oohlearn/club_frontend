import { Space, Row } from "antd";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import TitleComponent from "../../components/TitleComponent";
import PaginationComponent from "../../components/Pagenation";
import VideoComponent from "./VideoComponent";

const StylePagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;

function Videos() {
  return (
    <>
      <TitleComponent label="精華影片" />

      <Space direction="vertical" size="large">
        <SearchBar />
        <Row>
          <VideoComponent />
        </Row>
      </Space>
      <StylePagination>
        <PaginationComponent />
      </StylePagination>
    </>
  );
}

export default Videos;
