import apiClient from './apiClient';

/**
 * ==============================================================================
 * 1. HERO SLIDER CRUD SERVICES
 * ==============================================================================
 */

// GET ALL HERO SLIDES
export const getHeroSlides = async (params = {}) => {
  return await apiClient.get('/home/hero-slides', { params });
};

// CREATE NEW HERO SLIDE (Supports Image Upload via FormData)
export const createHeroSlide = async (formData) => {
  return await apiClient.post('/home/hero-slides', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// UPDATE HERO SLIDE BY ID
export const updateHeroSlide = async (id, formData) => {
  return await apiClient.put(`/home/hero-slides/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// DELETE HERO SLIDE BY ID
export const deleteHeroSlide = async (id) => {
  return await apiClient.delete(`/home/hero-slides/${id}`);
};

/**
 * ==============================================================================
 * 2. VALUES CAROUSEL CRUD SERVICES
 * ==============================================================================
 */

// GET ALL VALUE SLIDES
export const getValueSlides = async (params = {}) => {
  return await apiClient.get('/home/value-slides', { params });
};

// CREATE VALUE SLIDE (Supports Image Upload via FormData)
export const createValueSlide = async (formData) => {
  return await apiClient.post('/home/value-slides', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// UPDATE VALUE SLIDE BY ID
export const updateValueSlide = async (id, formData) => {
  return await apiClient.put(`/home/value-slides/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// DELETE VALUE SLIDE BY ID
export const deleteValueSlide = async (id) => {
  return await apiClient.delete(`/home/value-slides/${id}`);
};

