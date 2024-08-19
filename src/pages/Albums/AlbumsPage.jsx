import React from "react";
import { Row, Space } from "antd";

import AlbumsComponent from "./AlbumComponent";
import SearchBar from "../../components/SearchBar";
import TitleComponent from "../../components/TitleComponent";

function Albums() {
  return (
    <>
      <TitleComponent label={"活動紀錄"} />
      <Space direction="vertical" size="large">
        <SearchBar />
        <Row>
          <AlbumsComponent />
        </Row>
      </Space>
    </>
  );
}
export default Albums;
