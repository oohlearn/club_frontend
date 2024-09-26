import React, { createContext, useState, useContext, useEffect } from "react";
import { message } from "antd";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const ProductCartContext = createContext();

// TODO 要選尺寸才能加入購物車
export function ProductCartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // 從 localStorage 讀取購物車資料
    const savedCart = localStorage.getItem("productCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [productCodeData, setProductCodeData] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [productDiscountTotal, setProductDiscountTotal] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [appliedDiscounts, setAppliedDiscounts] = useState({});

  const addToCart = async (product, quantity, sizeId) => {
    try {
      const response = await axios.post(
        `${apiUrl}shopping/products/${product.id}/sizes/${sizeId}/pre_sold/`,

        {
          quantity: quantity,
        }
      );

      if (response.data.status === "success") {
        setCartItems((prevItems) => {
          const existingItemIndex = prevItems.findIndex(
            (item) => item.id === product.id && item.details.sizeId === sizeId
          );

          if (existingItemIndex !== -1) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].details.quantity += quantity;
            return updatedItems;
          } else {
            const newItem = {
              ...product,
              details: {
                quantity: quantity,
                sizeId: sizeId,
              },
            };
            return [...prevItems, newItem];
          }
        });
        message.success("商品已加入購物車");
      } else {
        message.error(response.data.message || "加入購物車失敗，請稍後再試");
      }
    } catch (error) {
      console.error("加入購物車時發生錯誤:", error);
      message.error("加入購物車失敗，請稍後再試");
    }
  };

  const getSize = async (product, sizeId) => {
    try {
      const response = await axios.get(`${apiUrl}shopping/products/${product.id}/sizes/${sizeId}/`);
      const size = response.data.size;
      return size;
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId, quantity, sizeId) => {
    try {
      const itemToRemove = cartItems.find(
        (item) => item.id === productId && item.details.sizeId === sizeId
      );

      if (itemToRemove) {
        const response = await axios.post(
          `${apiUrl}shopping/products/${productId}/sizes/${sizeId}/release_pre_sold/`,
          {
            quantity: itemToRemove.details.quantity,
          }
        );

        if (response.data.status === "success") {
          setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.id === productId && item.details.sizeId === sizeId))
          );
          message.success("商品已從購物車移除");
        } else {
          message.error("移除商品失敗，請稍後再試");
        }
      }
    } catch (error) {
      console.error("從購物車移除商品時發生錯誤:", error);
      message.error("移除商品失敗，請稍後再試");
    }
  };

  const getTotalAmount = () => {
    if (!cartItems || cartItems.length === 0) {
      return 0; // 當 cartItem 為 undefined 或空陣列時，總金額設為 0
    }
    return cartItems.reduce((total, item) => {
      const price = item.on_discount ? item.discount_price : item.price;
      return total + price * item.details.quantity;
    }, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // 優惠碼
  const getInput = (input) => {
    setDiscountCode(input);
    setIsDiscountApplied(false); // 重置折扣應用狀態
  };

  const getProductCodeData = async () => {
    if (cartItems.length === 0) return;
    try {
      const response = await axios.get(`${apiUrl}shopping/productCode/`);
      setProductCodeData(response.data.productCode);
    } catch (error) {
      console.log(error);
    }
  };
  // 當購物車內容變化時，保存到 localStorage
  useEffect(() => {
    localStorage.setItem("productCart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductCodeData();
    console.log({ productCodeData });
  }, [cartItems]);

  const applyDiscountCode = () => {
    const totalAmount = getTotalAmount();
    const foundCode = productCodeData.find(
      (discount) =>
        discount.code === discountCode &&
        discount.is_valid &&
        new Date(discount.end_date) > new Date()
    );
    if (foundCode) {
      const discount = foundCode.discount;
      message.success(`已應用${foundCode.name}: ${foundCode.description}`);
      setProductDiscountTotal(totalAmount * discount);
      setIsDiscountApplied(true);
      setAppliedDiscounts(foundCode);
      setDiscountCode(""); // 清空輸入框
    } else {
      message.error("無效的優惠碼");
      setProductDiscountTotal(totalAmount);
      setIsDiscountApplied(false);
    }
  };

  const getProductDiscountTotal = () => {
    return isDiscountApplied ? productDiscountTotal : getTotalAmount();
  };
  const submitOrder = async (cartItems, ticketItems, customer, discountCodes) => {
    try {
      const orderData = {
        customer: customer,
        cartItems: cartItems.map((item) => ({
          product: item.id,
          size: item.details.size,
          quantity: item.details.size.quantity,
        })),
        ticketItems: ticketItems.map((item) => ({
          seat: item.row_num ? item.id : null,
          seat_v2: !item.row_num ? item.id : null,
        })),
        ticket_discount_code: discountCodes.ticketCode,
        product_code: discountCodes.productCode,
      };

      const response = await axios.post(`${apiUrl}shopping/order`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error submitting order:", error);
      throw error;
    }
  };
  return (
    <ProductCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalAmount,
        discountCode,
        productDiscountTotal,
        getProductDiscountTotal,
        getInput,
        applyDiscountCode,
        isDiscountApplied,
        appliedDiscounts,
        getSize,
      }}
    >
      {children}
    </ProductCartContext.Provider>
  );
}

export function useProductCart() {
  return useContext(ProductCartContext);
}
