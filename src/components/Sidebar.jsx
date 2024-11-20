import React from "react";
import ImageComponent from "./draggable/ImageComponent";

const Sidebar = ({ addTable }) => {
  return (
    <div style={{ width: "20%", padding: "1rem", background: "#f4f4f4" }}>
      <h3>Table Options</h3>
      <ImageComponent
        src="path/to/round-table-image.png"
        alt="Round Table"
        onClick={() => addTable("round")}
      />
      <ImageComponent
        src="path/to/square-table-image.png"
        alt="Square Table"
        onClick={() => addTable("square")}
      />

      <hr />
      <h3>Table Details</h3>
      <div>
        <label>Table Name</label>
        <input type="text" placeholder="Table Name" disabled />
        <label>Min Covers</label>
        <input type="number" min="1" />
        <label>Max Covers</label>
        <input type="number" min="1" />
        <label>Online Status</label>
        <input type="checkbox" />
      </div>
    </div>
  );
};

const buttonStyle = {
  display: "block",
  marginBottom: "1rem",
  padding: "0.5rem 1rem",
  background: "#6200ea",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Sidebar;
