import styled from "styled-components";
import { Image, Row, Col, Divider } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify"; //清理HTML

const ConductorsStyle = styled.div`
  .image {
    width: 250px;
  }
`;

function Conductors() {
  const [conductorsData, setConductorsData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const getConductorsData = async () => {
    try {
      const response = await axios.get(`${apiUrl}information/conductors/`);
      console.log(response.data);
      setConductorsData(response.data.conductors);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getConductorsData();
  }, []);

  return (
    <ConductorsStyle>
      {conductorsData.map((conductor) => {
        return (
          <Row gutter={50} key={conductor.id}>
            <Col span={8}>
              <Image className="image" src={conductor.image} alt="" />
            </Col>
            <Col span={16}>
              <h5>
                <strong>{conductor.name}</strong>
              </h5>
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(conductor.description) }} />
              <h6 style={{ display: conductor.experiences === "" ? "none" : "block" }}>重要經歷</h6>
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(conductor.experiences) }} />
            </Col>
            <Divider />
          </Row>
        );
      })}
    </ConductorsStyle>
  );
}
export default Conductors;
