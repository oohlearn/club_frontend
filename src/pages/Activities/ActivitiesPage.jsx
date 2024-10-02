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

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  const getActivitiesData = async (page, size, term = "", startDate = null, endDate = null) => {
    try {
      let url = `${apiUrl}activity/events/?page=${page}&page_size=${size}`;
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
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    setCurrentPage(1);
  };
  useEffect(() => {
    getActivitiesData(currentPage, pageSize, searchTerm, dateRange[0], dateRange[1]);
  }, [currentPage, pageSize, searchTerm, dateRange[0], dateRange[1]]);

  return (
    <>
      <TitleComponent label="近期活動" />

      <Space direction="vertical" size="large">
        <SearchBar onSearch={handleSearch} onDateRangeChange={handleDateRangeChange} />

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
