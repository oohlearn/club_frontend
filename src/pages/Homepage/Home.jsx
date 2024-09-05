import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Button, List, Skeleton, Col, Flex, Row, Divider } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify"; //清理HTML

const StyleLink = styled(Link)`
  text-decoration: none;
  font-size: large;
`;

const MainLinkStyle = styled.div`
  img {
    width: 150px;
  }
  .content {
    width: 600px;
  }
`;

const getText = (html) => {
  try {
    const doc = new DOMParser().parseFromString(html, "text/html").body.textContent;
    return doc.substring(0, 30);
  } catch (error) {
    console.log(error);
  }
};

function MainArticle({ mainArticle }) {
  return (
    <MainLinkStyle>
      <Link to={`/activities/${mainArticle.id}`} style={{ textDecoration: "none" }}>
        <Row justify={"space-around"}>
          <Col span={8} push={1}>
            <img className="mainImg" src={mainArticle.poster} alt="" />
          </Col>
          <Col span={14} className="content">
            <h3>{mainArticle.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: getText(mainArticle.description) }} />
            <Row align={"bottom"}>
              <Button type="primary">購票去</Button>
            </Row>
          </Col>
        </Row>
      </Link>
    </MainLinkStyle>
  );
}
// TODO Get 首頁
function Home() {
  const [homepageData, setHomepageData] = useState({});
  const [mainArticle, setMainArticle] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);

  const getEventData = async () => {
    try {
      const response = await axios.get(`${apiUrl}information/home_content/`);
      setHomepageData(response.data.homeContent[0]);
      setMainArticle(response.data.homeContent[0].events[0]);
      console.log(response.data.homeContent[0].events[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 数据加载完成后或请求出错后设置 loading 为 false
    }
  };

  useEffect(() => {
    getEventData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Col>
        <MainArticle mainArticle={mainArticle} />
      </Col>
      <br />
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={homepageData.articles}
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
                        <StyleLink to={`/news/${news.id}`}>{news.title}</StyleLink>
                      </strong>
                    }
                    description={
                      <Link to={`/news/${news.id}`} style={{ textDecoration: "none" }}>
                        <span dangerouslySetInnerHTML={{ __html: getText(news.content) }} />
                      </Link>
                    }
                  />
                </List.Item>
              </Col>
              <Col offset={1} span={3} style={{ display: "flex", alignItems: "end" }}>
                <List.Item>
                  <StyleLink to={`/news/${news.id}`}>more...</StyleLink>
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
