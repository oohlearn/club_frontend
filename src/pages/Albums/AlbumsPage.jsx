import React, { useState, useEffect } from "react";
import { Row, Space } from "antd";

import AlbumsComponent from "./AlbumComponent";
import SearchBar from "../../components/SearchBar";
import TitleComponent from "../../components/TitleComponent";

import PaginationComponent from "../../components/Pagenation";

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function Albums() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9); // 每頁顯示數量
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const [albumsData, setAlbumsData] = useState([]);

  const getAlbumsData = async (page, size) => {
    try {
      const response = await axios.get(
        `${apiUrl}information/albums/?page=${page}&page_size=${size}`
      );
      const sortedData = response.data.albums.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAlbumsData(sortedData);
      setTotalItems(response.data.total); // 假設 API 返回總項目
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 数据加载完成后或请求出错后设置 loading 为 false
    }
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  useEffect(() => {
    getAlbumsData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <>
      <TitleComponent label={"活動紀錄"} />
      <Space direction="vertical" size="large">
        <SearchBar />
        <Row>
          <AlbumsComponent albumsData={albumsData} loading={loading} />
        </Row>
      </Space>
      <PaginationComponent
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
      />
    </>
  );
}
export default Albums;
