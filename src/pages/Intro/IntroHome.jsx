import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify"; //清理HTML

function IntroHome() {
  const [introData, setIntroData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);

  const getIntroData = async () => {
    try {
      const response = await axios.get(`${apiUrl}information/introduction/`);
      console.log(response.data);
      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setIntroData(sortedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 数据加载完成后或请求出错后设置 loading 为 false
    }
  };
  useEffect(() => {
    getIntroData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Row justify={"center"}>
        <img src={introData[0].indexImage} alt="團照" width={"80%"} height={"auto"} />
      </Row>
      <br />
      <Row gutter={20}>
        <Col span={6}>
          <img src={introData[0].image_2} alt="" width={"80%"} height={"auto"} />
        </Col>
        <Col
          span={18}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(introData[0].description) }}
        ></Col>
      </Row>
    </>
  );
}

export default IntroHome;
