import DOMPurify from "dompurify"; //清理HTML
import TitleComponent from "../../components/TitleComponent";

import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Image,
  Row,
  Col,
  Drawer,
  List,
  Button,
  Divider,
  Select,
  ConfigProvider,
  message,
} from "antd";
import styled from "styled-components";
import { useCart } from "../../context/CartContext";

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

const CartDrawer = ({ cartItems, removeFromCart }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (cartItems) {
      if (cartItems.length > 0) {
        setOpen(true);
      }
    }
    console.log({ cartItems });
  }, [cartItems]);

  const getTotalAmount = () => {
    if (!cartItems || cartItems.length === 0) {
      return 0; // 當 cartItem 為 undefined 或空陣列時，總金額設為 0
    }
    return cartItems.reduce((total, item) => {
      const price = item.on_discount ? item.discount_price : item.price;
      return total + price * item.details.qty;
    }, 0);
  };

  const containerStyle = {
    position: "relative",
    height: 500,
    overflow: "hidden",
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          List: {
            itemPadding: "px 0",
            itemPaddingLG: "5px 12px",
          },
        },
      }}
    >
      <>
        <Button type="primary" onClick={showDrawer}>
          購物清單
        </Button>
        <div style={containerStyle}>
          <Drawer
            title="購物車"
            width={"100%"}
            height={200}
            onClose={onClose}
            open={open}
            placement="top"
            extra={
              <>
                <Link to="/activities">
                  <Button style={{ marginRight: "20px" }}>購票</Button>
                </Link>
                <Button type="primary">結帳</Button>
              </>
            }
          >
            <Row>
              <Col span={12}>
                <List
                  dataSource={cartItems}
                  renderItem={(item) => (
                    <List.Item>
                      <div>
                        <Button
                          onClick={() => removeFromCart(item.id, item.details.size, item.index)}
                          size="small"
                        >
                          X
                        </Button>
                      </div>
                      <span>{item.name}</span>
                      <span>{item.details.qty}件</span>
                      <span>
                        <span>尺寸：{item.details.size || "單一尺寸"}</span>
                        <br />
                        <span>單價：NT$ {item.on_discount ? item.discount_price : item.price}</span>
                      </span>
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={10} push={2}>
                <Divider />
                <h5>總金額：NT$ {getTotalAmount()} </h5>
                <p>商品及票券總金額超過500元，免運費100元</p>
              </Col>
            </Row>
          </Drawer>
        </div>
      </>
    </ConfigProvider>
  );
};

const selectOptions = Array.from({ length: 11 }, (_, i) => ({ value: i, label: i }));

function ProductDetail() {
  const [productData, setProductData] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const { productId } = useParams();
  const { addToCart, cartItems, removeFromCart } = useCart();

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
    if (productData.size_list) {
      const options = productData.size_list.map((item) => ({
        label: `${item.size} ${item.description ? item.description : ""}`,
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
  // 加入購物車
  //TODO 检查购物车中是否已经存在相同的商品（通过产品ID和尺寸判断）

  const handleClick = () => {
    addToCart(productData, selectedQty, selectedSize);

    message.success("成功加入購物車");
  };
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
                <Select
                  size="small"
                  defaultValue={1}
                  options={selectOptions}
                  onChange={(value) => setSelectedQty(value)}
                >
                  購買數量
                </Select>
              </ConfigProvider>
            </Row>
            <br />
            <Row
              style={{
                display: productData.size_list.length > 0 ? "block" : "none",
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
                <Select
                  className="sizeOption"
                  size="small"
                  options={sizeOptions ? sizeOptions : "單一尺寸"}
                  onChange={(value) => setSelectedSize(value)}
                ></Select>
              </ConfigProvider>
            </Row>
            <br />
            <Row justify={"space-around"}>
              <Link to="/shop">
                <Button type="default">看更多商品</Button>
              </Link>
              <Button type="default" onClick={() => handleClick(productData)}>
                <image src="images/cart.png" className="cartIcon" />
                加入購物車
              </Button>
              <CartDrawer cartItems={cartItems} removeFromCart={removeFromCart} />
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
