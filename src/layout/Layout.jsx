import React from "react";
import VerticalDrawer from "../components/VerticalDrawer";
import { AppBar, Box, Typography } from "@mui/material";
import { DndProvider } from "react-dnd";

import { HTML5Backend } from "react-dnd-html5-backend";
import TableManager from "../components/TableManager";

const Layout = () => {
  return (
    <div className="d-flex">
      {/* Left Drawer Navigation */}
      <VerticalDrawer />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1 }} className="ml-20 mt-0">
        <AppBar position="static">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="text-black bg-white text-center"
          >
            Floor Management
          </Typography>
        </AppBar>

        <DndProvider backend={HTML5Backend}>
          <TableManager />;
        </DndProvider>
      </Box>
    </div>
  );
};

export default Layout;
