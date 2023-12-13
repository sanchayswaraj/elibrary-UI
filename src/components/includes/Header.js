import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';

function Header() {
  return (
    <AppBar position="static" style={{background:"black"}} >
      <Toolbar>
        <a href="/">
          <img
            src="/images/logo3.png"
            alt="Logo"
            height="30"
            width="150"
            style={{ marginRight: "20px" }}
          />
        </a>
        <Typography variant="h6" component="div">
          E-Library
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
