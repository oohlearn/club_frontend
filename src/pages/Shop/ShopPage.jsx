import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";
import PaginationComponent from "../../components/Pagenation";
import React, { useState, useEffect, useContext } from "react";
import { Input, Space, Button, Col, Row, Select, message } from "antd";
import CartDrawer from "./CartDrawer";
import axios from "axios";
import ProductComponent from "./ProductComponent";
import { useProductCart } from "../../context/ProductCartContext";

const apiUrl = process.env.REACT_APP_API_URL;

const StyleSearch = styled.div`
  display: flex;
  justify-content: center;
  width: 360px;
`;

const SearchContainer = styled.div`
  justify-content: center;
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
`;

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const SearchBar = () => {
  return (
    <StyleSearch>
      <Search placeholder="商品名稱、關鍵字" onSearch={onSearch} enterButton />
    </StyleSearch>
  );
};

const productsData = {
  "服裝、配件": ["紀念T", "棒球帽", "運動襪"],
  文具: ["譜夾", "卡套"],
  歷年演出相關: ["DVD", "CD", "節目單"],
  其他: ["保溫杯", "馬克杯", "帆布包"],
};
const categoryData = ["服裝、配件", "文具", "歷年演出相關", "其他"];
const CategorySearchBar = () => {
  const [category, setCategory] = useState(productsData[categoryData[0]]);
  const [product, setProduct] = useState(productsData[categoryData[0]][0]);
  const handleProvinceChange = (value) => {
    setCategory(productsData[value]);
    setProduct(productsData[value][0]);
  };
  const onSecondCityChange = (value) => {
    setProduct(value);
  };
  return (
    <Space wrap>
      <Select
        defaultValue={categoryData[0]}
        style={{
          width: 180,
        }}
        onChange={handleProvinceChange}
        options={categoryData.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      <Select
        style={{
          width: 180,
        }}
        value={product}
        onChange={onSecondCityChange}
        options={category.map((city) => ({
          label: city,
          value: city,
        }))}
      />
    </Space>
  );
};

// TODO整理商品頁面
function Shop() {
  const [productsData, setProductsData] = useState([]);
  const { cartItems, removeFromCart } = useProductCart();
  const [pageSize, setPageSize] = useState(6); // 每頁顯示數量
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getProductsData = async (page, size) => {
    try {
      const response = await axios.get(
        `${apiUrl}shopping/products/?page=${page}&page_size=${size}`
      );
      console.log(response.data);
      setProductsData(response.data.products);
      setTotalItems(response.data.total); // 假設 API 返回總項目
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 数据加载完成后或请求出错后设置 loading 为 false
    }
  };
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };
  useEffect(() => {
    getProductsData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <>
      <TitleComponent label="周邊商品" />
      <Row gutter={20} justify={"center"}>
        <CategorySearchBar />
      </Row>
      <br />
      <Row justify={"center"}>
        <SearchBar />
      </Row>
      <br />

      <Row>
        <Col span={12}>
          <ProductComponent productsData={productsData} />
        </Col>

        <Col span={10} push={1}>
          <CartDrawer cartItems={cartItems} removeFromCart={removeFromCart} />
        </Col>
      </Row>
      <PaginationComponent
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
      />
    </>
  );
}

export default Shop;
