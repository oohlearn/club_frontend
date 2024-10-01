import styled from "styled-components";
import { Row, Col, Image } from "antd";
import React from "react";
import VideoModal from "./VideoModal";

const VideoContainer = styled.div`
  VideoModal {
    width: 300px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 10px;
  }
  img {
    width: 300px;
    height: auto;
  }
  .info {
    margin-left: 5px;
    width: 500px;
  }
`;
const InfoStyle = styled.div``;

const LinkStyle = styled.a`
  text-decoration: none;
  transition: color 0.5 ease-in-out;
  h3 {
    color: navy;
  }
  h5 {
    color: black;
  }

  &:hover h3,
  &:hover h5 {
    color: #4096ff;
  }
`;

function VideoComponent({ videosData }) {
  return (
    <VideoContainer>
      {videosData.map((video) => (
        <Row key={video.id}>
          <Col span={8}>
            <VideoModal video={video} />
          </Col>
          <Col className="info" span={12} push={3}>
            <LinkStyle
              href={video.url}
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noreferrer"
            >
              <h3>{video.title}</h3>
              <h5>演出者：{video.performer}</h5>
              <h5>
                {video.date} - {video.place}
              </h5>

              <p>{video.description}</p>
            </LinkStyle>
          </Col>
          <br />
        </Row>
      ))}
    </VideoContainer>
  );
}

export default VideoComponent;
