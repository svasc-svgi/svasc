import apiClient from './apiClient';

/**
 * ==============================================================================
 * AWARDS GALLERY API SERVICES
 * ==============================================================================
 */

const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData;

// 1. GET ALL AWARDS
export const getAwards = async () => {
  return await apiClient.get('/awards-gallery');
};

// 2. CREATE AWARD
export const createAward = async (data) => {
  return await apiClient.post(
    '/awards-gallery',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 3. UPDATE AWARD
export const updateAward = async (id, data) => {
  return await apiClient.put(
    `/awards-gallery/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 4. DELETE AWARD
export const deleteAward = async (id) => {
  return await apiClient.delete(`/awards-gallery/${id}`);
};

// 5. GET AWARDS PAGE HERO
export const getAwardsPageHero = async () => {
  return await apiClient.get('/page-heros/awards');
};
