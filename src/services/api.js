import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Simulate a local server using json-server
});

export const getUsers = () => api.get('/users');
export const getRoles = () => api.get('/roles');
export const addUser = (user) => api.post('/users', user);
export const addRole = (role) => api.post('/roles', role);
export const updateUser = (user) => api.put(`/users/${user.id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const assignRoleToUser = (id, role) => api.patch(`/users/${id}`, { role });
export const assignPermissionsToRole = (id, permissions) => api.patch(`/roles/${id}`, { permissions });
