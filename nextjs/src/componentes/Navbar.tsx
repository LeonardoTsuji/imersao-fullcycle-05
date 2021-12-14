import { AppBar, Toolbar, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import React from "react";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <StoreIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FullCycle
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
