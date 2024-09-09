import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Col,
  ConfigProvider,
  Row,
  Select,
  message,
  Space,
  Flex,
  Divider,
  Button,
  Image,
} from "antd";
import styled from "styled-components";
import DOMPurify from "dompurify"; //清理HTML
import axios from "axios";
import AddToCartModal from "./AddToCartModal";
import { PopMessage } from "../../components/PopMessage";
import CartDrawer from "./CartDrawer.jsx";

const ListStyle = styled.div`
  .link {
    text-decoration: none;
    text-align: start;
  }

  .title {
    font-weight: 700;
  }
`;

const CartIconStyled = styled.div`
  .cart-icon {
    opacity: 0;
  }
  &:hover .cart-icon {
    height: 25px;
    opacity: 1;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    width: 25px;
    background: rgba(0, 0, 0, 0.5);
  }
`;

function OpenAddModal({ product }) {
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
  const handleClick = () => {
    setOpen(false);
    message.success("成功加入購物車！");
  };
  return (
    <CartIconStyled>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="cart-icon"
        onClick={(e) => {
          e.preventDefault();
          showLoading();
        }}
      >
        <svg
          fill="white"
          height="100"
          // viewBox="0 0 48 48"
          width="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h48v48H0zm36.62 12L31.1 22z" fill="none" />
          <path d="M22 18h4v-6h6V8h-6V2h-4v6h-6v4h6v6zm-8 18c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm20 0c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm-19.65-6.5c0-.09.02-.17.06-.24l1.8-3.26h14.9c1.5 0 2.81-.83 3.5-2.06l7.72-14.02L38.83 8h-.01l-2.21 4-5.51 10H17.07l-.26-.54L12.32 12l-1.9-4-1.89-4H2v4h4l7.2 15.17-2.71 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5z" />
        </svg>
      </div>
      <AddToCartModal
        handleClick={handleClick}
        product={product}
        loading={loading}
        setOpen={setOpen}
        open={open}
      />
    </CartIconStyled>
  );
}

const { Meta } = Card;
const selectOptions = Array.from({ length: 11 }, (_, i) => ({ value: i, label: i }));

function ProductComponent({ productsData }) {
  return (
    <ListStyle>
      <Row justify="space-between">
        {productsData.map((product) => (
          <Col key={product.id} span={12}>
            <ConfigProvider
              theme={{
                token: {
                  paddingLG: 10,
                  borderRadius: 0,
                },
              }}
            >
              <Card
                hoverable
                style={{
                  width: 150,
                  padding: 3,
                }}
                cover={
                  <div style={{ position: "relative" }}>
                    <Image
                      alt="example"
                      src={product.index_image}
                      preview={false}
                      style={{
                        width: 150,
                        height: 180,
                        objectFit: "contain",
                      }}
                    />
                    <OpenAddModal product={product} />
                  </div>
                }
              >
                <Link className="link" to={`/shop/${product.id}`}>
                  <Row>
                    <Col span={18}>
                      <Meta title={<h6 className="title">{product.title}</h6>} />
                      <Meta description={<h6>NT${product.price}</h6>} />
                    </Col>
                    <Col span={6}>詳情</Col>
                  </Row>
                </Link>
              </Card>
            </ConfigProvider>
          </Col>
        ))}
      </Row>
    </ListStyle>
  );
}

const CartStyle = styled.div`
  border: 1px solid black;
`;
function ShopComponent() {
  const [productsData, setProductsData] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${apiUrl}shopping/products/`);
      console.log(response.data);
      setProductsData(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = (itemToRemove, removeId) => {
    setCartItem(cartItem.filter((item) => item.id !== removeId));
  };

  useEffect(() => {
    getProductsData();
  }, []);
  return (
    <>
      <Row justify={"space-between"}>
        <Col span={10}>
          <ProductComponent productsData={productsData} />
        </Col>
      </Row>
      <Col span={12} push={2}>
        <Col span={12} push={2}>
          <CartDrawer cartItem={cartItem} />
        </Col>
      </Col>
    </>
  );
}
//
const ShoppingListComponent = () => (
  <Flex align="center" gap="middle" justify="center">
    <Col span={1}>
      <a href="#" style={{ textDecoration: "none" }}>
        X
      </a>
    </Col>
    <Col span={2}>
      <img src="/images/logo.jpg" alt="" width={"30px"} />
    </Col>
    <Col span={9} offset={1}>
      <Col>2023演出DVD</Col>
      <Col style={{ color: "gray", fontSize: "small" }}>NT$150</Col>
    </Col>
    <Col span={5}>
      <ConfigProvider
        theme={{
          components: {
            Select: { optionPadding: 5 },
          },
        }}
      >
        <Select size="small" defaultValue={0} options={selectOptions}></Select>
      </ConfigProvider>
    </Col>
    <Col span={6}>小計：300</Col>
  </Flex>
);

const ShoppingList = () => (
  <Space direction="vertical" size={16}>
    <Card
      title="我的購物車"
      extra={<a href="#">More</a>}
      style={{
        width: 360,
        background: "yellow",
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <ShoppingListComponent />
      ))}
      <br />
      <Row>
        <Col span={17}>
          <Col>宅配運費</Col>
          <Col style={{ color: "gray", fontSize: "small" }}>（周邊商品滿500元，免運費）</Col>
        </Col>
        <Col span={6} offset={1}>
          小計：70
        </Col>
      </Row>

      <Divider />
      <Row justify={"end"}>
        <Col>總金額： NT$ 300</Col>
      </Row>
    </Card>
  </Space>
);

export default ShopComponent;
