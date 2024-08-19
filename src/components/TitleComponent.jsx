import { Col, Flex, Button, Divider, Space, Row } from "antd";
import styled from "styled-components";

const StyledRow = styled(Row)`
  justify-content: center;
  text-align: center;
`;

function TitleComponent({ label }) {
  return (
    <StyledRow>
      <Col>
        <h2>{label}</h2>
        <Divider />
      </Col>
    </StyledRow>
  );
}

export default TitleComponent;
