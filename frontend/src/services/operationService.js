import axios from "../api/axiosConfig";

// GET all operations
export const getOperations = () =>
  axios.get("/api/operations");

// GET by ID
export const getOperationById = (id) =>
  axios.get(`/api/operations/${id}`);

// CREATE (ADMIN)
export const createOperation = (data) =>
  axios.post("/api/operations", data);

// ✅ UPDATE (ADMIN)
export const updateOperation = (id, data) =>
  axios.put(`/api/operations/${id}`, data);

// ✅ DELETE (ADMIN)
export const deleteOperation = (id) =>
  axios.delete(`/api/operations/${id}`);

// FEATURED
export const getFeaturedOperations = () =>
  axios.get("/api/operations/featured");