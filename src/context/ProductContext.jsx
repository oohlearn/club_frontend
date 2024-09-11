import React, { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    setCartItem((prevItems) => [...prevItems, product]);
  };

  return (
    <ProductsContext.Provider value={{ cartItem, addToCart }}>{children}</ProductsContext.Provider>
  );
};
