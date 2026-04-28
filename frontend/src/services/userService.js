import axios from "../api/axiosConfig";

// Get all users
export const getAllUsers = () =>
  axios.get("/api/users");

// Get user by ID
export const getUserById = (id) =>
  axios.get(`/api/users/${id}`);

// Update user role
export const updateUserRole = (id, role) =>
  axios.put(`/api/users/${id}/role`, { role });

// Update user
export const updateUser = (id, data) =>
  axios.put(`/api/users/${id}`, data);

// Delete user
export const deleteUser = (id) =>
  axios.delete(`/api/users/${id}`);

// Get user statistics
export const getUserStats = () =>
  axios.get("/api/users/stats");