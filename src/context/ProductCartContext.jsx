import React, { createContext, useState, useContext, useEffect } from "react";
import { message } from "antd";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const CartContext = createContext();

// TODO 要選尺寸才能加入購物車
// TODO 同品項會重複出現
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

  const addToCart = (product, quantity, size) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.details.size === size
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].details.qty += quantity;
        return updatedItems;
      } else {
        // If it's a new item, add it to the cart
        const newItem = {
          ...product,
          details: {
            qty: quantity,
            size: size || "單一尺寸",
          },
        };
        if (newItem.details.size === "單一尺寸" && product.size_list.length > 0) {
          message.warning("請選擇尺寸或顏色");
        }
        return [...prevItems, newItem];
      }
    });
    console.log(cartItems);
  };

  const removeFromCart = (productId, size, index) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.index === index && item.id === productId && item.details.size === size)
      )
    );
  };

  const getTotalAmount = () => {
    if (!cartItems || cartItems.length === 0) {
      return 0; // 當 cartItem 為 undefined 或空陣列時，總金額設為 0
    }
    return cartItems.reduce((total, item) => {
      const price = item.on_discount ? item.discount_price : item.price;
      return total + price * item.details.qty;
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
          quantity: item.details.qty,
        })),
        ticketItems: ticketItems.map((item) => ({
          seat: item.row_num ? item.id : null,
          seat_v2: !item.row_num ? item.id : null,
        })),
        ticket_discount_code: discountCodes.ticketCode,
        product_code: discountCodes.productCode,
      };

      const response = await axios.post("http://your-backend-api-url/api/orders/", orderData);
      return response.data;
    } catch (error) {
      console.error("Error submitting order:", error);
      throw error;
    }
  };
  return (
    <CartContext.Provider
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useProductCart() {
  return useContext(CartContext);
}
