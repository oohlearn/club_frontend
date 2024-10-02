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

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  const getAlbumsData = async (page, size, term = "", startDate = null, endDate = null) => {
    try {
      let url = `${apiUrl}information/albums/?page=${page}&page_size=${size}`;
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

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    setCurrentPage(1);
  };

  useEffect(() => {
    getAlbumsData(currentPage, pageSize, searchTerm, dateRange[0], dateRange[1]);
  }, [currentPage, pageSize, searchTerm, dateRange[0], dateRange[1]]);

  return (
    <>
      <TitleComponent label={"活動紀錄"} />
      <Space direction="vertical" size="large">
        <SearchBar onSearch={handleSearch} onDateRangeChange={handleDateRangeChange} />
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
