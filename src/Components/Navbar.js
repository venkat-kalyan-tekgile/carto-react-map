import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = ({ username }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          UE-NET
        </Typography>
        <Typography variant="subtitle1">{username}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
