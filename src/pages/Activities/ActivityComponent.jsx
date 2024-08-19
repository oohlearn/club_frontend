import styled from "styled-components";
import { Row, Col, Button, Flex } from "antd";
import React from "react";
import { Link } from "react-router-dom";
// import { activitiesData } from "../../../textFile";

const ActivityContainer = styled.div`
  img {
    width: 150px;
  }
  .info {
    margin-top: 20px;
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

function ActivityComponent({ activitiesData }) {
  return (
    <ActivityContainer>
      {activitiesData.map((activity) => {
        return (
          <StyleLink to={`/activities/${activity.id}`}>
            <Row gutter={30} key={activity.index}>
              <Col span={8}>
                <img src={activity.poster} alt="" />
              </Col>
              <Col className="info" span={16}>
                <h3>{activity.title}</h3>
                <h5>
                  {activity.date} - {activity.place}
                </h5>
                <h5 style={{ color: "orange" }}>票價：{activity.price}</h5>

                <p>{activity.description}</p>
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
