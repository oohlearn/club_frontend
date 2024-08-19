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

function Home() {
  console.log(newsData[0]);
  // 渲染API抓回的資料，目前用不到
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  // useEffect(() => {
  //   fetch(fakeDataUrl)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setInitLoading(false);
  //       setData(res.results);
  //       setList(res.results);
  //     });
  // }, []);
  // const onLoadMore = () => {
  //   setLoading(true);
  //   setList(
  //     data.concat(
  //       [...new Array(count)].map(() => ({
  //         loading: true,
  //         name: {},
  //         picture: {},
  //       }))
  //     )
  //   );
  //   fetch(fakeDataUrl)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const newData = data.concat(res.results);
  //       setData(newData);
  //       setList(newData);
  //       setLoading(false);
  //       // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
  //       // In real scene, you can using public method of react-virtualized:
  //       // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
  //       window.dispatchEvent(new Event("resize"));
  //     });
  // };
  // const loadMore =
  //   !initLoading && !loading ? (
  //     <div
  //       style={{
  //         textAlign: "center",
  //         marginTop: 12,
  //         height: 32,
  //         lineHeight: "32px",
  //       }}
  //     >
  //       <Button onClick={onLoadMore}>loading more</Button>
  //     </div>
  //   ) : null;
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
