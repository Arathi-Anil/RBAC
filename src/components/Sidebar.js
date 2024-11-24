// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';

const Sidebar = () => {
    return (
        <Drawer variant="permanent" anchor="left">
            <List>
                <ListItem button component={Link} to="/users">
                    <ListItemText primary="User Management" />
                </ListItem>
                <ListItem button component={Link} to="/roles">
                    <ListItemText primary="Role Management" />
                </ListItem>
                <ListItem button component={Link} to="/permissions">
                    <ListItemText primary="Permissions" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
