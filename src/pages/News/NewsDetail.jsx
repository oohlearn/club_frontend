import { Row, Image, Col, Button } from "antd";
import { useState, useEffect } from "react";
import TitleComponent from "../../components/TitleComponent";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify"; //清理HTML

const NewsStyle = styled.div`
  img {
    width: 400px;
  }
  h6 {
    display: none;
  }

  p {
    padding-top: 20px;
    font-size: large;
  }
  h5 {
    padding-top: 20px;
  }
  .content {
    width: 400px;
  }
`;

function NewsDetail() {
  const { newsId } = useParams();
  const [newsData, setEventData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const getEventData = async () => {
    try {
      const response = await axios.get(`${apiUrl}information/articles/${newsId}/`);
      setEventData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 数据加载完成后或请求出错后设置 loading 为 false
    }
  };
  const bigFirstWord = (content) => {
    if (!content) return "";
    // 提取第一个字符和剩下的内容
    const firstChar = content.charAt(0);
    const restOfContent = content.slice(1);

    // 返回带有 `span` 包裹的第一个字母
    return `<span class="first-char">${firstChar}</span>${restOfContent}`;
  };

  useEffect(() => {
    getEventData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <NewsStyle>
      <Row style={{ textAlign: "center", justifyContent: "center" }}>
        <Col span={24}>
          <TitleComponent label={` ${newsData.title} `} />
        </Col>
      </Row>
      <Row style={{ textAlign: "center", justifyContent: "center" }}>
        <Col span={24}>
          <img src={newsData.article_img} alt="" preview={false} />
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col>
          <strong>
            <h6>
              關鍵字：
              <Button type="link">關鍵字1</Button>、<Button type="link">關鍵字2</Button>、
              <Button type="link">關鍵字3</Button>
            </h6>
          </strong>
        </Col>
        <Col className="content">
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsData.content) }}></p>
        </Col>
      </Row>
      <Row justify={"center"} style={{ marginTop: "50px" }}>
        <Link to={"/news"}>
          <Button type="default">回文章首頁</Button>
        </Link>
      </Row>
    </NewsStyle>
  );
}
export default NewsDetail;
