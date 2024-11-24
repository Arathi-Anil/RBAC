import React, { useEffect, useState } from 'react';
import { getRoles, addRole, assignPermissionsToRole } from '../services/api';
import { Button, TextField, Checkbox, FormControlLabel, List, ListItem, ListItemText } from '@mui/material';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });

  useEffect(() => {
    getRoles().then(response => setRoles(response.data));
  }, []);

  const handleAddRole = () => {
    addRole(newRole).then(() => {
      setRoles([...roles, newRole]);
      setNewRole({ name: '', permissions: [] });
    });
  };

  const handlePermissionsChange = (permission) => {
    const updatedPermissions = newRole.permissions.includes(permission)
      ? newRole.permissions.filter(p => p !== permission)
      : [...newRole.permissions, permission];
    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  return (
    <div>
      <h2>Role Management</h2>
      <TextField
        label="Role Name"
        value={newRole.name}
        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
      />
      <div>
        {['Read', 'Write', 'Delete'].map(permission => (
          <FormControlLabel
            key={permission}
            control={
              <Checkbox
                checked={newRole.permissions.includes(permission)}
                onChange={() => handlePermissionsChange(permission)}
              />
            }
            label={permission}
          />
        ))}
      </div>
      <Button onClick={handleAddRole}>Add Role</Button>
      <List>
        {roles.map(role => (
          <ListItem key={role.id}>
            <ListItemText primary={role.name} secondary={role.permissions.join(', ')} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RoleManagement;
