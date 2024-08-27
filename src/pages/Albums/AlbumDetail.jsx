import { Image, Row } from "antd";
import TitleComponent from "../../components/TitleComponent";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const AlbumStyle = styled.div`
  .photo {
    padding: 10px;
  }
`;

function AlbumDetail() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [albumDetail, setAlbumDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const { albumId } = useParams();
  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${apiUrl}information/albums/${albumId}/`);
      console.log(response.data);
      setAlbumDetail(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 数据加载完成后或请求出错后设置 loading 为 false
    }
  };
  useEffect(() => {
    getAlbumsData();
  }, [albumId]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AlbumStyle>
      <Row style={{ textAlign: "center", justifyContent: "center" }}>
        <TitleComponent label={`| ${albumDetail.title} |`} />
      </Row>
      {albumDetail.photos &&
        albumDetail.photos.map((photo) => (
          <Image className="photo" preview={false} width={200} src={photo.image} />
        ))}
    </AlbumStyle>
  );
}
export default AlbumDetail;
