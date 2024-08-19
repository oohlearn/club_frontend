import { Col, Row, Space, Divider, Table, Button, Select, Checkbox } from "antd";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import TitleComponent from "../../components/TitleComponent";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import SeatsImage from "../../components/SeatsImage";
import axios from "axios";

const selectOptions = Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: i + 1 }));

const TicketTable = ({ dataSource, handleTicketChange, resetTicketCounts }) => {
  const columns = [
    {
      title: "種類",
      dataIndex: "category",
      key: "category",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "價格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "優惠說明",
      dataIndex: "discount",
      key: "discount",
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
          onChange={(value) => handleTicketChange(record.key, value)}
          disabled={record.disabled}
        />
      ),
    },
    {
      title: "選位方式（目前暫不開放自行選位）",
      key: "action",
      render: (_, record) => (
        <Space size="large">
          <Button type="default" block style={{ background: "pink" }} disabled>
            自行選位
          </Button>
          <Link to="choose_seats">
            <Button type="default" block style={{ background: "orange" }}>
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
      dataSource={dataSource}
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
function ActivityTicket() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const activityId = pathSnippets[1];
  const [activityData, setActivityData] = useState({});
  const [dataSource, setDataSource] = useState(activityData.ticket);
  const [newOrder, setNewOrder] = useState({
    name: "",
    phone: "",
    email: "",
    ticket: {},
    product: [],
  });
  const [orderList, setOrderList] = useState([]);

  const getActivityData = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/activities/${activityId}/`);
    console.log(response);
    setActivityData(response.data);
  };

  useEffect(() => {
    getActivityData();
  }, []);

  const handleTicketChange = (key, value) => {
    setDataSource((prevData) => {
      const newData = prevData.map((item) => {
        if (item.key === key) {
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
    <>
      <Row style={{ textAlign: "center", justifyContent: "center" }}>
        <TitleComponent label={`| ${activityData.title} |`} />
      </Row>
      <br />
      <Row gutter={20}>
        <Col span={6}>
          <img
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            src={activityData.poster}
            alt=""
          />
        </Col>
        <Col span={18}>
          <h6>時間 | {activityData.date}</h6>
          <h6>地點 | {activityData.place}</h6>
          <h6>票價 | {activityData.price}</h6>
          <Divider orientation="left" orientationMargin={0}>
            <strong>節目介紹</strong>
          </Divider>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae unde sed voluptatibus
            corporis eveniet, dolore possimus. Itaque autem nostrum eligendi laudantium nemo
            perspiciatis nam dolorem, earum eaque tempora modi reiciendis?
          </p>
          <Divider orientation="left" orientationMargin={0}>
            <strong>演出曲目</strong>
          </Divider>
          <Col>
            <ProgramTable programData={activityData.program} />
          </Col>
        </Col>
      </Row>
      <Divider orientation="left" orientationMargin={0}>
        <h5 style={{ fontWeight: "bold" }}>購票說明</h5>
      </Divider>
      <Row>
        <br />
        <ol>
          <li>
            請先選擇欲購票價的<strong>『張數』</strong>，再點選<strong>『選位方式』</strong>
            ，即可進入訂購確認頁面。
          </li>
          <li>單次購票僅能選擇單一票種，若須購買不同票種，請再次下單購買。</li>
        </ol>
      </Row>

      <Row justify={"center"}>
        <TicketTable
          dataSource={activityData.ticket}
          handleTicketChange={handleTicketChange}
          resetTicketCounts={resetTicketCounts}
        />
        <Col style={{ marginTop: "48px" }}>
          <SeatsImage stageImage={activityData.stageImage} />
        </Col>
      </Row>
      <br />
    </>
  );
}
export default ActivityTicket;
