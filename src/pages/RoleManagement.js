import React, { useEffect, useState } from 'react';
import { getRoles, addRole, updateRole, deleteRole } from '../services/api';
import { Button, TextField, Checkbox, FormControlLabel, List, ListItem, ListItemText, Grid, Card, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [roleToEdit, setRoleToEdit] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    setLoading(true);
    getRoles()
      .then(response => {
        setRoles(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddRole = () => {
    if (!newRole.name.trim()) {
      alert('Please enter a role name.');
      return;
    }

    setIsSubmitting(true);
    addRole(newRole).then(() => {
      setRoles([...roles, newRole]);
      setNewRole({ name: '', permissions: [] });
      setIsSubmitting(false);
    }).catch(() => setIsSubmitting(false));
  };

  const handleDeleteRole = () => {
    if (roleToDelete) {
      setLoading(true);
      deleteRole(roleToDelete.id)
        .then(() => {
          fetchRoles();
          handleCloseDeleteDialog();
        })
        .catch(() => setLoading(false));
    }
  };

  const handleEditRole = () => {
    if (roleToEdit) {
      setLoading(true);
      updateRole(roleToEdit.id, roleToEdit)
        .then(() => {
          fetchRoles();
          handleCloseEditDialog();
        })
        .catch(() => setLoading(false));
    }
  };

  const handlePermissionsChange = (permission) => {
    const updatedPermissions = newRole.permissions.includes(permission)
      ? newRole.permissions.filter(p => p !== permission)
      : [...newRole.permissions, permission];
    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  const handleOpenDeleteDialog = (role) => {
    setRoleToDelete(role);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setRoleToDelete(null);
  };

  const handleOpenEditDialog = (role) => {
    setRoleToEdit(role);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setRoleToEdit(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">Role Management</Typography>

      <Card sx={{ padding: 3, marginBottom: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Role Name"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Permissions</Typography>
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
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddRole}
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Add Role'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {loading ? (
        <CircularProgress size={50} sx={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <List>
          {roles.map(role => (
            <ListItem key={role.id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <ListItemText
                primary={role.name}
                secondary={`Permissions: ${role.permissions.join(', ')}`}
              />
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpenEditDialog(role)}
                  sx={{ marginRight: 2 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleOpenDeleteDialog(role)}
                >
                  Delete
                </Button>
              </div>
            </ListItem>
          ))}
        </List>
      )}

      {/* Delete Role Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the role "{roleToDelete?.name}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteRole}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            value={roleToEdit?.name || ''}
            onChange={(e) => setRoleToEdit({ ...roleToEdit, name: e.target.value })}
            fullWidth
            required
          />
          <Typography variant="h6">Permissions</Typography>
          {['Read', 'Write', 'Delete'].map(permission => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={roleToEdit?.permissions.includes(permission)}
                  onChange={() => {
                    const updatedPermissions = roleToEdit?.permissions.includes(permission)
                      ? roleToEdit?.permissions.filter(p => p !== permission)
                      : [...roleToEdit?.permissions, permission];
                    setRoleToEdit({ ...roleToEdit, permissions: updatedPermissions });
                  }}
                />
              }
              label={permission}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleEditRole}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
