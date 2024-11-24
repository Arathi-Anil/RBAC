import React, { useState, useEffect } from 'react';
import axios from '../services/api'; // Assuming you have an axios instance configured
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Grid, FormControlLabel, Checkbox, Alert } from '@mui/material';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [userPermissions, setUserPermissions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState(null);
  const [error, setError] = useState('');

  const permissions = ['read', 'write', 'delete'];

  useEffect(() => {
    // Fetch roles and users from the API when component mounts
    axios.get('/roles').then((response) => {
      setRoles(response.data);
    });

    axios.get('/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleAddRole = () => {
    if (newRole.trim() === '') {
      setError('Role name cannot be empty');
      return;
    }

    if (roles.some((role) => role.name === newRole)) {
      setError('Role already exists');
      return;
    }

    const newRoleData = { name: newRole, permissions: [] };
    axios
      .post('/roles', newRoleData)
      .then(() => {
        setRoles([...roles, newRoleData]);
        setNewRole('');
        setError('');
      })
      .catch((err) => {
        setError('Error adding role');
      });
  };

  const handleEditRole = (roleName) => {
    const roleToEdit = roles.find((role) => role.name === roleName);
    setNewRole(roleToEdit.name); // Set the role name
    setUserPermissions(roleToEdit.permissions); // Set the permissions associated with the role
    setSelectedRoleForEdit(roleName); // Set the role name to be updated
    setIsEdit(true); // Switch to edit mode
  };

  const handleUpdateRole = () => {
    if (newRole.trim() === '') {
      setError('Role name cannot be empty');
      return;
    }

    const updatedRoleData = { name: newRole, permissions: userPermissions };

    // Make PUT request to update the role on the server
    axios
      .put(`/roles/${selectedRoleForEdit}`, updatedRoleData)
      .then(() => {
        // Update the local state with the updated role
        setRoles(
          roles.map((role) =>
            role.name === selectedRoleForEdit ? { ...role, ...updatedRoleData } : role
          )
        );
        // Reset the form
        setIsEdit(false);
        setSelectedRoleForEdit(null);
        setNewRole('');
        setUserPermissions([]);
        setError('');
      })
      .catch((err) => {
        setError('Error updating role');
      });
  };

  const handleAssignRole = () => {
    if (selectedUser && selectedRole) {
      const updatedUsers = users.map((user) =>
        user.name === selectedUser ? { ...user, role: selectedRole, permissions: userPermissions } : user
      );
      setUsers(updatedUsers);

      axios
        .put(`/users/${selectedUser}`, { role: selectedRole, permissions: userPermissions })
        .then(() => {
          alert('Role assigned successfully');
        })
        .catch((err) => {
          alert('Error assigning role');
        });
    } else {
      alert('Please select a user and a role');
    }
  };

  const handleCheckboxChange = (permission) => {
    const updatedPermissions = userPermissions.includes(permission)
      ? userPermissions.filter((perm) => perm !== permission)
      : [...userPermissions, permission];
    setUserPermissions(updatedPermissions);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>

      {/* Error Display */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Add or Edit Role Section */}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Role Name"
            variant="outlined"
            fullWidth
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={isEdit ? handleUpdateRole : handleAddRole}
          >
            {isEdit ? 'Update Role' : 'Add Role'}
          </Button>
        </Grid>
      </Grid>

      {/* Assign Role to User */}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>User</InputLabel>
            <Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} label="User">
              <MenuItem value="">Select User</MenuItem>
              {users.map((user, index) => (
                <MenuItem key={index} value={user.name}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} label="Role">
              <MenuItem value="">Select Role</MenuItem>
              {roles.map((role, index) => (
                <MenuItem key={index} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Permissions Checkbox List */}
      {selectedRole && (
        <FormControl sx={{ marginBottom: 3 }}>
          <Typography variant="h6">Permissions</Typography>
          {permissions.map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={userPermissions.includes(permission)}
                  onChange={() => handleCheckboxChange(permission)}
                  name={permission}
                  color="primary"
                />
              }
              label={permission}
            />
          ))}
        </FormControl>
      )}

      {/* Assign Role Button */}
      <Button variant="contained" color="primary" fullWidth onClick={handleAssignRole}>
        Assign Role to User
      </Button>

      {/* Display Roles */}
      <Typography variant="h5" sx={{ marginTop: 3 }}>
        Roles
      </Typography>
      <ul>
        {roles.map((role) => (
          <li key={role.name}>
            {role.name}
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginLeft: 2 }}
              onClick={() => handleEditRole(role.name)}
            >
              Edit
            </Button>
          </li>
        ))}
      </ul>

      {/* Display Users and Roles */}
      <Typography variant="h5" sx={{ marginTop: 3 }}>
        Users and Roles
      </Typography>
      <ul>
        {users.map((user) => (
          <li key={user.name}>
            {user.name} - {user.role || 'No Role Assigned'}
            <Button
              variant="outlined"
              color="error"
              sx={{ marginLeft: 2 }}
              onClick={() => handleDeleteRole(user.name)}
            >
              Remove Role
            </Button>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default RoleManagement;
