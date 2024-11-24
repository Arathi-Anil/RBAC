// src/components/Dashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // for routing
import { AppBar, Drawer, List, ListItem, ListItemText, Toolbar, Typography, CssBaseline } from '@mui/material';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar (Drawer) */}
      <CssBaseline />
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        style={{ width: 240, flexShrink: 0 }}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <div style={{ padding: '20px' }}>
          <List>
            <ListItem button component={Link} to="/user-management">
              <ListItemText primary="User Management" />
            </ListItem>
            <ListItem button component={Link} to="/role-management">
              <ListItemText primary="Role Management" />
            </ListItem>
            <ListItem button component={Link} to="/permissions">
              <ListItemText primary="Permissions" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Main content area */}
      <main style={{ flexGrow: 1, padding: '20px', marginTop: '60px' }}>
        <Outlet /> {/* The active page (UserManagement, RoleManagement, etc.) will be rendered here */}
      </main>
    </div>
  );
};

export default Dashboard;
