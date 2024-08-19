import React from "react";
import { Card } from "antd";
const { Meta } = Card;
const ArticleCard = () => (
  <Card
    hoverable
    style={{
      width: 150,
    }}
    cover={<img alt="example" src="/images/home.jpg" />}
  >
    <Meta title="Title" />
  </Card>
);
export default ArticleCard;
