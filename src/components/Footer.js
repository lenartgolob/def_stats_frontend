import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar className='footer' position="static" color="primary">
      <Toolbar>
        <Typography className="footer-text"  variant="body1" color="inherit">
          RPDEF stats ©
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;