import { Row, Image, Col, Button } from "antd";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import TitleComponent from "../../components/TitleComponent";
import { newsData } from "../../textFile";
import styled from "styled-components";

const NewsStyle = styled.div`
  img {
    width: 450px;
  }

  justify-content: center;
  text-align: start;
  p {
    padding-left: 50px;
    padding-right: 50px;
  }
  h5 {
    padding-top: 20px;
  }
`;

function NewsDetail() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const newsIndex = pathSnippets[1] - 1;
  const news = newsData[newsIndex];
  return (
    <>
      <Row style={{ textAlign: "center", justifyContent: "center" }}>
        <TitleComponent label={` ${news.title} `} />
      </Row>
      <NewsStyle>
        <Row justify={"center"}>
          <Col>
            <img
              src="https://plus.unsplash.com/premium_photo-1664304423623-4f9d5ed90b4f?q=80&w=2336&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              preview={false}
            />
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
          <Col>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae similique libero
              numquam sequi recusandae. Quas corporis est id quos quia. Provident quis libero
              consequatur fugiat. Numquam neque facilis enim alias.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ipsa doloremque
              aliquid voluptates nostrum eius quidem, modi odit cupiditate corrupti laudantium?
              Ullam eum aut nulla! Neque in deleniti illo. Nulla!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum perferendis iste odio
              totam itaque nemo veniam nihil, illum adipisci ducimus aut dolores eum aliquid numquam
              dolore et nostrum temporibus officiis!
            </p>
          </Col>
        </Row>
      </NewsStyle>
      <Row justify={"center"} style={{ marginTop: "50px" }}>
        <Button type="default">回文章首頁</Button>
      </Row>
    </>
  );
}
export default NewsDetail;
