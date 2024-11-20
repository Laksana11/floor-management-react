import React from "react";
import { useDrag } from "react-dnd";

const TableItem = ({ table }) => {
  const [, drag] = useDrag({
    type: "table",
    item: { id: table.id },
  });

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: table.x,
        top: table.y,
        width: 100,
        height: 100,
        borderRadius: table.type === "round" ? "50%" : "0",
        background: table.online ? "#4caf50" : "#f44336",
        textAlign: "center",
        lineHeight: "100px",
        cursor: "move",
        border: "1px solid #ddd",
      }}
    >
      {table.name}
    </div>
  );
};

export default TableItem;
