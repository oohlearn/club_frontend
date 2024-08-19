import styled from "styled-components";
import { conductorData } from "../../textFile";
import { Image, Row, Col } from "antd";

const ImageStyle = styled(Image)`
  width: 200px;
`;

function Conductors() {
  return (
    <>
      {conductorData.map((conductor) => {
        return (
          <Row gutter={20} key={conductor.index}>
            <Col span={8}>
              <ImageStyle src={conductor.img} alt="" />
            </Col>
            <Col span={16}>
              <h5>
                <strong>{conductor.name}</strong>
              </h5>
              <p>{conductor.description}</p>
              <h6>重要經歷</h6>
              <p>{conductor.content}</p>
            </Col>
          </Row>
        );
      })}
    </>
  );
}
export default Conductors;
