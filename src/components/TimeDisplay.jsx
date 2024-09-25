import React from "react";
import { useTimer } from "../context/TimerContext";

const TimerDisplay = () => {
  const { timeLeft, formatTime } = useTimer();

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        backgroundColor: "white",
        padding: "10px",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      <p>剩餘時間: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default TimerDisplay;
