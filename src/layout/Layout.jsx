import React from "react";
import VerticalDrawer from "../components/VerticalDrawer";
import { AppBar, Box, Typography } from "@mui/material";
import { DndProvider } from "react-dnd";
import { Basket } from "../components/Basket";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

const Layout = () => {
  return (
    <div className="d-flex">
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

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div style={{ border: "1px solid black", padding: "8px" }}>
              Tables
            </div>
          </Grid>

          <Grid item xs={9}>
            <div style={{ border: "1px solid black", padding: "8px" }}>
              Main Room
              <Stack spacing={2} align="right" direction="row">
                <Button variant="contained">+ Add Room</Button>
                <Button variant="text">Save Room</Button>
              </Stack>
            </div>
          </Grid>
        </Grid>

        <DndProvider backend={HTML5Backend}>
          <Basket />
        </DndProvider>
      </Box>
    </div>
  );
};

export default Layout;
