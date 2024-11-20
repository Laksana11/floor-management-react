import React from "react";
import ImageComponent from "./draggable/ImageComponent";

const Sidebar = ({ addTable }) => {
  return (
    <div style={{ width: "20%", padding: "1rem", background: "#f4f4f4" }}>
      <div>
        <h3>Table Options</h3>
        <ImageComponent
          type="round"
          onClick={() => addTable("round")}
          label="Round Table"
        />
        <ImageComponent
          type="square"
          onClick={() => addTable("square")}
          label="Square Table"
        />
      </div>

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
