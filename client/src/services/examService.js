import apiClient from './apiClient';

/**
 * ==============================================================================
 * EXAMINATION API SERVICES
 * ==============================================================================
 */

const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData;

// 1. GET ALL EXAM TIMETABLES
export const getExamTimeTables = async () => {
  return await apiClient.get('/exam');
};

// 2. GET SINGLE EXAM TIMETABLE BY ID
export const getExamTimeTableById = async (id) => {
  return await apiClient.get(`/exam/${id}`);
};

// 3. CREATE EXAM TIMETABLE (Supports Direct Cloudinary PDF URL or FormData)
export const createExamTimeTable = async (data) => {
  return await apiClient.post(
    '/exam',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 4. UPDATE EXAM TIMETABLE
export const updateExamTimeTable = async (id, data) => {
  return await apiClient.put(
    `/exam/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 5. DELETE EXAM TIMETABLE
export const deleteExamTimeTable = async (id) => {
  return await apiClient.delete(`/exam/${id}`);
};

// 6. GET EXAM PORTAL CONFIG (3 Images & Exam Schedules)
export const getExamPortalConfig = async () => {
  return await apiClient.get('/exam/portal-config');
};

// 7. UPDATE EXAM PORTAL CONFIG (Supports Direct Cloudinary Image URLs or FormData)
export const updateExamPortalConfig = async (data) => {
  return await apiClient.put(
    '/exam/portal-config',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 8. GET EXAM PAGE HERO
export const getExamPageHero = async () => {
  return await apiClient.get('/page-heros/exam');
};
