import styled from "styled-components";
import { Row, Col, Button, Flex, Divider } from "antd";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ActivityContainer = styled.div`
  img {
    width: 150px;
  }
  .info {
    margin-top: 20px;
    width: 600px;
  }
`;
const StyleLink = styled(Link)`
  text-decoration: none;
  h3 {
    color: blue;
  }
  h5 {
    color: black;
  }
  p {
    color: gray;
  }
`;

function ActivityComponent({ eventData }) {
  return (
    <ActivityContainer>
      {eventData.map((event) => {
        return (
          <StyleLink to={`/activities/${event.id}`} key={event.id}>
            <Row justify={"space-around"}>
              <Col span={8} push={1}>
                <img src={event.poster} alt="" />
              </Col>
              <Col className="info" span={14}>
                <h3>{event.title}</h3>
                <h5>
                  {event.date}（{event.weekday}） {event.time}
                </h5>
                <h5>{event.venue.name}</h5>
                <h6>
                  演出者：
                  {event.player.map((person, index) => (
                    <span key={index}>
                      {person.title}
                      {"\u00A0\u00A0"}
                      {person.name}
                      <Divider type="vertical" />
                    </span>
                  ))}
                </h6>
                <h6 style={{ color: "orange" }}>
                  票價：
                  {event.zone
                    .sort((a, b) => a.price - b.price)
                    .map(
                      (area, index) =>
                        `${area.price}${index !== event.zone.length - 1 ? " / " : ""}`
                    )}
                </h6>
                <Flex justify="end">
                  <Button type="primary">購票去</Button>
                </Flex>
              </Col>
            </Row>
            <br />
          </StyleLink>
        );
      })}
    </ActivityContainer>
  );
}

export default ActivityComponent;
