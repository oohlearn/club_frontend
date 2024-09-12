import React, { createContext, useState, useContext, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const TicketCartContext = createContext();

export function TicketCartProvider({ children }) {
  const [choiceSeats, setChoiceSeats] = useState([]);
  const [choicePrice, setChoicePrice] = useState();
  const [codeData, setCodeData] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountTotal, setDiscountTotal] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [appliedDiscounts, setAppliedDiscounts] = useState({});

  const getInput = (input) => {
    setDiscountCode(input);
    setIsDiscountApplied(false); // 重置折扣應用狀態
  };

  const getTicketCodeData = async () => {
    if (choiceSeats.length === 0) return;
    try {
      const response = await axios.get(`${apiUrl}activity/events/${choiceSeats[0].event_id}/`);
      setCodeData(response.data.ticket_discount_code);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTicketCodeData();
  }, [choiceSeats]);

  const getPrice = (price) => {
    setChoicePrice(parseInt(price));
  };

  const addToTicketCart = (seat) => {
    if (seat.price === choicePrice) {
      const seatIndex = choiceSeats.findIndex(
        (existingSeat) => existingSeat.seat_num === seat.seat_num
      );
      if (seatIndex === -1) {
        setChoiceSeats([...choiceSeats, seat]);
      } else {
        const newChoiceSeats = [...choiceSeats];
        newChoiceSeats.splice(seatIndex, 1);
        setChoiceSeats(newChoiceSeats);
      }
    } else {
      message.warning("請選擇相對應的票區");
    }
  };

  const removeTicketFromCart = (seatToRemove) => {
    setChoiceSeats(choiceSeats.filter((seat) => seat.seat_num !== seatToRemove.seat_num));
  };

  const getTicketTotalAmount = () => {
    return choiceSeats.reduce((total, seat) => total + Number(seat.price), 0);
  };

  const clearTicketCart = () => {
    setChoiceSeats([]);
  };

  const applyDiscountCode = () => {
    const totalAmount = getTicketTotalAmount();
    const foundCode = codeData.find(
      (discount) => discount.code === discountCode && discount.is_valid
    );
    if (foundCode) {
      const discount = foundCode.discount;
      message.success(`已應用${foundCode.name}: ${foundCode.description}`);
      setDiscountTotal(totalAmount * discount);
      setIsDiscountApplied(true);
      setAppliedDiscounts(foundCode);
      setDiscountCode(""); // 清空輸入框
    } else {
      message.error("無效的優惠碼");
      setDiscountTotal(totalAmount);
      setIsDiscountApplied(false);
    }
  };

  const getTicketDiscountTotal = () => {
    return isDiscountApplied ? discountTotal : getTicketTotalAmount();
  };

  return (
    <TicketCartContext.Provider
      value={{
        choiceSeats,
        addToTicketCart,
        removeTicketFromCart,
        clearTicketCart,
        getTicketTotalAmount,
        getPrice,
        discountCode,
        discountTotal,
        getTicketDiscountTotal,
        getInput,
        applyDiscountCode,
        isDiscountApplied,
        appliedDiscounts,
      }}
    >
      {children}
    </TicketCartContext.Provider>
  );
}

export function useTicketCart() {
  return useContext(TicketCartContext);
}
