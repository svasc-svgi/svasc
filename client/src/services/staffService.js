import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL;
const rawBaseUrl = import.meta.env.VITE_BASE_URL;
const BASE_URL = rawBaseUrl || (rawApiUrl ? rawApiUrl.replace(/\/api\/?$/, '') : 'http://localhost:5000');

export const getStaffPhotoMap = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/staff/photos`);
    return res.data?.data || {};
  } catch (error) {
    console.warn('Could not fetch staff photos from API, falling back to cached or empty:', error.message);
    return {};
  }
};

export const getDepartments = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/staff/departments`);
    return res.data?.data || [];
  } catch (error) {
    console.warn('Could not fetch departments from API, using fallback:', error.message);
    return [];
  }
};

export const createDepartment = async (name) => {
  const res = await axios.post(`${BASE_URL}/api/staff/departments`, { name });
  return res.data;
};

export const deleteDepartment = async (name) => {
  const res = await axios.delete(`${BASE_URL}/api/staff/departments/${encodeURIComponent(name)}`);
  return res.data;
};

export const getAllStaff = async (params = {}) => {
  const res = await axios.get(`${BASE_URL}/api/staff`, { params });
  return res.data?.data || [];
};

export const createStaff = async (data) => {
  const res = await axios.post(`${BASE_URL}/api/staff`, data);
  return res.data;
};

export const updateStaff = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/api/staff/${id}`, data);
  return res.data;
};

export const deleteStaff = async (id) => {
  const res = await axios.delete(`${BASE_URL}/api/staff/${id}`);
  return res.data;
};

export const cloneStaff = async (id, data) => {
  const res = await axios.post(`${BASE_URL}/api/staff/${id}/clone`, data);
  return res.data;
};

export const syncDefaultStaff = async (facultyList) => {
  const res = await axios.post(`${BASE_URL}/api/staff/sync-defaults`, { facultyList });
  return res.data;
};
