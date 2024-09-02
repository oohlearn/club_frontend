import React, { useEffect, useState } from "react";
import { Button, List, Skeleton, Col, Flex, Row } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify"; //清理HTML
import styled from "styled-components";

function NewsComponent() {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState([]);
  const [newsData, setNewsData] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const getNewsData = async () => {
    try {
      const response = await axios.get(`${apiUrl}information/articles/`);
      setNewsData(response.data.articles);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 数据加载完成后或请求出错后设置 loading 为 false
    }
  };
  // 函數：將 HTML 內容轉換為純文本
  const getText = (html) => {
    try {
      const doc = new DOMParser().parseFromString(html, "text/html").body.textContent;
      return doc.substring(0, 30);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
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
      <List
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={newsData}
        renderItem={(item) => (
          <Row>
            <Skeleton title={false} loading={item.loading} active>
              <Col span={4}>
                <List.Item>{item.date}</List.Item>
              </Col>
              <Col span={16}>
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Link
                        to={`/news/${item.id}`}
                        style={{ fontSize: "large", fontWeight: "bold" }}
                      >
                        {item.title}
                      </Link>
                    }
                    description={
                      <span dangerouslySetInnerHTML={{ __html: getText(item.content) }} />
                    }
                  />
                </List.Item>
              </Col>
              <Col span={4}>
                <List.Item>more...</List.Item>
              </Col>
            </Skeleton>
          </Row>
        )}
      />
    </>
  );
}

export default NewsComponent;
