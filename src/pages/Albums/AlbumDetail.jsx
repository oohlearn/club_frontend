import { Image, Row } from "antd";
import TitleComponent from "../../components/TitleComponent";
import { albumsData } from "../../textFile";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Album = () => (
  <Image.PreviewGroup
    items={[
      "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    ]}
  >
    <Image
      width={200}
      src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
    />
  </Image.PreviewGroup>
);

function AlbumDetail() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const albumIndex = pathSnippets[1] - 1;
  const albumData = albumsData[albumIndex];
  const [dataSource, setDataSource] = useState(albumData.images);
  return (
    <>
      <Row style={{ textAlign: "center", justifyContent: "center" }}>
        <TitleComponent label={`| ${albumData.title} |`} />
      </Row>
      <Album />
    </>
  );
}
export default AlbumDetail;
