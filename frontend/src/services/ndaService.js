import axios from "../api/axiosConfig";

/* =========================
   ELIGIBILITY
========================= */
export const getEligibility = () =>
  axios.get("/api/nda/eligibility");

export const createEligibility = (data) =>
  axios.post("/api/nda/eligibility", data);

export const updateEligibility = (id, data) =>
  axios.put(`/api/nda/eligibility/${id}`, data);

export const deleteEligibility = (id) =>
  axios.delete(`/api/nda/eligibility/${id}`);


/* =========================
   EXAM INFO
========================= */
export const getExamInfo = () =>
  axios.get("/api/nda/info");

export const createExamInfo = (data) =>
  axios.post("/api/nda/info", data);

export const updateExamInfo = (id, data) =>
  axios.put(`/api/nda/info/${id}`, data);

export const deleteExamInfo = (id) =>
  axios.delete(`/api/nda/info/${id}`);


/* =========================
   SUBJECTS
========================= */
export const getSubjects = () =>
  axios.get("/api/nda/subjects");

export const getSubjectById = (id) =>
  axios.get(`/api/nda/subjects/${id}`);

export const createSubject = (data) =>
  axios.post("/api/nda/subjects", data);

export const updateSubject = (id, data) =>
  axios.put(`/api/nda/subjects/${id}`, data);

export const deleteSubject = (id) =>
  axios.delete(`/api/nda/subjects/${id}`);


/* =========================
   STUDY RESOURCES
========================= */

export const getStudyResources = () =>
  axios.get("/api/nda/resources");

export const createStudyResource = (data) =>
  axios.post("/api/nda/resources", data);

export const updateStudyResource = (id, data) =>
  axios.put(`/api/nda/resources/${id}`, data);

export const deleteStudyResource = (id) =>
  axios.delete(`/api/nda/resources/${id}`);

export const getResourcesBySubject = (subjectId) =>
  axios.get(`/api/nda/resources/subject/${subjectId}`);


/* =========================
   PYQ
========================= */
export const getPYQs = () =>
  axios.get("/api/nda/pyq");

export const createPYQ = (data) =>
  axios.post("/api/nda/pyq", data);

export const getPYQByYear = (year) =>
  axios.get(`/api/nda/pyq/year/${year}`);

export const getPYQBySubject = (subjectId) =>
  axios.get(`/api/nda/pyq/subject/${subjectId}`);

export const deletePYQ = (id) =>
  axios.delete(`/api/nda/pyq/${id}`);