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
const SearchBar = ({ onSearch }) => {
  return (
    <StyleSearch>
      <Search placeholder="商品名稱、關鍵字" onSearch={onSearch} enterButton />
    </StyleSearch>
  );
};

const CategorySearchBar = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // 獲取所有類別
    axios
      .get(`${apiUrl}shopping/products/categories/`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value); // 通知父組件類別已更改
  };

  return (
    <Space wrap>
      <Select
        style={{
          width: 180,
        }}
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={categories.map((category) => ({
          label: category,
          value: category,
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getProductsData = async (page, size, term = "", category = "") => {
    try {
      let url = `${apiUrl}shopping/products/?page=${page}&page_size=${size}`;
      if (term) {
        url += `&search=${encodeURIComponent(term)}`;
      }
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }
      const response = await axios.get(url);
      console.log({ url });
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

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 重置頁碼
  };
  useEffect(() => {
    getProductsData(currentPage, pageSize, searchTerm, selectedCategory);
  }, [currentPage, pageSize, searchTerm, selectedCategory]);

  return (
    <>
      <TitleComponent label="周邊商品" />
      <Row gutter={20} justify={"center"}>
        <CategorySearchBar onCategoryChange={handleCategoryChange} />
      </Row>
      <br />
      <Row justify={"center"}>
        <SearchBar onSearch={handleSearch} />
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
