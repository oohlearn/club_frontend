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
    border: 0.5px solid #000;
    margin: 1px;
    display: inline-block;
    font-size: 10px;
    align-items: center;
  }
  .stage {
    border: 1px solid #000;
    justify-content: center;
    text-align: center;
    margin-bottom: 10px;
    width: 100px;
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
  width: 670px;
  .area {
    height: 120px;
    flex-wrap: nowrap;
    display: flex;
    width: 700px;
    margin: 5px;
  }
  .blank-row {
    margin-top: 22px;
  }
  .seats {
    overflow-y: auto;
    height: 300px;
    width: 680px;
    justify-content: center;
  }
`;

function SeatsComponents({ event, display }) {
  const getColor = (area, seat) => {
    if (seat.not_sell) {
      return "#ADADAD";
    } else if (seat.color === "") {
      return area.color;
    } else {
      return seat.color;
    }
  };
  return (
    <SeatsStyle display={display}>
      <Row justify={"center"}>
        <Col className="stage">舞台</Col>
      </Row>
      <Row className="seats">
        <Row justify={"space-around"} className="area area-font">
          <Col span={6}>
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
                          style={{
                            backgroundColor: getColor(area, seat),
                          }}
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
                          style={{
                            backgroundColor: getColor(area, seat),
                          }}
                        >
                          {seat.seat_num}
                        </Col>
                      ))}
                    </Row>
                  );
                });
              })}
          </Col>
          <Col span={6}>
            {event.zone
              .filter((zone) => zone.area === "前右")
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
                      <Col
                        className="seat"
                        key={seatIndex}
                        style={{ backgroundColor: seat.color === "" ? area.color : seat.color }}
                      >
                        {seat.seat_num}
                      </Col>
                    ))}
                  </Row>
                ));
              })}
          </Col>
        </Row>

        <Row justify={"space-around"} className="area area-middle">
          <Col span={6}>
            {event.zone
              .filter((zone) => zone.area === "中左")
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
                          style={{
                            backgroundColor: getColor(area, seat),
                          }}
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
              .filter((zone) => zone.area === "中中")
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
                          style={{
                            backgroundColor: getColor(area, seat),
                          }}
                        >
                          {seat.seat_num}
                        </Col>
                      ))}
                    </Row>
                  );
                });
              })}
          </Col>
          <Col span={6}>
            {event.zone
              .filter((zone) => zone.area === "中右")
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
                      <Col
                        className="seat"
                        key={seatIndex}
                        style={{ backgroundColor: seat.color === "" ? area.color : seat.color }}
                      >
                        {seat.seat_num}
                      </Col>
                    ))}
                  </Row>
                ));
              })}
          </Col>
        </Row>

        <Row justify={"space-around"} className="area area-back">
          <Col span={6} className="blank-row">
            {event.zone
              .filter((zone) => zone.area === "後左")
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
                          style={{
                            backgroundColor: getColor(area, seat),
                          }}
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
              .filter((zone) => zone.area === "後中")
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
                          style={{
                            backgroundColor: getColor(area, seat),
                          }}
                        >
                          {seat.seat_num}
                        </Col>
                      ))}
                    </Row>
                  );
                });
              })}
          </Col>
          <Col span={6} className="blank-row">
            {event.zone
              .filter((zone) => zone.area === "後右")
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
                      <Col
                        className="seat"
                        key={seatIndex}
                        style={{ backgroundColor: seat.color === "" ? area.color : seat.color }}
                      >
                        {seat.seat_num}
                      </Col>
                    ))}
                  </Row>
                ));
              })}
          </Col>
        </Row>
      </Row>
    </SeatsStyle>
  );
}
export default SeatsComponents;
