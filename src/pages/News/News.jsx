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

  const getNewsData = async (page, size) => {
    try {
      const response = await axios.get(
        `${apiUrl}information/articles/?page=${page}&page_size=${pageSize}`
      );
      setNewsData(response.data.articles);
      setTotalItems(response.data.total); // 假設 API 返回總項目
      console.log({ totalItems });
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
    getNewsData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <>
      <TitleComponent label={"最新消息"} />
      <Space direction="vertical" size="large">
        <SearchBar />
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
