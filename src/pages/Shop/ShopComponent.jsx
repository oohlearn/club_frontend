import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, ConfigProvider, Row, Select, Space, Flex, Divider, Button } from "antd";
import styled from "styled-components";
import DOMPurify from "dompurify"; //清理HTML
import axios from "axios";
import AddToCartModal from "./AddToCartModal";

const ListStyle = styled.div`
  .link {
    text-decoration: none;
    text-align: start;
  }
  .cartIcon {
    height: 25px;
    width: 25px;
  }
  .title {
    font-weight: 700;
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
  return (
    <>
      <Button type="link" onClick={showLoading} style={{ borderRadius: "5px", margin: "5px" }}>
        <img src="images/cart.png" className="cartIcon" />
      </Button>
      <AddToCartModal product={product} loading={loading} setOpen={setOpen} open={open} />
    </>
  );
}

const { Meta } = Card;
const selectOptions = Array.from({ length: 11 }, (_, i) => ({ value: i, label: i }));

function ProductComponent() {
  const [productsData, setProductsData] = useState([]);
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
  useEffect(() => {
    getProductsData();
  }, []);
  return (
    <ListStyle>
      <Row justify="space-around">
        {productsData.map((product) => (
          <Link className="link" to={`/shop/${product.id}`}>
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
                    <img
                      alt="example"
                      src={product.index_image}
                      style={{
                        width: 150,
                        height: 180,
                        objectFit: "contain",
                      }}
                    />
                  }
                >
                  <Row>
                    <Col span={18}>
                      <Meta title={<h6 className="title">{product.title}</h6>} />
                      <Meta description={<h6>NT$${product.price}</h6>} />
                    </Col>
                    <Col span={6}>
                      <OpenAddModal product={product} />
                    </Col>
                  </Row>
                </Card>
              </ConfigProvider>
            </Col>
          </Link>
        ))}
      </Row>
    </ListStyle>
  );
}

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

function ShopComponent() {
  return (
    <>
      <Flex>
        <Col span={18}>
          <ProductComponent />
        </Col>
        {/* <Col span={10}>
          <ShoppingList />
          <Flex justify="end" gap="large">
            <Link to="/activities">
              <Button type="default">要購票嗎？</Button>
            </Link>
            <Link to="checkout">
              <Button type="primary">結帳囉！</Button>
            </Link>
          </Flex>
        </Col> */}
      </Flex>
    </>
  );
}
export default ShopComponent;
