import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  Select,
  Steps,
  message,
  theme,
  Divider,
  Space,
  ConfigProvider,
} from "antd";
import axios from "axios";
import SeatsChooseComponents from "../../components/Seats.jsx/MSChoiceSeats";
import TicketCartDrawer from "../Activities/TicketCartDrawer";
import { useTicketCart } from "../../context/TicketCartContext";
import { useTimer } from "../../context/TimerContext";
import TimerDisplay from "../../components/TimeDisplay";

const SeatsViewStyle = styled.div`
  .seat {
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
`;

function ChooseSeats() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);
  const { choiceSeats, getPrice, addToTicketCart, removeTicketFromCart } = useTicketCart();
  const { startTimer, timeLeft, formatTime } = useTimer();
  const { price } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  const getEventData = async () => {
    try {
      const response = await axios.get(`${apiUrl}activity/events/${eventId}/`);
      setEventData(response.data);
      console.log(eventData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 数据加载完成后或请求出错后设置 loading 为 false
    }
  };

  useEffect(() => {
    getEventData();
    getPrice(price);
    startTimer(1200);
  }, [eventId]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TimerDisplay />
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
        <Row justify={"space-between"}>
          <Col span={10}>
            <SeatsViewStyle>
              <SeatsChooseComponents
                event={eventData}
                handleClick={addToTicketCart}
                display={eventData.ticket_system_url ? "none" : "block"}
              />
            </SeatsViewStyle>
          </Col>
        </Row>
        <Col span={12} push={2}>
          <TicketCartDrawer choiceSeats={choiceSeats} onRemoveSeat={removeTicketFromCart} />
        </Col>
      </Row>
    </>
  );
}

export default ChooseSeats;
