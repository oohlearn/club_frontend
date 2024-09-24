import React, { createContext, useContext, useState, useEffect } from "react";
import { useTicketCart } from "./TicketCartContext";

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children, initialDuration }) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const { removeTicketFromCart, clearTicketCart } = useTicketCart();

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const startTimer = (duration) => {
    setTimeLeft(duration);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTimeLeft(null);
  };

  const formatTime = (seconds) => {
    if (seconds === null) return "--:--";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <TimerContext.Provider value={{ timeLeft, isActive, startTimer, stopTimer, formatTime }}>
      {children}
    </TimerContext.Provider>
  );
};
