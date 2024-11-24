import React, { useEffect, useState } from 'react';
import { getUsers, addUser, deleteUser, updateUser } from '../services/api';
import { Button, TextField, List, ListItem, ListItemText, Select, MenuItem, Grid, Card, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState(null); // Track the user being edited
  const [openEditDialog, setOpenEditDialog] = useState(false); // Dialog visibility state

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(response => setUsers(response.data))
      .finally(() => setLoading(false));
  }, []);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.role) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);
    addUser(newUser).then(() => {
      setUsers([...users, { ...newUser, id: users.length + 1 }]); // Simulate the id assignment.
      setNewUser({ name: '', role: '' });
    }).finally(() => setLoading(false));
  };

  const handleDeleteUser = (id) => {
    setLoading(true);
    deleteUser(id).then(() => {
      setUsers(users.filter(user => user.id !== id));
    }).finally(() => setLoading(false));
  };

  const handleRoleChange = (id, role) => {
    setLoading(true);
    updateUser({ id, role }).then(() => {
      setUsers(users.map(user => user.id === id ? { ...user, role } : user));
    }).finally(() => setLoading(false));
  };

  const handleOpenEditDialog = (user) => {
    setEditUser(user); // Set the user details for editing
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditUser(null); // Reset edit user on close
  };

  const handleSaveEditUser = () => {
    if (!editUser.name || !editUser.role) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);
    updateUser(editUser).then(() => {
      setUsers(users.map(user => user.id === editUser.id ? editUser : user));
      handleCloseEditDialog();
    }).finally(() => setLoading(false));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      <Card sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Name"
              fullWidth
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              label="Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              fullWidth
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Add User'}
        </Button>
      </Card>

      <List>
        {users.map(user => (
          <ListItem key={user.id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <ListItemText primary={user.name} secondary={user.role} />
            
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteUser(user.id)}
              disabled={loading}
            >
              Delete
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleOpenEditDialog(user)}
              disabled={loading}
              sx={{ marginLeft: 2 }}
            >
              Edit
            </Button>

            <Select
              value={user.role}
              onChange={(e) => handleRoleChange(user.id, e.target.value)}
              sx={{ marginLeft: 2 }}
              disabled={loading}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </ListItem>
        ))}
      </List>

      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={editUser?.name || ''}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <Select
            label="Role"
            value={editUser?.role || ''}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            fullWidth
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveEditUser}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
