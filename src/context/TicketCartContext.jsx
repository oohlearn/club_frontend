// src/contexts/CartContext.js
import React, { createContext, useState, useContext } from "react";
import { message } from "antd";

const TicketCartContext = createContext();

// TODO 要選尺寸才能加入購物車
// TODO 同品項會重複出現
export function TicketCartProvider({ children }) {
  const [choiceSeats, setChoiceSeats] = useState([]);

  const removeTicketFromCart = (seatToRemove) => {
    setChoiceSeats(choiceSeats.filter((seat) => seat.seat_num !== seatToRemove.seat_num));
  };

  const getTicketTotalAmount = () => {
    if (!choiceSeats || choiceSeats.length === 0) {
      return 0; // 當 cartItem 為 undefined 或空陣列時，總金額設為 0
    }
    return choiceSeats.reduce((total, item) => {
      const price = item.on_discount ? item.discount_price : item.price;
      return total + price * item.details.qty;
    }, 0);
  };

  const clearTicketCart = () => {
    setChoiceSeats([]);
  };

  return (
    <TicketCartContext.Provider
      value={{ choiceSeats, removeTicketFromCart, clearTicketCart, getTicketTotalAmount }}
    >
      {children}
    </TicketCartContext.Provider>
  );
}

export function useTicketCart() {
  return useContext(TicketCartContext);
}
