import { Space, Row } from "antd";
import ActivityComponent from "./ActivityComponent";
import SearchBar from "../../components/SearchBar";
import TitleComponent from "../../components/TitleComponent";
import PaginationComponent from "../../components/Pagenation";
import axios from "axios";
import { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

function Activities() {
  const [eventData, setEventsData] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getActivitiesData = async (page, size) => {
    try {
      const response = await axios.get(`${apiUrl}activity/events/?page=${page}&page_size=${size}`);
      setEventsData(response.data.events);
      setTotalItems(response.data.total); // 假設 API 返回總項目
      console.log(response.data.events);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  useEffect(() => {
    getActivitiesData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <>
      <TitleComponent label="近期活動" />

      <Space direction="vertical" size="large">
        <SearchBar />
        <Row>
          <ActivityComponent eventData={eventData} />
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

export default Activities;
