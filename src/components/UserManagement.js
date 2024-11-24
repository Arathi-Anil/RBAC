// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import { fetchUsers, addUser, deleteUser } from '../services/api'; // Ensure this import is correct

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', position: '', status: 'Active' });

    useEffect(() => {
        fetchUsers().then((res) => setUsers(res.data));
    }, []);

    const handleAddUser = () => {
        if (newUser.name && newUser.email && newUser.position) {
            addUser(newUser).then((res) => setUsers([...users, res.data]));
            setNewUser({ name: '', email: '', position: '', status: 'Active' }); // Reset form
        } else {
            alert('Please fill all the fields');
        }
    };

    const handleDeleteUser = (userId) => {
        deleteUser(userId).then(() => setUsers(users.filter((user) => user.id !== userId)));
    };

    return (
        <div>
            <h2>User Management</h2>

            {/* Form to Add New User */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <TextField
                    label="Position"
                    variant="outlined"
                    value={newUser.position}
                    onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                    placeholder="Enter position"
                />
                <Select
                    value={newUser.status}
                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                    displayEmpty
                    variant="outlined"
                >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
                <Button onClick={handleAddUser} variant="contained">
                    Add User
                </Button>
            </div>

            {/* User Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.position}</TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleDeleteUser(user.id)}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserManagement;
