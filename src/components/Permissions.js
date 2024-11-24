import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button } from '@mui/material';

const Permissions = ({ role }) => {
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  const handlePermissionChange = (event) => {
    setPermissions({ ...permissions, [event.target.name]: event.target.checked });
  };

  // Function to delete/reset permissions
  const handleDeletePermissions = () => {
    setPermissions({
      read: false,
      write: false,
      delete: false,
    });
  };

  if (!role) return <div>Loading...</div>; // Ensure role is not undefined

  return (
    <div>
      <h2>Permissions for {role.name}</h2>
      
      {/* Permission checkboxes */}
      <FormControlLabel
        control={<Checkbox checked={permissions.read} onChange={handlePermissionChange} name="read" />}
        label="Read"
      />
      <FormControlLabel
        control={<Checkbox checked={permissions.write} onChange={handlePermissionChange} name="write" />}
        label="Write"
      />
      <FormControlLabel
        control={<Checkbox checked={permissions.delete} onChange={handlePermissionChange} name="delete" />}
        label="Delete"
      />

      {/* Button to delete/reset permissions */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeletePermissions}
        style={{ marginTop: '20px' }}
      >
        Delete Permissions
      </Button>
    </div>
  );
};

export default Permissions;
