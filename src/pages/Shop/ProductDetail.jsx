import DOMPurify from "dompurify"; //清理HTML
import TitleComponent from "../../components/TitleComponent";

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
import { useProductCart } from "../../context/ProductCartContext";
import { useProductContext } from "../../context/ProductContext";

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

const CartDrawer = ({ cartItems, removeFromCart, getTotalAmount, productId }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const productExists = cartItems.some((item) => item.id === productId);
      if (productExists) {
        setOpen(true);
      }
    }
    console.log({ cartItems });
  }, [cartItems]);

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
            width={400}
            height={200}
            onClose={onClose}
            open={open}
            placement="right"
            extra={
              <>
                <Link to="/activities">
                  <Button style={{ marginRight: "20px" }}>購票</Button>
                </Link>
                <Link to="checkout">
                  <Button type="primary">結帳</Button>
                </Link>
              </>
            }
          >
            <List
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item>
                  <div style={{ marginRight: "1px" }}>
                    <Button
                      onClick={() =>
                        removeFromCart(item.id, item.details.quantity, item.details.sizeId)
                      }
                      size="small"
                    >
                      X
                    </Button>
                  </div>
                  <span style={{ margin: "5px" }}>{item.name}</span>
                  <span>{item.details.quantity} 件</span>
                  <span style={{ margin: "0 20px" }}>
                    <span>尺寸：{item.details.size}</span>
                    <br />
                    <span>單價：NT$ {item.on_discount ? item.discount_price : item.price}</span>
                  </span>
                </List.Item>
              )}
            />
            <Divider />
            <h5>總金額：NT$ {getTotalAmount()} </h5>
            <p>商品總金額超過500元或購買任一活動票券，免運費100元</p>
            <Link to="/activities">
              <Button style={{ marginRight: "20px" }}>購票</Button>
            </Link>
            <Link to="shop/checkout">
              <Button type="primary">結帳</Button>
            </Link>
          </Drawer>
        </div>
      </>
    </ConfigProvider>
  );
};

const selectOptions = Array.from({ length: 11 }, (_, i) => ({ value: i, label: i }));

function ProductDetail() {
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState();
  const { productId } = useParams();
  const { addToCart, cartItems, removeFromCart, getTotalAmount } = useProductCart();
  const { productData, loading, getProductDetail, sizeOptions } = useProductContext();

  useEffect(() => {
    getProductDetail(productId);
  }, [productId]);

  useEffect(() => {
    if (productData?.size_list && productData.size_list.length < 2) {
      setSelectedSize(productData.size_list[0]?.id);
    }
  }, [productData]);

  if (loading || !productData) {
    return <div>Loading...</div>;
  }

  // 加入購物車
  const handleClick = () => {
    if (productData.size_list.length > 1 && !selectedSize) {
      message.warning("請選擇尺寸或顏色");
      return;
    } else {
      addToCart(productData, selectedQty, selectedSize);
    }
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
                display: productData?.state_tag === "新上市" ? "block" : "none",
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
            {productData && productData.size_list && productData.size_list.length > 0 && (
              <Row
                style={{
                  display: productData?.size_list?.length > 0 ? "block" : "none",
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
                    options={sizeOptions}
                    onChange={(value) => setSelectedSize(value)}
                  ></Select>
                </ConfigProvider>
              </Row>
            )}
            <br />
            <Row justify={"space-around"}>
              <Link to="/shop">
                <Button type="default">看更多商品</Button>
              </Link>
              <Button type="default" onClick={() => handleClick(productData)}>
                <image src="images/cart.png" className="cartIcon" />
                加入購物車
              </Button>
              <CartDrawer
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                getTotalAmount={getTotalAmount}
                productId={productId}
              />
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
      {Array.isArray(productData.photos) &&
        productData.photos.map((photo) => (
          <Row justify={"center"} key={photo.id}>
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
