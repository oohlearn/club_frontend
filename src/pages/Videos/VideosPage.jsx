import React, { useState, useEffect } from "react";
import { Space, Row } from "antd";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import TitleComponent from "../../components/TitleComponent";
import PaginationComponent from "../../components/Pagenation";
import VideoComponent from "./VideoComponent";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function Videos() {
  const [videosData, setVideosData] = useState([]);
  const [pageSize, setPageSize] = useState(3); // 每頁顯示數量
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getVideosData = async (page, size) => {
    try {
      const response = await axios.get(
        `${apiUrl}information/videos/?page=${page}&page_size=${size}`
      );
      console.log(response.data);
      setVideosData(response.data.videos);
      setTotalItems(response.data.total); // 假設 API 返回總項目
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
    getVideosData(currentPage, pageSize);
  }, [currentPage, pageSize]);
  return (
    <>
      <TitleComponent label="精華影片" />

      <Space direction="vertical" size="large">
        <SearchBar />
        <Row>
          <VideoComponent videosData={videosData} />
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

export default Videos;
