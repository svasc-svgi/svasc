import apiClient from './apiClient';

/**
 * ==============================================================================
 * ABOUT SVASC API SERVICES
 * ==============================================================================
 */

const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData;

// 1. CERTIFICATIONS SERVICES
export const getCertifications = async () => {
  return await apiClient.get('/about/certifications');
};

export const createCertification = async (data) => {
  return await apiClient.post(
    '/about/certifications',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const updateCertification = async (id, data) => {
  return await apiClient.put(
    `/about/certifications/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const deleteCertification = async (id) => {
  return await apiClient.delete(`/about/certifications/${id}`);
};

// 2. TEACHER AWARDS SERVICES
export const getAllTeacherAwards = async () => {
  return await apiClient.get('/about/teacher-awards');
};

export const getGroupedTeacherAwards = async () => {
  return await apiClient.get('/about/teacher-awards/grouped');
};

export const createTeacherAward = async (data) => {
  return await apiClient.post('/about/teacher-awards', data);
};

export const updateTeacherAward = async (id, data) => {
  return await apiClient.put(`/about/teacher-awards/${id}`, data);
};

export const deleteTeacherAward = async (id) => {
  return await apiClient.delete(`/about/teacher-awards/${id}`);
};

// 3. ABOUT PAGE HERO
export const getAboutPageHero = async () => {
  return await apiClient.get('/page-heros/about');
};
