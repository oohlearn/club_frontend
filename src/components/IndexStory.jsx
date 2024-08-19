import React from "react";
import { Carousel, Flex } from "antd";
import styled from "styled-components";
import { indexStoryData } from "../textFile";

const CarouselStyle = styled.div`
  .text {
    /* height: 200px; */
    color: navy;
    /* line-height: 130px; */
  }
  h5 {
    color: blue;
    text-align: left;
  }
  text-align: center;
  .carousel-image {
    height: 200px;
    max-width: 100%;
    width: auto;
    object-fit: contain;
  }
`;

const IndexStory = () => (
  <CarouselStyle>
    <Carousel arrows autoplay>
      {indexStoryData.map((story) => {
        return (
          <div key={story.index}>
            <Flex justify="center" gap="middle" align="center">
              <img src={story.img} alt="" className="carousel-image" />
              <h3 className="text">{story.title}</h3>
              <div>
                <h5> {story.date}</h5>
                <h5> {story.place}</h5>
              </div>
            </Flex>
          </div>
        );
      })}
    </Carousel>
  </CarouselStyle>
);
export default IndexStory;
