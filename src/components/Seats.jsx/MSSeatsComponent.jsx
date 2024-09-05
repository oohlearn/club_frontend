import { Row, Col } from "antd";
import styled from "styled-components";

const SeatsStyle = styled.div`
  /* .seatss {
    display: flex;
    flex-direction: column;
    transform: perspective(1000px) rotateX(50deg);
    margin: 0px auto;
    align-items: center;
    background: white;
  } */

  .seat {
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 4px 4px 8px 8px;
    position: relative;
    border: 1px solid #000;
    margin: 2px;
    display: inline-block;
    font-size: 10px;
    align-items: center;
  }
  .stage {
    border: 1px solid #000;
    justify-content: center;
    text-align: center;
    margin-bottom: 10px;
  }
  .row {
    flex-wrap: nowrap;
    width: 1000px;
    display: flex;
    /* justify-content: center; */
  }
  ${(props) => `display: ${props.display}`};
  border: 1px solid gray;
  padding: 3px;
  width: 600px;

  .seats {
    overflow-y: auto;
    display: flex;
    height: 500px;
    width: 600px;
    display: flex;
    justify-content: center;
  }
`;

function SeatsComponents({ event, display }) {
  return (
    <SeatsStyle display={display}>
      <Row>
        <Col className="stage" span={24}>
          舞台
        </Col>
      </Row>
      <Row justify={"space-around"} className="seats">
        <Col span={5}>
          {event.zone
            .filter((zone) => zone.area === "前左")
            .map((area) => {
              const rows = area.seat.reduce((acc, seat) => {
                const currentRowNum = seat.seat_num[0];
                const lastRowNum = acc[acc.length - 1];

                if (!lastRowNum || lastRowNum[0].seat_num[0] !== currentRowNum) {
                  acc.push([seat]);
                } else {
                  lastRowNum.push(seat);
                }
                return acc;
              }, []);
              return rows.map((row, rowIndex) => {
                // 對整排座位進行排序
                const sortedRow = row.sort((a, b) => {
                  const aNum = parseInt(a.seat_num.slice(1));
                  const bNum = parseInt(b.seat_num.slice(1));

                  return bNum - aNum;
                });

                return (
                  <Row key={`${rowIndex}`} justify={"end"}>
                    {sortedRow.map((seat, seatIndex) => (
                      <Col
                        className="seat"
                        style={{ backgroundColor: area.color }}
                        key={`${rowIndex}-${seatIndex}`}
                      >
                        {seat.seat_num}
                      </Col>
                    ))}
                  </Row>
                );
              });
            })}
        </Col>
        <Col span={12}>
          {event.zone
            .filter((zone) => zone.area === "前中")
            .map((area) => {
              const rows = area.seat.reduce((acc, seat) => {
                const currentRowNum = seat.seat_num[0];
                const lastRowNum = acc[acc.length - 1];

                if (!lastRowNum || lastRowNum[0].seat_num[0] !== currentRowNum) {
                  acc.push([seat]);
                } else {
                  lastRowNum.push(seat);
                }
                return acc;
              }, []);
              return rows.map((row, rowIndex) => {
                // 對整排座位進行排序
                const sortedRow = row.sort((a, b) => {
                  const aNum = parseInt(a.seat_num.slice(1));
                  const bNum = parseInt(b.seat_num.slice(1));

                  if (aNum % 2 === 1 && bNum % 2 === 1) {
                    // 兩者都是奇數，從大到小排序
                    return bNum - aNum;
                  } else if (aNum % 2 === 0 && bNum % 2 === 0) {
                    // 兩者都是偶數，從小到大排序
                    return aNum - bNum;
                  } else {
                    // 一奇一偶，奇數排在前面
                    return aNum % 2 === 0 ? 1 : -1;
                  }
                });

                return (
                  <Row key={`${rowIndex}`} justify={"center"}>
                    {sortedRow.map((seat, seatIndex) => (
                      <Col
                        className="seat"
                        key={`${rowIndex}-${seatIndex}`}
                        style={{ backgroundColor: area.color }}
                      >
                        {seat.seat_num}
                      </Col>
                    ))}
                  </Row>
                );
              });
            })}
        </Col>
        <Col span={5}>
          {event.zone
            .filter((zone) => zone.area === "前左")
            .map((area) => {
              const rows = area.seat.reduce((acc, seat) => {
                const currentRowNum = seat.seat_num[0];
                const lastRowNum = acc[acc.length - 1];

                if (!lastRowNum || lastRowNum[0].seat_num[0] !== currentRowNum) {
                  acc.push([seat]);
                } else {
                  lastRowNum.push(seat);
                }
                return acc;
              }, []);
              return rows.map((row, rowIndex) => (
                <Row key={rowIndex}>
                  {row.map((seat, seatIndex) => (
                    <Col className="seat" key={seatIndex} style={{ backgroundColor: area.color }}>
                      {seat.seat_num}
                    </Col>
                  ))}
                </Row>
              ));
            })}
        </Col>
      </Row>
    </SeatsStyle>
  );
}
export default SeatsComponents;
