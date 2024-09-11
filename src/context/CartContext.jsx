// src/contexts/CartContext.js
import React, { createContext, useState, useContext } from "react";
import { message } from "antd";

const CartContext = createContext();

// TODO 要選尺寸才能加入購物車
// TODO 同品項會重複出現
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

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

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
