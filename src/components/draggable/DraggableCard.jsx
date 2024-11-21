import React from "react";
import { useDrag } from "react-dnd";

const TABLES = "TABLES"; // The type of draggable items

function DraggableCard({ table }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: TABLES, // Item type
    item: { id: table.id, name: table.name, image: table.image }, // The data being dragged
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Get the dragging state
    }),
  });

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      {<table.image />}
      <p>{table.name}</p>
    </div>
  );
}

export default DraggableCard;
