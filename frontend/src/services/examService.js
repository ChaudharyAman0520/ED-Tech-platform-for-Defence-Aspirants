import axios from "../api/axiosConfig";

// ========== QUESTIONS ==========
export const getAllQuestions = () =>
  axios.get("/api/exam/questions");

export const getQuestionsBySubject = (subjectId) =>
  axios.get(`/api/exam/questions/subject/${subjectId}`);

export const createQuestion = (data) =>
  axios.post("/api/exam/questions", data);

export const updateQuestion = (id, data) =>
  axios.put(`/api/exam/questions/${id}`, data);

export const deleteQuestion = (id) =>
  axios.delete(`/api/exam/questions/${id}`);

// ========== TESTS ==========
export const getAllTests = () =>
  axios.get("/api/exam/tests");

export const getTestById = (id) =>
  axios.get(`/api/exam/tests/${id}`);

export const createTest = (data) =>
  axios.post("/api/exam/tests", data);

export const addQuestionsToTest = (testId, questionIds) =>
  axios.post(`/api/exam/tests/${testId}/questions`, questionIds);

export const deleteTest = (id) =>
  axios.delete(`/api/exam/tests/${id}`);

// ========== ATTEMPTS (For Student Interface) ==========
export const startAttempt = (testId) =>
  axios.post(`/api/exam/attempts/start?testId=${testId}`);

export const submitAttempt = (attemptId, answers) =>
  axios.post(`/api/exam/attempts/${attemptId}/submit`, answers);

export const getMyAttempts = () =>
  axios.get("/api/exam/attempts/my-attempts");

// ========== ADMIN ATTEMPTS (For Test Results Page) ==========
export const getAllAttempts = () =>
  axios.get("/api/exam/attempts/all-attempts");

export const getAttemptsByTest = (testId) =>
  axios.get(`/api/exam/attempts/test/${testId}/results`);
