import React, { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useProductCart } from "./ProductCartContext";
const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems, removeFromCart, getTotalAmount } = useProductCart();
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const { productId } = useParams();

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

  const handleClick = () => {
    addToCart(productData, selectedQty, selectedSize);

    message.success("成功加入購物車");
  };

  return (
    <ProductsContext.Provider
      value={{
        getProductDetail,
        cartItems,
        addToCart,
        productData,
        sizeOptions,
        loading,
        selectedQty,
        selectedSize,
        handleClick,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export function useProduct() {
  return useContext(ProductsContext);
}
