import apiClient from './apiClient';

/**
 * ==============================================================================
 * CAMPUS LIFE API SERVICES
 * ==============================================================================
 */

const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData;

// 1. GALLERY SERVICES
export const getCampusLifeGallery = async () => {
  return await apiClient.get('/campus-life/gallery');
};

export const createCampusLifeGallery = async (data) => {
  return await apiClient.post(
    '/campus-life/gallery',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const updateCampusLifeGallery = async (id, data) => {
  return await apiClient.put(
    `/campus-life/gallery/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const deleteCampusLifeGallery = async (id) => {
  return await apiClient.delete(`/campus-life/gallery/${id}`);
};

// 2. SCROLL ITEMS SERVICES
export const getCampusLifeScrollItems = async () => {
  return await apiClient.get('/campus-life/scroll-items');
};

export const createCampusLifeScrollItem = async (data) => {
  return await apiClient.post(
    '/campus-life/scroll-items',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const updateCampusLifeScrollItem = async (id, data) => {
  return await apiClient.put(
    `/campus-life/scroll-items/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const deleteCampusLifeScrollItem = async (id) => {
  return await apiClient.delete(`/campus-life/scroll-items/${id}`);
};

// 3. PAGE HERO
export const getCampusLifePageHero = async () => {
  return await apiClient.get('/page-heros/campus-life');
};
