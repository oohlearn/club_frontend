import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState({ size_list: [] });
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const getProductDetail = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}shopping/products/${productId}/`);
      setProductData(response.data);
      updateSizeOptions(response.data.size_list);
    } catch (error) {
      console.error("獲取商品詳情時出錯:", error);
      message.error("獲取商品詳情失敗");
    } finally {
      setLoading(false);
    }
  };

  const updateSizeOptions = (sizeList) => {
    const options = sizeList.map((item) => ({
      label: `${item.size} ${item.description ? item.description : ""}`,
      value: item.id,
    }));
    setSizeOptions(options);
  };

  const addToCart = (product, quantity, sizeId) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.details.sizeId === sizeId
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].details.quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      const newItem = {
        id: product.id,
        name: product.title,
        price: product.on_discount ? product.discount_price : product.price,
        details: {
          quantity: quantity,
          sizeId: sizeId,
          size: product.size_list.find((size) => size.id === sizeId)?.size || "",
        },
      };
      setCartItems([...cartItems, newItem]);
    }
    message.success("成功加入購物車！");
  };

  const removeFromCart = (productId, quantity, sizeId) => {
    const updatedCartItems = cartItems.filter(
      (item) => !(item.id === productId && item.details.sizeId === sizeId)
    );
    setCartItems(updatedCartItems);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.details.quantity, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        productData,
        loading,
        cartItems,
        sizeOptions,
        getProductDetail,
        addToCart,
        removeFromCart,
        getTotalAmount,
        updateSizeOptions,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
