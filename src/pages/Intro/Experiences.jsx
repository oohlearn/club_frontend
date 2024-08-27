import { Col, Divider, Row, Table, List, Menu, Space } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ExperiencesTable = () => {
  const [experienceData, setExperiencesData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const getExperiencesData = async () => {
    try {
      const response = await axios.get(`${apiUrl}information/experiences/`);
      console.log(response.data);
      const sortedData = response.data.experiences.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setExperiencesData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getExperiencesData();
  }, []);
  const columns = [
    {
      title: "時間",
      dataIndex: "date",
      key: "date",
      render: (text) => {
        const date = new Date(text);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        return <span>{`${year - 1911}年${month}月`}</span>;
      },
      sorter: (a, b) => new Date(b.date) - new Date(a.date), // 降序排序
      defaultSortOrder: "ascend",
    },
    {
      title: "近年重要演出或比賽經歷",
      dataIndex: "experience",
      key: "experience",
    },
  ];
  return <Table columns={columns} pagination={false} dataSource={experienceData} />;
};
function ExperiencesPage() {
  return <ExperiencesTable />;
}
export default ExperiencesPage;
