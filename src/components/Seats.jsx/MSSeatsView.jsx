import { Row, Col } from "antd";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { EventContext } from "../../pages/Activities/ActivityDetail";

const SeatsStyle = styled.div`
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
    margin: 10px 0px 10px 0px;
    width: 100px;
  }
  .row {
    flex-wrap: nowrap;
    width: 670px;
    display: flex;
  }
  ${(props) => `display: ${props.display}`};
  border: 1px solid gray;
  width: 670px;
  padding-bottom: 10px;
  .area {
    height: 120px;
    flex-wrap: nowrap;
    display: flex;
    width: 680px;
    margin: 3px;
  }
  .blank-row {
    margin-top: 22px;
  }
  .seats {
    overflow-y: auto;
    height: 300px;
    width: 670px;
    justify-content: center;
  }
`;

function SeatsViewComponents({ display }) {
  const [seatsData, setSeatsData] = useState([]);
  const { eventData } = useContext(EventContext);

  const getData = async () => {
    try {
      if (eventData.zone.length === 0) {
        setSeatsData(eventData.zoneForNumberRow);
        console.log(seatsData);
      } else {
        setSeatsData(eventData.zone);
        console.log(seatsData);
      }
      console.log(eventData);
    } catch (error) {
      console.log(error);
    }
  };

  const getBGColor = (seat) => {
    let color = seat.color;
    if (seat.not_sell || seat.is_sold) {
      color = "#ADADAD";
    }
    return color;
  };

  const getTextColor = (seat) => {
    let color = "#000000"; //初始黑色
    if (seat.not_sell || seat.is_sold) {
      color = "#ADADAD";
    }
    return color;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SeatsStyle display={display}>
      <Row justify={"center"}>
        <Col className="stage">舞台</Col>
      </Row>
      <Row className="seats">
        <Row justify={"space-around"} className="area area-font">
          <Col span={6}>
            {seatsData
              .filter((zone) => zone.area === "A")
              .map((area) => {
                const rows = area.seat.reduce((acc, seat) => {
                  const currentRowNum = seat.row_num || seat.seat_num[0];
                  const lastRow = acc[acc.length - 1];

                  if (
                    !lastRow ||
                    (lastRow[0].row_num && lastRow[0].row_num !== currentRowNum) ||
                    (!lastRow[0].row_num && lastRow[0].seat_num[0] !== currentRowNum)
                  ) {
                    acc.push([seat]);
                  } else {
                    lastRow.push(seat);
                  }

                  return acc;
                }, []);

                return rows.map((row, rowIndex) => {
                  // 對整排座位進行排序
                  const sortedRow = row.sort((a, b) => {
                    const aNum = parseInt(a.seat_num.replace(/\D/g, ""));
                    const bNum = parseInt(b.seat_num.replace(/\D/g, ""));
                    return bNum - aNum; // 改為升序排列
                  });

                  return (
                    <Row key={`row-${rowIndex}`} justify="end">
                      {sortedRow.map((seat, seatIndex) => (
                        <Col
                          className="seat"
                          style={{
                            backgroundColor: getBGColor(seat),
                            color: getTextColor(seat),
                          }}
                          key={`seat-${rowIndex}-${seatIndex}`}
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
            {seatsData
              .filter((zone) => zone.area === "B")
              .map((area) => {
                const rows = area.seat.reduce((acc, seat) => {
                  const currentRowNum = seat.row_num || seat.seat_num[0];
                  const lastRow = acc[acc.length - 1];

                  if (
                    !lastRow ||
                    (lastRow[0].row_num && lastRow[0].row_num !== currentRowNum) ||
                    (!lastRow[0].row_num && lastRow[0].seat_num[0] !== currentRowNum)
                  ) {
                    acc.push([seat]);
                  } else {
                    lastRow.push(seat);
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
                            backgroundColor: getBGColor(seat),
                            color: getTextColor(seat),
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
            {seatsData
              .filter((zone) => zone.area === "C")
              .map((area) => {
                const rows = area.seat.reduce((acc, seat) => {
                  const currentRowNum = seat.row_num || seat.seat_num[0];
                  const lastRow = acc[acc.length - 1];

                  if (
                    !lastRow ||
                    (lastRow[0].row_num && lastRow[0].row_num !== currentRowNum) ||
                    (!lastRow[0].row_num && lastRow[0].seat_num[0] !== currentRowNum)
                  ) {
                    acc.push([seat]);
                  } else {
                    lastRow.push(seat);
                  }

                  return acc;
                }, []);
                return rows.map((row, rowIndex) => (
                  <Row key={rowIndex}>
                    {row.map((seat, seatIndex) => (
                      <Col
                        className="seat"
                        key={seatIndex}
                        style={{
                          backgroundColor: getBGColor(seat),
                          color: getTextColor(seat),
                        }}
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
            {seatsData
              .filter((zone) => zone.area === "D")
              .map((area) => {
                const rows = area.seat.reduce((acc, seat) => {
                  const currentRowNum = seat.row_num || seat.seat_num[0];
                  const lastRow = acc[acc.length - 1];

                  if (
                    !lastRow ||
                    (lastRow[0].row_num && lastRow[0].row_num !== currentRowNum) ||
                    (!lastRow[0].row_num && lastRow[0].seat_num[0] !== currentRowNum)
                  ) {
                    acc.push([seat]);
                  } else {
                    lastRow.push(seat);
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
                            backgroundColor: getBGColor(seat),
                            color: getTextColor(seat),
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
            {seatsData
              .filter((zone) => zone.area === "E")
              .map((area) => {
                const rows = area.seat.reduce((acc, seat) => {
                  const currentRowNum = seat.row_num || seat.seat_num[0];
                  const lastRow = acc[acc.length - 1];

                  if (
                    !lastRow ||
                    (lastRow[0].row_num && lastRow[0].row_num !== currentRowNum) ||
                    (!lastRow[0].row_num && lastRow[0].seat_num[0] !== currentRowNum)
                  ) {
                    acc.push([seat]);
                  } else {
                    lastRow.push(seat);
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
                            backgroundColor: getBGColor(seat),
                            color: getTextColor(seat),
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
            {seatsData
              .filter((zone) => zone.area === "F")
              .map((area) => {
                const rows = area.seat.reduce((acc, seat) => {
                  const currentRowNum = seat.row_num || seat.seat_num[0];
                  const lastRow = acc[acc.length - 1];

                  if (
                    !lastRow ||
                    (lastRow[0].row_num && lastRow[0].row_num !== currentRowNum) ||
                    (!lastRow[0].row_num && lastRow[0].seat_num[0] !== currentRowNum)
                  ) {
                    acc.push([seat]);
                  } else {
                    lastRow.push(seat);
                  }

                  return acc;
                }, []);
                return rows.map((row, rowIndex) => (
                  <Row key={rowIndex}>
                    {row.map((seat, seatIndex) => (
                      <Col
                        className="seat"
                        key={seatIndex}
                        style={{
                          backgroundColor: getBGColor(seat),
                          color: getTextColor(seat),
                        }}
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
            {seatsData
              .filter((zone) => zone.area === "G")
              .map((area) => {
                const rows = area.seat.reduce((acc, seat) => {
                  const currentRowNum = seat.row_num || seat.seat_num[0];
                  const lastRow = acc[acc.length - 1];

                  if (
                    !lastRow ||
                    (lastRow[0].row_num && lastRow[0].row_num !== currentRowNum) ||
                    (!lastRow[0].row_num && lastRow[0].seat_num[0] !== currentRowNum)
                  ) {
                    acc.push([seat]);
                  } else {
                    lastRow.push(seat);
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
                            backgroundColor: getBGColor(seat),
                            color: getTextColor(seat),
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
            {seatsData
              .filter((zone) => zone.area === "H")
              .map((area) => {
                const rows = area.seat.reduce((acc, seat) => {
                  const currentRowNum = seat.row_num || seat.seat_num[0];
                  const lastRow = acc[acc.length - 1];

                  if (
                    !lastRow ||
                    (lastRow[0].row_num && lastRow[0].row_num !== currentRowNum) ||
                    (!lastRow[0].row_num && lastRow[0].seat_num[0] !== currentRowNum)
                  ) {
                    acc.push([seat]);
                  } else {
                    lastRow.push(seat);
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
                            backgroundColor: getBGColor(seat),
                            color: getTextColor(seat),
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
            {seatsData
              .filter((zone) => zone.area === "J")
              .map((area) => {
                const rows = area.seat.reduce((acc, seat) => {
                  const currentRowNum = seat.row_num || seat.seat_num[0];
                  const lastRow = acc[acc.length - 1];

                  if (
                    !lastRow ||
                    (lastRow[0].row_num && lastRow[0].row_num !== currentRowNum) ||
                    (!lastRow[0].row_num && lastRow[0].seat_num[0] !== currentRowNum)
                  ) {
                    acc.push([seat]);
                  } else {
                    lastRow.push(seat);
                  }

                  return acc;
                }, []);
                return rows.map((row, rowIndex) => (
                  <Row key={rowIndex}>
                    {row.map((seat, seatIndex) => (
                      <Col
                        className="seat"
                        key={seatIndex}
                        style={{
                          backgroundColor: getBGColor(seat),
                          color: getTextColor(seat),
                        }}
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
export default SeatsViewComponents;
