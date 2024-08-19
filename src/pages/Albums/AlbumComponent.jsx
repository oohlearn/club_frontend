import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, ConfigProvider, Row } from "antd";
import styled from "styled-components";
import { albumsData } from "../../textFile";

const StyleLink = styled(Link)`
  text-decoration: none;
`;

const { Meta } = Card;

function AlbumsComponent() {
  return (
    <>
      <Row gutter={8}>
        {albumsData.map((album) => (
          <Col span={8} key={album.index}>
            <StyleLink to={`/albums/${album.index}`}>
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
                  cover={<img alt="example" src={album.indexImg} />}
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
