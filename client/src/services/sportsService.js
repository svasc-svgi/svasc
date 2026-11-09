import apiClient from './apiClient';

/**
 * ==============================================================================
 * SPORTS API SERVICES
 * ==============================================================================
 */

const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData;

// 1. GET ALL SPORT HOUSES
export const getSportHouses = async () => {
  return await apiClient.get('/sports/houses');
};

// 2. CREATE SPORT HOUSE (Supports Direct Cloudinary URL or FormData upload)
export const createSportHouse = async (data) => {
  return await apiClient.post(
    '/sports/houses',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 3. UPDATE SPORT HOUSE BY ID
export const updateSportHouse = async (id, data) => {
  return await apiClient.put(
    `/sports/houses/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 4. DELETE SPORT HOUSE BY ID
export const deleteSportHouse = async (id) => {
  return await apiClient.delete(`/sports/houses/${id}`);
};

// 5. GET SPORTS PAGE HERO
export const getSportsPageHero = async () => {
  return await apiClient.get('/page-heros/sports');
};

// 6. GET SPORTS DAY DETAILS (Paragraph & PDF)
export const getSportsDay = async () => {
  return await apiClient.get('/sports/day');
};

// 7. UPDATE SPORTS DAY DETAILS (Supports Direct Cloudinary URL or FormData upload)
export const updateSportsDay = async (data) => {
  return await apiClient.put(
    '/sports/day',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};
