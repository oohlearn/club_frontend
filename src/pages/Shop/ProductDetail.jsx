import DOMPurify from "dompurify"; //清理HTML
import TitleComponent from "../../components/TitleComponent";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Image, Row, Col, Button, Divider, Select, ConfigProvider } from "antd";
import styled from "styled-components";

// TODO Get 商品資訊
const DetailStyle = styled.div`
  .photo_image {
    height: auto;
    width: 360px;
    margin: 15px;
  }
  .photos {
    text-align: center;
  }

  .sizeOption {
    width: 200px;
  }
  .cartIcon {
    height: 25px;
    width: 25px;
  }
`;
const selectOptions = Array.from({ length: 11 }, (_, i) => ({ value: i, label: i }));

function ProductDetail() {
  const [productData, setProductData] = useState({});
  const [sizeOptions, setSizeOptions] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(`${apiUrl}shopping/products/${productId}/`);
      console.log(response.data);
      setProductData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 数据加载完成后或请求出错后设置 loading 为 false
    }
  };

  useEffect(() => {
    if (productData?.size_list) {
      const options = productData.size_list.map((item) => ({
        label: `${item.size} ${item.description}`,
        value: item.size,
      }));
      setSizeOptions(options);
    }
  }, [productData]);

  useEffect(() => {
    getProductDetail();
  }, [productId]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <DetailStyle>
      <Row style={{ textAlign: "center", justifyContent: "center" }}>
        <TitleComponent label={"| 商品資訊 |"} />
      </Row>

      <Row>
        <Col span={11}>
          <Image src={productData.index_image} preview={false} />
        </Col>
        <Col span={11} push={2}>
          <Col>
            <h3
              style={{
                display: productData.state_tag === "新上市" ? "block" : "none",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              {productData.state_tag}！
            </h3>
            <h3>{productData.title}</h3>
            <h5>售價：NT$ {productData.price} / 個</h5>
            <h5
              style={{
                display: productData.on_discount ? "block" : "none",
                color: "red",
                fontWeight: "bolder",
              }}
            >
              特價！！ NT$ {productData.discount_price} / 個
            </h5>
            <br />
            <Row>
              <h6>數量：</h6>
              <ConfigProvider
                theme={{
                  components: {
                    Select: { optionPadding: 5 },
                  },
                }}
              >
                <Select size="small" defaultValue={1} options={selectOptions}>
                  購買數量
                </Select>
              </ConfigProvider>
            </Row>
            <br />
            <Row
              style={{
                display: productData.size_list ? "block" : "none",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              尺寸：（不同尺寸或顏色，請分別加入購物車）
              <ConfigProvider
                theme={{
                  components: {
                    Select: { optionPadding: "15" },
                  },
                }}
              >
                <Select className="sizeOption" size="small" options={sizeOptions}></Select>
              </ConfigProvider>
            </Row>
            <br />
            <Row justify={"space-around"}>
              <Link to="/shop">
                <Button type="default">看更多商品</Button>
              </Link>
              <Button type="default">
                <img src="images/cart.png" className="cartIcon" />
                加入購物車
              </Button>
            </Row>
          </Col>
        </Col>
      </Row>
      <Row>
        <br />
        <Divider>商品描述</Divider>
        <h6 style={{ display: productData.category === "cloth" ? "block" : "none" }}>
          部分商品附有尺寸試穿報告，敬請參考。
        </h6>
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productData.description) }}></p>
      </Row>

      {productData.photos.map((photo) => (
        <Row justify={"center"}>
          <Col span={24}>
            <h6 style={{ marginTop: "20px" }}>{photo.description}</h6>
          </Col>
          <Col span={24} className="photos">
            <Image
              className="photo_image"
              style={{ textAlign: "center" }}
              src={photo.image_data}
              preview={false}
            />
          </Col>
        </Row>
      ))}
    </DetailStyle>
  );
}

export default ProductDetail;
