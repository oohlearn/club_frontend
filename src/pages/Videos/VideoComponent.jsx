import styled from "styled-components";
import { Row, Col, Image } from "antd";
import React, { useState, useEffect } from "react";
import VideoModal from "./VideoModal";
import axios from "axios";

const VideoContainer = styled.div`
  VideoModal {
    width: 300px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 10px;
  }
  .info {
    margin-top: 20px;
  }
  img {
    width: 300px;
    height: auto;
  }
`;

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

function VideoComponent() {
  const [videosData, setVideosData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const getVideosData = async () => {
    try {
      const response = await axios.get(`${apiUrl}information/videos/`);
      console.log(response.data);
      setVideosData(response.data.videos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideosData();
  }, []);

  return (
    <VideoContainer>
      {videosData.map((video) => (
        <React.Fragment key={video.id}>
          <Row gutter={30}>
            <Col span={10}>
              <VideoModal video={video} />
            </Col>

            <Col className="info" span={13} push={1}>
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
          </Row>
          <br />
        </React.Fragment>
      ))}
    </VideoContainer>
  );
}

export default VideoComponent;
