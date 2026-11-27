import apiClient from './apiClient';

export const submitAdmission = async (data) => {
  return await apiClient.post('/admissions', data);
};

export const getAdmissions = async () => {
  return await apiClient.get('/admissions');
};

export const markAdmissionRead = async (id) => {
  return await apiClient.patch(`/admissions/${id}/read`);
};

export const markAllAdmissionsRead = async () => {
  return await apiClient.patch('/admissions/mark-all-read');
};

export const updateAdmissionStatus = async (id, status) => {
  return await apiClient.patch(`/admissions/${id}/status`, { status });
};

export const deleteAdmission = async (id) => {
  return await apiClient.delete(`/admissions/${id}`);
};
