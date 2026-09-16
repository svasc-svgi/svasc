import apiClient from './apiClient';

/**
 * ==============================================================================
 * ACTIVITIES, CLUBS, CELLS & COMMITTEES SERVICE
 * ==============================================================================
 */

// 1. GET ALL ACTIVITIES / CATEGORIES
export const getActivities = async (params = {}) => {
  return await apiClient.get('/activities', { params });
};

// 2. GET SINGLE ACTIVITY / CLUB BY ID OR SLUG
export const getActivityById = async (idOrSlug) => {
  return await apiClient.get(`/activities/${idOrSlug}`);
};

// 3. CREATE NEW ACTIVITY / CLUB (From Admin Panel with images)
export const createActivity = async (formData) => {
  return await apiClient.post('/activities', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 4. UPDATE ACTIVITY / CLUB
export const updateActivity = async (id, formData) => {
  return await apiClient.put(`/activities/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 5. DELETE ACTIVITY / CLUB
export const deleteActivity = async (id) => {
  return await apiClient.delete(`/activities/${id}`);
};
