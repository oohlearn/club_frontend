import { Col, Divider, Row, Table, List, Menu, Space } from "antd";
import { experiencesData } from "../../textFile";

const ExperiencesTable = () => {
  const columns = [
    {
      title: "時間",
      dataIndex: "date",
      key: "date",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "近年重要演出或比賽經歷",
      dataIndex: "experience",
      key: "experience",
    },
  ];
  return (
    <Table
      columns={columns}
      pagination={{ hideOnSinglePage: "true" }}
      dataSource={experiencesData}
    />
  );
};
function ExperiencesPage() {
  return <ExperiencesTable />;
}
export default ExperiencesPage;
