import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row, Select, Steps, message, theme, Divider } from "antd";
import axios from "axios";
import SeatsComponents from "../../components/Seats.jsx/MSSeatsComponent";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "../../components/SecondStep";
import { ThirdStep } from "../../components/ThirdStep";

const SeatsViewStyle = styled.div`
  .seat {
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
`;

const current = 0;
// TODO與商城合併
const StepsComponent = ({ eventData, newOrder }) => {
  const steps = [
    {
      title: "確認座位及張數",
      content: <FirstStep eventData={eventData} newOrder={newOrder} />,
    },
    {
      title: "確認訂單內容",
      content: <SecondStep eventData={eventData} newOrder={newOrder} />,
    },
    {
      title: "填寫訂購人資料及繳費",
      content: <ThirdStep eventData={eventData} newOrder={newOrder} />,
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} activityData={eventData} newOrder={newOrder} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 45,
          justifyContent: "center",
          display: "flex",
        }}
      >
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}

        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success("Processing complete!")}>
            Done
          </Button>
        )}
      </div>
    </>
  );
};

function ChooseSeats() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [choiceSeats, setChoiceSeats] = useState([]);

  const getEventData = async () => {
    try {
      const response = await axios.get(`${apiUrl}activity/events/${eventId}/`);
      setEventData(response.data);
      setDataSource(response.data.zone);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 数据加载完成后或请求出错后设置 loading 为 false
    }
  };
  useEffect(() => {
    getEventData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = (seat) => {
    // 获取之前选择的座位
    const newChoiceSeats = [...choiceSeats];

    // 检查座位是否已经存在于选择中
    const seatIndex = newChoiceSeats.findIndex(
      (existingSeat) => existingSeat.seat_num === seat.seat_num
    );

    if (seatIndex === -1) {
      // 如果座位不在选择中，则添加它
      newChoiceSeats.push(seat);
    } else {
      // 如果座位已在选择中，则从选择中移除它
      newChoiceSeats.splice(seatIndex, 1);
    }

    // 更新选择的座位
    setChoiceSeats(newChoiceSeats);
    console.log(choiceSeats);
  };

  return (
    <>
      {/* <StepsComponent current={current} eventData={eventData} /> */}
      <br />
      <Row justify={"center"}>
        <Divider
          orientation="center"
          orientationMargin={0}
          style={{ display: eventData.ticket_system_url ? "none" : "block" }}
        >
          <h5 style={{ fontWeight: "bold" }}>購票說明</h5>
        </Divider>
        <ol>
          <li>
            請先選擇欲購票價的<strong>『張數』</strong>，再點選<strong>『選位方式』</strong>
            ，即可進入訂購確認頁面。
          </li>
          <li>單次購票僅能選擇單一票種，若須購買不同票種，請再次下單購買。</li>
        </ol>
        <SeatsViewStyle>
          <SeatsComponents
            event={eventData}
            handleClick={handleClick}
            display={eventData.ticket_system_url ? "none" : "block"}
          />
        </SeatsViewStyle>
      </Row>
    </>
  );
}

export default ChooseSeats;
