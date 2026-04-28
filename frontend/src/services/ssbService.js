import axios from "../api/axiosConfig";

/* =========================
   SSB OVERVIEW
========================= */
export const getSSBOverview = () =>
  axios.get("/api/ssb/overview");

export const createSSBOverview = (data) =>
  axios.post("/api/ssb/overview", data);

/* =========================
   SSB RESOURCES
========================= */
export const getSSBResources = () =>
  axios.get("/api/ssb/resources");

export const createSSBResource = (data) =>
  axios.post("/api/ssb/resources", data);

/* =========================
   SSB STAGES
========================= */
export const getSSBStages = () =>
  axios.get("/api/ssb/stages");

export const createSSBStage = (data) =>
  axios.post("/api/ssb/stages", data);

export const updateSSBStage = (id, data) =>
  axios.put(`/api/ssb/stages/${id}`, data);

export const deleteSSBStage = (id) =>
  axios.delete(`/api/ssb/stages/${id}`);

/* =========================
   SSB TESTS
========================= */
export const getSSBTests = () =>
  axios.get("/api/ssb/tests");

export const getSSBTestsByStage = (stageId) =>
  axios.get(`/api/ssb/tests/stage/${stageId}`);

export const createSSBTest = (data) =>
  axios.post("/api/ssb/tests", data);

export const updateSSBTest = (id, data) =>
  axios.put(`/api/ssb/tests/${id}`, data);

export const deleteSSBTest = (id) =>
  axios.delete(`/api/ssb/tests/${id}`);