import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { ReactComponent as Vector } from "./../assets/Vector.svg";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const NAVIGATION = [
  { title: "Home", icon: <HomeIcon /> },
  { title: "Profile", icon: <Vector /> },
];

const VerticalDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="flex">
      <IconButton
        onClick={toggleDrawer}
        edge="start"
        aria-label="menu"
        className="m-2"
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          style: {
            width: open ? 240 : 72,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Box
          role="presentation"
          sx={{
            width: open ? 240 : 72,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 2,
          }}
        >
          <List>
            {NAVIGATION.map((item) => (
              <ListItem
                button
                key={item.title}
                className="flex items-center justify-center"
              >
                <Tooltip title={!open ? item.title : ""} placement="right">
                  <Box display="flex" alignItems="center">
                    {item.icon}
                    {open && (
                      <ListItemText
                        primary={item.title}
                        className="ml-4"
                        primaryTypographyProps={{ noWrap: true }}
                      />
                    )}
                  </Box>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default VerticalDrawer;
