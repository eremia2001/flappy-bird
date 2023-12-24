import React from "react";

const Pipe = ({ top, height, left }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${left}px`, // Verwende die left-Position
        top: top ? 0 : "auto",
        bottom: top ? "auto" : 0,
        width: "40px",
        height: `${height}px`,
        backgroundColor: "green",
      }}
    />
  );
};

export default Pipe;
