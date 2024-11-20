import React from "react";
import { ReactComponent as RoundTable } from "./../../assets/Mid.svg";
import { ReactComponent as SquareTable } from "./../../assets/Table.svg";

const ImageComponent = ({ type, onClick, label }) => {
  const TableIcon = type === "round" ? RoundTable : SquareTable;

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "1rem",
      }}
    >
      <TableIcon style={{ width: "50px", height: "50px" }} />
      <span style={{ marginLeft: "0.5rem" }}>{label}</span>
    </div>
  );
};

export default ImageComponent;
