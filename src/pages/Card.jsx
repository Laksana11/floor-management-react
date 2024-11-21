import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { useDrag } from "react-dnd";

export const Card = ({
  id,
  name,
  image,
  key,
  height,
  width,
  isResizable = false,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "table",
    item: { id, name, image, key },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return isResizable ? (
    <ResizableBox
      width={width || 150}
      height={height || 150}
      minConstraints={[100, 100]}
      maxConstraints={[300, 300]}
      axis="both"
      resizeHandles={["se"]}
      onResizeStop={(e, data) => {
        const { width: w, height: h } = data.size;
      }}
    >
      <div
        className={`p-2 w-full h-full border rounded-lg shadow-md cursor-pointer transition-transform transform flex justify-center items-center ${
          isDragging ? "bg-yellow-200 scale-105" : "bg-white"
        }`}
        ref={dragRef}
        key={key}
        style={{
          display: "inline-block",
          textAlign: "center",
        }}
      >
        <div className="mt-2 flex justify-center items-center">{image}</div>
      </div>
    </ResizableBox>
  ) : (
    <div
      className={`p-2 w-32 h-32 border rounded-lg shadow-md cursor-pointer transition-transform transformflex justify-center items-center ${
        isDragging ? "bg-yellow-200 scale-105" : "bg-white"
      }`}
      ref={dragRef}
      key={key}
      style={{
        display: "inline-block",
        textAlign: "center",
      }}
    >
      <div className="mt-2 flex justify-center items-center">{image}</div>
    </div>
  );
};
