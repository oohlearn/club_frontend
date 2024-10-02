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
  const [pageSize, setPageSize] = useState(7); // 每頁顯示數量
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  const getVideosData = async (page, size, term = "", startDate = null, endDate = null) => {
    try {
      let url = `${apiUrl}information/videos/?page=${page}&page_size=${size}`;
      if (term) {
        url += `&search=${encodeURIComponent(term)}`;
      }
      // 檢查 startDate 和 endDate，並確保它們是 moment 對象或字符串
      if (startDate) {
        url += `&start_date=${startDate.format("YYYY-MM-DD")}`;
      }

      if (endDate) {
        url += `&end_date=${endDate.format("YYYY-MM-DD")}`;
      }
      const response = await axios.get(url);
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

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    setCurrentPage(1);
  };
  useEffect(() => {
    getVideosData(currentPage, pageSize, searchTerm, dateRange[0], dateRange[1]);
  }, [currentPage, pageSize, searchTerm, dateRange[0], dateRange[1]]);

  return (
    <>
      <TitleComponent label="精華影片" />

      <Space direction="vertical" size="large">
        <SearchBar onSearch={handleSearch} onDateRangeChange={handleDateRangeChange} />
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
