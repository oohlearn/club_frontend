import React, { createContext, useContext, useState, useEffect } from "react";
import { useProductCart } from "./ProductCartContext";
import { useTicketCart } from "./TicketCartContext";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const {
    cartItems: productItems,
    getTotalAmount: getProductTotalAmount,
    getProductDiscountTotal,
    clearCart: clearProductCart,
  } = useProductCart();

  const {
    choiceSeats: ticketItems,
    getTicketTotalAmount,
    getTicketDiscountTotal,
    clearTicketCart,
  } = useTicketCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  const getTotalAmount = () => {
    return getProductTotalAmount() + getTicketTotalAmount();
  };

  const getDiscountTotal = () => {
    return getProductDiscountTotal() + getTicketDiscountTotal();
  };

  const clearCart = () => {
    clearProductCart();
    clearTicketCart();
  };

  const submitOrder = async (customer, discountCodes) => {
    setLoading(true);
    setError(null);
    try {
      const orderData = {
        customer: customer,
        cartItems: productItems.map((item) => ({
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

      const response = await axios.post(`${apiUrl}orders/`, orderData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        productItems,
        ticketItems,
        getTotalAmount,
        getDiscountTotal,
        clearCart,
        submitOrder,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
