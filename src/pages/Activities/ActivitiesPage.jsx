import { Space, Row } from "antd";
import ActivityComponent from "./ActivityComponent";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import TitleComponent from "../../components/TitleComponent";
import PaginationComponent from "../../components/Pagenation";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

// TODO get
// TODO ticket
const StylePagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;

function Activities() {
  const [eventData, setActivitiesData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const getVideosData = async () => {
    try {
      const response = await axios.get(`${apiUrl}activity/events/`);
      setActivitiesData(response.data.events);
      console.log(response.data.events);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVideosData();
  }, []);
  return (
    <>
      <TitleComponent label="近期活動" />

      <Space direction="vertical" size="large">
        <SearchBar />
        <Row>
          <ActivityComponent eventData={eventData} />
        </Row>
      </Space>
      <StylePagination>
        <PaginationComponent />
      </StylePagination>
    </>
  );
}

export default Activities;
