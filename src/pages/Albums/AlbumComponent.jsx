import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Card, Col, ConfigProvider, Row } from "antd";
import styled from "styled-components";
import axios from "axios";

const StyleLink = styled(Link)`
  text-decoration: none;
`;

const { Meta } = Card;

function AlbumsComponent() {
  const [albumsData, setAlbumsData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${apiUrl}information/albums/`);
      console.log(response.data.albums);
      const sortedData = response.data.albums.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAlbumsData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAlbumsData();
  }, []);
  return (
    <>
      <Row gutter={8}>
        {albumsData.map((album) => (
          <Col span={8} key={album.id}>
            <StyleLink to={`/albums/${album.id}`}>
              <ConfigProvider
                theme={{
                  token: {
                    paddingLG: 10,
                  },
                }}
              >
                <Card
                  hoverable
                  style={{
                    width: 240,
                    height: "auto",
                    padding: 0,
                  }}
                  cover={<img alt="example" src={album.indexImage} />}
                >
                  <Meta
                    title={album.title}
                    style={{
                      textAlign: "center",
                    }}
                  />
                  <Meta description={album.date} style={{ textAlign: "end" }} />
                </Card>
              </ConfigProvider>
            </StyleLink>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default AlbumsComponent;
