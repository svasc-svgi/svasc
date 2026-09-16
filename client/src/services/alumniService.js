import apiClient from './apiClient';

/**

 */

const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData;

// 1. RISING STARS
export const getRisingStars = async () => {
  return await apiClient.get('/alumni/rising-stars');
};

export const createRisingStar = async (data) => {
  return await apiClient.post(
    '/alumni/rising-stars',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const updateRisingStar = async (id, data) => {
  return await apiClient.put(
    `/alumni/rising-stars/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const deleteRisingStar = async (id) => {
  return await apiClient.delete(`/alumni/rising-stars/${id}`);
};

// 2. SUCCESS STORIES
export const getSuccessStories = async () => {
  return await apiClient.get('/alumni/success-stories');
};

export const createSuccessStory = async (data) => {
  return await apiClient.post(
    '/alumni/success-stories',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const updateSuccessStory = async (id, data) => {
  return await apiClient.put(
    `/alumni/success-stories/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const deleteSuccessStory = async (id) => {
  return await apiClient.delete(`/alumni/success-stories/${id}`);
};

// 3. RANK HOLDERS
export const getRankHolders = async () => {
  return await apiClient.get('/alumni/rank-holders');
};

export const getRankHoldersByYear = async (year) => {
  return await apiClient.get(`/alumni/rank-holders/year/${year}`);
};

export const createRankHolder = async (data) => {
  return await apiClient.post('/alumni/rank-holders', data);
};

export const updateRankHolder = async (id, data) => {
  return await apiClient.put(`/alumni/rank-holders/${id}`, data);
};

export const deleteRankHolder = async (id) => {
  return await apiClient.delete(`/alumni/rank-holders/${id}`);
};

// 4. PAGE HERO
export const getAlumniPageHero = async () => {
  return await apiClient.get('/page-heros/alumni');
};
