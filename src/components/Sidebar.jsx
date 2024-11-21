// import React from "react";
// import ImageComponent from "./draggable/ImageComponent";

// const Sidebar = ({ addTable }) => {
//   return (
//     <div style={{ width: "20%", padding: "1rem", background: "#f4f4f4" }}>
//       <div>
//         <h3>Table Options</h3>
//         <ImageComponent
//           type="round"
//           onClick={() => addTable("round")}
//           label="Round Table"
//         />
//         <ImageComponent
//           type="square"
//           onClick={() => addTable("square")}
//           label="Square Table"
//         />
//       </div>

//       <hr />
//       <h3>Table Details</h3>
//       <div>
//         <label>Table Name</label>
//         <input type="text" placeholder="Table Name" disabled />
//         <label>Min Covers</label>
//         <input type="number" min="1" />
//         <label>Max Covers</label>
//         <input type="number" min="1" />
//         <label>Online Status</label>
//         <input type="checkbox" />
//       </div>
//     </div>
//   );
// };

// const buttonStyle = {
//   display: "block",
//   marginBottom: "1rem",
//   padding: "0.5rem 1rem",
//   background: "#6200ea",
//   color: "#fff",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// export default Sidebar;
import React from "react";
import ImageComponent from "./draggable/ImageComponent";

import { useDrag } from "react-dnd";

const DraggableTable = ({ type, label }) => {
  const [, drag] = useDrag({
    type: "table",
    item: { type },
  });

  return (
    <div
      ref={drag}
      style={{
        margin: "10px 0",
        padding: "10px",
        border: "1px dashed #ddd",
        textAlign: "center",
        cursor: "move",
      }}
    >
      {label}
    </div>
  );
};

const Sidebar = ({ addTable }) => {
  return (
    <div
      style={{
        width: "300px",
        padding: "20px",
        borderRight: "1px solid #ddd",
        background: "#fff",
      }}
    >
      <h4>Table Options</h4>
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

      <h4>Table Details</h4>
      <div style={{ marginTop: "10px" }}>
        <label>Table Name:</label>
        <input type="text" style={{ width: "100%", marginBottom: "10px" }} />
        <label>Min Covers:</label>
        <input type="number" style={{ width: "100%", marginBottom: "10px" }} />
        <label>Max Covers:</label>
        <input type="number" style={{ width: "100%", marginBottom: "10px" }} />
        <label>Online:</label>
        <input type="checkbox" />
      </div>
    </div>
  );
};

export default Sidebar;
