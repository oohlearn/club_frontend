import React from "react";
import { useTimer } from "./TimerContext";

const TimerDisplay = () => {
  const { timeLeft, formatTime } = useTimer();

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
        backgroundColor: "white",
        padding: "10px",
        border: "1px solid black",
      }}
    >
      <p>剩餘時間: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default TimerDisplay;
