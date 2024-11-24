import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: '#1e3a5f', // Light navy blue color
        boxShadow: 3, // Floating effect with shadow
        borderRadius: '12px', // Rounded corners
        mt: 2, // Margin top for spacing
        '& .MuiToolbar-root': {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 16px', // Reduced padding for smaller size
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1.2rem' }}>
          RBAC System
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={Link} to="/" sx={{ fontSize: '0.875rem' }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/users" sx={{ fontSize: '0.875rem' }}>
            User Management
          </Button>
          <Button color="inherit" component={Link} to="/roles" sx={{ fontSize: '0.875rem' }}>
            Role Management
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
