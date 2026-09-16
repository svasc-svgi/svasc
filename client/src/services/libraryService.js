import apiClient from './apiClient';

/**
 * ==============================================================================
 * LIBRARY API SERVICES (Activities & Awards)
 * ==============================================================================
 */

const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData;

// 1. LIBRARY ACTIVITIES
export const getLibraryActivities = async () => {
  return await apiClient.get('/library-activities');
};

export const createLibraryActivity = async (data) => {
  return await apiClient.post(
    '/library-activities',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const updateLibraryActivity = async (id, data) => {
  return await apiClient.put(
    `/library-activities/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const deleteLibraryActivity = async (id) => {
  return await apiClient.delete(`/library-activities/${id}`);
};

// 2. LIBRARY AWARDS
export const getLibraryAwards = async () => {
  return await apiClient.get('/library-awards');
};

export const createLibraryAward = async (data) => {
  return await apiClient.post(
    '/library-awards',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const updateLibraryAward = async (id, data) => {
  return await apiClient.put(
    `/library-awards/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const deleteLibraryAward = async (id) => {
  return await apiClient.delete(`/library-awards/${id}`);
};

// 3. LIBRARY PAGE HERO
export const getLibraryPageHero = async () => {
  return await apiClient.get('/page-heros/library');
};
