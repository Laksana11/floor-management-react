import React, { useState } from "react";
import Sidebar from "./Sidebar";
import FloorGrid from "./FloorGrid";

const TableManager = () => {
  const [tables, setTables] = useState([]);

  const addTable = (type) => {
    const id = Date.now();
    const newTable = {
      id,
      name: `T-${id.toString().slice(-2)}`,
      x: 0,
      y: 0,
      type, // 'round' or 'square'
      minCovers: 1,
      maxCovers: 4,
      online: true,
    };
    setTables([...tables, newTable]);
  };

  const handleUpdateTablePosition = (id, x, y) => {
    setTables((prev) =>
      prev.map((table) => (table.id === id ? { ...table, x, y } : table))
    );
  };

  const updateTableDetails = (id, details) => {
    setTables((prev) =>
      prev.map((table) => (table.id === id ? { ...table, ...details } : table))
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar addTable={addTable} />
      <FloorGrid
        tables={tables}
        updateTablePosition={handleUpdateTablePosition}
        updateTableDetails={updateTableDetails}
      />
    </div>
  );
};

export default TableManager;
