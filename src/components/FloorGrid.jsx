import React from "react";
import { useDrop } from "react-dnd";
import TableItem from "./TableItem";

const FloorGrid = ({ tables, updateTablePosition, updateTableDetails }) => {
  const [, drop] = useDrop({
    accept: "table",
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset) {
        updateTablePosition(item.id, offset.x, offset.y);
      }
    },
  });

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        position: "relative",
        border: "1px dashed #ddd",
        background: "#fff",
      }}
    >
      {tables.map((table) => (
        <TableItem
          key={table.id}
          table={table}
          updateTableDetails={updateTableDetails}
        />
      ))}
    </div>
  );
};

export default FloorGrid;
