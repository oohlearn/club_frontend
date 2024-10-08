import React, { createContext, useState, useContext, useEffect } from "react";
import { message } from "antd";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const TicketCartContext = createContext();

export function TicketCartProvider({ children }) {
  const [choiceSeats, setChoiceSeats] = useState(() => {
    // 從 localStorage 讀取票券資料
    const savedTickets = localStorage.getItem("ticketCart");
    return savedTickets ? JSON.parse(savedTickets) : [];
  });
  const [choicePrice, setChoicePrice] = useState();
  const [codeData, setCodeData] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountTotal, setDiscountTotal] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [appliedDiscounts, setAppliedDiscounts] = useState({});

  const getPrice = (price) => {
    setChoicePrice(parseInt(price));
  };

  const addToTicketCart = async (seat) => {
    if (seat.price === choicePrice) {
      const seatIndex = choiceSeats.findIndex(
        (existingSeat) => existingSeat.seat_num === seat.seat_num
      );
      if (seatIndex === -1) {
        try {
          // 呼叫 API 更新座位狀態為 'padding'
          await axios.patch(`${apiUrl}activity/${seat.event_id}/seats/${seat.id}/`, {
            status: "padding",
          });
          setChoiceSeats([...choiceSeats, seat]);
          message.success(`已將座位 ${seat.seat_num} 加入購物車`);
        } catch (error) {
          console.error("更新座位狀態失敗:", error);
          message.error("無法將座位加入購物車，請稍後再試");
        }
      } else {
        try {
          // 呼叫 API 更新座位狀態為 'on_sell'
          await axios.patch(`${apiUrl}activity/${seat.event_id}/seats/${seat.id}/`, {
            status: "on_sell",
          });

          const newChoiceSeats = [...choiceSeats];
          newChoiceSeats.splice(seatIndex, 1);
          setChoiceSeats(newChoiceSeats);
          message.success(`已將座位 ${seat.seat_num} 從購物車移除`);
        } catch (error) {
          console.error("更新座位狀態失敗:", error);
          message.error("無法將座位從購物車移除，請稍後再試");
        }
      }
    } else {
      message.warning("請選擇相對應的票區");
    }
  };

  const removeTicketFromCart = async (seatToRemove) => {
    try {
      // 呼叫 API 更新座位狀態為 'on_sell'
      await axios.patch(`${apiUrl}activity/${seatToRemove.event_id}/seats/${seatToRemove.id}/`, {
        status: "on_sell",
      });

      setChoiceSeats(choiceSeats.filter((seat) => seat.seat_num !== seatToRemove.seat_num));
      message.success(`已將座位 ${seatToRemove.seat_num} 從購物車移除`);
    } catch (error) {
      console.error("更新座位狀態失敗:", error);
      message.error("無法將座位從購物車移除，請稍後再試");
    }
  };

  const getTicketTotalAmount = () => {
    return choiceSeats.reduce((total, seat) => total + Number(seat.price), 0);
  };

  const clearTicketCart = () => {
    setChoiceSeats([]);
  };

  // 優惠碼
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
  // 當票券選擇變化時，保存到 localStorage
  useEffect(() => {
    localStorage.setItem("ticketCart", JSON.stringify(choiceSeats));
  }, [choiceSeats]);

  useEffect(() => {
    getTicketCodeData();
  }, [choiceSeats]);

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
