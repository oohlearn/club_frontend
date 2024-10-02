import React, { useEffect, useState } from "react";
import { Space } from "antd";
import axios from "axios";

import NewsComponent from "../News/NewsComponent";
import SearchBar from "../../components/SearchBar";
import TitleComponent from "../../components/TitleComponent";
import PaginationComponent from "../../components/Pagenation";

const apiUrl = process.env.REACT_APP_API_URL;

function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // 預設每頁顯示10項
  const [newsData, setNewsData] = useState();
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  const getNewsData = async (page, size, term = "", startDate = null, endDate = null) => {
    setLoading(true);
    try {
      let url = `${apiUrl}information/articles/?page=${page}&page_size=${size}`;
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
      const sortedData = response.data.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNewsData(sortedData);
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
    getNewsData(currentPage, pageSize, searchTerm, dateRange[0], dateRange[1]);
  }, [currentPage, pageSize, searchTerm, dateRange[0], dateRange[1]]);

  return (
    <>
      <TitleComponent label={"最新消息"} />
      <Space direction="vertical" size="large">
        <SearchBar onSearch={handleSearch} onDateRangeChange={handleDateRangeChange} />
        <NewsComponent newsData={newsData} loading={loading} />
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

export default News;
