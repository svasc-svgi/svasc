import apiClient from './apiClient';

/**
 * ==============================================================================
 * NEWSLETTER API SERVICES
 * ==============================================================================
 */

const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData;

// 1. GET ALL NEWSLETTERS
export const getNewsletters = async () => {
  return await apiClient.get('/newsletter');
};

// 2. CREATE NEWSLETTER
export const createNewsletter = async (data) => {
  return await apiClient.post(
    '/newsletter',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 3. UPDATE NEWSLETTER
export const updateNewsletter = async (id, data) => {
  return await apiClient.put(
    `/newsletter/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 4. DELETE NEWSLETTER
export const deleteNewsletter = async (id) => {
  return await apiClient.delete(`/newsletter/${id}`);
};

// 5. GET NEWSLETTER PAGE HERO
export const getNewsletterPageHero = async () => {
  return await apiClient.get('/page-heros/newsletter');
};
