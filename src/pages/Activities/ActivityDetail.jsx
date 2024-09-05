import { Col, Row, Space, Divider, Table, Button, Select, Checkbox } from "antd";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import TitleComponent from "../../components/TitleComponent";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SeatsImage from "../../components/SeatsImage";
import axios from "axios";
import DOMPurify from "dompurify"; //清理HTML
import styled from "styled-components";
import AddressModal from "./AddressModal";
import SeatsComponents from "../../components/Seats.jsx/MSSeatsComponent";

const DetailStyle = styled.div`
  .mapIcon {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`;

const selectOptions = Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: i + 1 }));

const TicketTable = ({ dataSource, handleTicketChange, resetTicketCounts }) => {
  const filteredDataSource = dataSource
    .filter((item, index, self) => index === self.findIndex((t) => t.price === item.price))
    .sort((a, b) => b.price - a.price);
  const getPrice = filteredDataSource.map((item) => {});
  const columns = [
    {
      title: "種類",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "價格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "說明",
      dataIndex: "help_words",
      key: "help_words",
    },
    {
      title: (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          票數
          <Button onClick={resetTicketCounts} type="link" danger>
            清除資料
          </Button>
        </div>
      ),
      dataIndex: "ticket_amount",
      key: "ticket_amount",
      render: (text, record) => (
        <Select
          defaultValue={0}
          style={{ width: 120 }}
          options={selectOptions}
          value={record.ticket_amount}
          onChange={(value) => handleTicketChange(record.name, value)}
          disabled={record.disabled}
        />
      ),
    },
    {
      title: "選位方式（目前暫不開放自行選位）",
      key: "action",
      render: (_, record) => (
        <Space size="large">
          <Link to={`choose_seats/${record.price}`}>
            <Button type="default" block style={{ background: "pink" }}>
              自行選位
            </Button>
          </Link>

          <Link>
            <Button type="default" block style={{ background: "orange" }} disabled>
              電腦配位
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={filteredDataSource}
      pagination={{ hideOnSinglePage: "true" }}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.description}
          </p>
        ),
        expandIcon: ({ record, onExpand }) =>
          record.description !== "" ? (
            <QuestionCircleTwoTone onClick={(e) => onExpand(record, e)} />
          ) : (
            <></>
          ),
      }}
    />
  );
};

function OpenAddressModal({ venue }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      <Button type="link" onClick={showLoading}>
        {"\u3000"}
        {"\u3000"}參考交通方式
      </Button>
      <AddressModal venue={venue} loading={loading} setOpen={setOpen} open={open} />
    </>
  );
}

const ProgramTable = ({ programData }) => {
  const columns = [
    {
      title: "",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "",
      dataIndex: "composer",
      key: "composer",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={programData}
      pagination={{ hideOnSinglePage: "true" }}
      size="small"
      showHeader={false}
      bordered={true}
      style={{ maxWidth: "300px" }}
    />
  );
};
function ActivityDetail() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);

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

  const handleTicketChange = (key, value) => {
    setDataSource((prevData) => {
      const newData = prevData.map((item) => {
        if (item.name === key) {
          return { ...item, ticket_amount: value };
        } else {
          return { ...item, ticket_amount: 0, disabled: value !== 0 };
        }
      });
      return newData;
    });
  };

  const resetTicketCounts = () => {
    setDataSource((prevData) =>
      prevData.map((item) => ({
        ...item,
        ticket_amount: 0,
        disabled: false,
      }))
    );
  };

  return (
    <DetailStyle>
      <Row style={{ textAlign: "center", justifyContent: "center" }}>
        <TitleComponent label={`| ${eventData.title} |`} />
      </Row>
      <br />
      <Row gutter={20}>
        <Col span={6}>
          <img
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            src={eventData.poster}
            alt=""
          />
        </Col>
        <Col span={18}>
          <h6>時間 | {eventData.date}</h6>
          <h6>地點 | {eventData.venue.name} </h6>
          <p>
            {"\u3000"}
            {"\u3000"} {"\u3000"}
            <Link to={eventData.venue.map_url} target="_blank" rel="noopener noreferrer">
              <img
                className="mapIcon"
                src="https://cdn2.iconfinder.com/data/icons/social-media-2259/512/google-512.png"
              />
              Google 地圖
            </Link>
            {"\u3000"}
            <OpenAddressModal venue={eventData.venue} />
          </p>
          <h6>
            票價 | {""}
            {[...new Set(eventData.zone.map((area) => area.price))]
              .sort((a, b) => a - b)
              .map((price, index, prices) => `${price}${index !== prices.length - 1 ? " / " : ""}`)}
          </h6>
          <h6 style={{ display: eventData.ticket_system_url ? "block" : "none" }}>
            {"\u3000"}
            {"\u3000"}
            <Link target="_blank" to={eventData.ticket_system_url}>
              <Button type="link">
                <strong>購票連結</strong>
              </Button>
            </Link>
          </h6>

          <Divider orientation="left" orientationMargin={0}>
            <strong>節目介紹</strong>
          </Divider>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eventData.description) }}></p>

          <Divider orientation="left" orientationMargin={0}>
            <strong>演出曲目</strong>
          </Divider>
          <Col>
            <ProgramTable programData={eventData.program} />
          </Col>
        </Col>
      </Row>
      <br />

      <Row style={{ display: eventData.ticket_system_url ? "none" : "block" }}>
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

        <SeatsComponents
          event={eventData}
          display={eventData.ticket_system_url ? "none" : "block"}
        />
      </Row>

      <Row justify={"center"} style={{ display: eventData.ticket_system_url ? "none" : "block" }}>
        <TicketTable
          dataSource={dataSource}
          handleTicketChange={handleTicketChange}
          resetTicketCounts={resetTicketCounts}
        />
        <Col style={{ marginTop: "48px" }}>
          <SeatsImage stageImage={eventData.official_seat_image} />
        </Col>
      </Row>
      <br />
    </DetailStyle>
  );
}
export default ActivityDetail;
