import React from "react";
import { useState, useEffect } from "react";

const Bird = ({ birdPosition, setBirdPosition, isGameOver }) => {
  useEffect(() => {
    if (!isGameOver) {
      const gravity = () => {
        setBirdPosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + 3, // Fall durch Schwerkraft
        }));
      };

      const interval = setInterval(gravity, 100); // Aktualisierungsintervall

      return () => clearInterval(interval);
    }
  }, [isGameOver]);

  return (
    <div
      className={`  `}
      style={{
        position: "absolute",
        left: `${birdPosition.x}px`,
        top: `${birdPosition.y}px`,
      }}
    >
      <img src="/slappy.png" className="object-fill w-5 h-5" />
    </div>
  );
};

export default Bird;
