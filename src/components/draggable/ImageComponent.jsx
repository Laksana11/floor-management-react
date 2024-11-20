import React from "react";
import { Box } from "@mui/material";
import { ReactComponent as MidIcon } from "./../../assets/Mid.svg";
import { ReactComponent as Table } from "./../../assets/Table.svg";

function ImageComponent() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      p={2}
      border="1px solid #ccc"
      borderRadius={2}
    >
      <MidIcon style={{ width: "100px", height: "100px" }} />
      <Table style={{ width: "100px", height: "100px" }} />
    </Box>
  );
}
export default ImageComponent;
