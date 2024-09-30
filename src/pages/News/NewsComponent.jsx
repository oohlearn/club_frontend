import React from "react";
import { Button, List, Skeleton, Col, Flex, Row } from "antd";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify"; //清理HTML

function NewsComponent({ newsData, loading }) {
  // 函數：將 HTML 內容轉換為純文本
  const getText = (html) => {
    try {
      const doc = new DOMParser().parseFromString(html, "text/html").body.textContent;
      return doc.substring(0, 30);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
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
