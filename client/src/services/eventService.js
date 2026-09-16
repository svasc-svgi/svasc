import apiClient from './apiClient';

/**
 * ==============================================================================
 * EVENTS API SERVICES
 * ==============================================================================
 */

const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData;

// 1. UPCOMING EVENTS GRID
export const getEventsGrid = async () => {
  return await apiClient.get('/events/grid');
};

export const getEventGridById = async (id) => {
  return await apiClient.get(`/events/grid/${id}`);
};

export const createEventGrid = async (data) => {
  return await apiClient.post(
    '/events/grid',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const updateEventGrid = async (id, data) => {
  return await apiClient.put(
    `/events/grid/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const deleteEventGrid = async (id) => {
  return await apiClient.delete(`/events/grid/${id}`);
};

// 2. EVENTS MARQUEE / SLIDER
export const getEventsMarquee = async () => {
  return await apiClient.get('/events/marquee');
};

export const getEventMarqueeById = async (id) => {
  return await apiClient.get(`/events/marquee/${id}`);
};

export const createEventMarquee = async (data) => {
  return await apiClient.post(
    '/events/marquee',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const updateEventMarquee = async (id, data) => {
  return await apiClient.put(
    `/events/marquee/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

export const deleteEventMarquee = async (id) => {
  return await apiClient.delete(`/events/marquee/${id}`);
};

// 3. EVENTS PAGE HERO
export const getEventsPageHero = async () => {
  return await apiClient.get('/page-heros/events');
};
