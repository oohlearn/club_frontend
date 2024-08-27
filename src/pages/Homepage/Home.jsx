import MainArticle from "./MainArticle";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Button, List, Skeleton, Col, Flex, Row, Divider } from "antd";
import { Link } from "react-router-dom";
import { newsData } from "../../textFile";

const StyleLink = styled(Link)`
  text-decoration: none;
  font-size: large;
`;
// TODO Get 首頁
function Home() {
  console.log(newsData[0]);

  return (
    <>
      <Col>
        <MainArticle latestNews={newsData[0]} />
      </Col>
      <br />
      <List
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={newsData}
        renderItem={(news) => (
          <Row>
            <Skeleton title={false} loading={news.loading} active>
              <Col span={4} style={{ alignItems: "center", display: "flex" }}>
                <List.Item>{news.date}</List.Item>
              </Col>
              <Col span={16}>
                <List.Item>
                  <List.Item.Meta
                    title={
                      <strong>
                        <StyleLink to={`/news/${news.index}`}>{news.title}</StyleLink>
                      </strong>
                    }
                    description={news.content}
                  />
                </List.Item>
              </Col>
              <Col offset={1} span={3} style={{ display: "flex", alignItems: "end" }}>
                <List.Item>
                  <StyleLink to={`/news/${news.index}`}>more...</StyleLink>
                </List.Item>
              </Col>
            </Skeleton>
          </Row>
        )}
      />
    </>
  );
}

export default Home;
