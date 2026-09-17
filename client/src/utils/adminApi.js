import axios from 'axios';
import { uploadDirectToCloudinary } from './cloudinaryDirectUpload';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

export const fetchAdminData = async (endpoint) => {
  const res = await axios.get(`${BASE_URL}${endpoint}`);
  return res.data.data;
};

export const saveAdminData = async (endpoint, id, formData, fileKey) => {
  // page-heros uses PUT /:pageKey (id is the pageKey string here)
  const isPageHero = endpoint.includes('page-heros');
  const method = (id && !isPageHero) ? 'put' : (isPageHero ? 'put' : 'post');
  const url = isPageHero
    ? `${BASE_URL}${endpoint}/${id}`
    : (id ? `${BASE_URL}${endpoint}/${id}` : `${BASE_URL}${endpoint}`);

  const fileKeys = Array.isArray(fileKey) ? fileKey : [fileKey];

  // 1. Intercept Files and Upload Directly to Cloudinary to prevent Vercel 4.5MB payload limit
  const updatedFormData = { ...formData };
  for (const key of fileKeys) {
    if (updatedFormData[key] instanceof File) {
      const folderName = `svasc${endpoint.replace('/api', '')}`; 
      const cloudinaryUrl = await uploadDirectToCloudinary(updatedFormData[key], folderName);
      updatedFormData[key] = cloudinaryUrl; // Replace File with secure_url
    }
  }

  // 2. Prepare FormData for backend
  const data = new FormData();
  Object.keys(updatedFormData).forEach(key => {
    if (fileKeys.includes(key)) {
      if (typeof updatedFormData[key] === 'string' && updatedFormData[key].trim() !== '') {
        // It's an existing image/video string, pass it along
        data.append(key, updatedFormData[key]);
      }
    } else if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v') {
      if (Array.isArray(updatedFormData[key])) {
        data.append(key, JSON.stringify(updatedFormData[key]));
      } else if (updatedFormData[key] !== null && updatedFormData[key] !== undefined) {
        data.append(key, updatedFormData[key]);
      }
    }
  });

  // Let the browser set the Content-Type with the correct boundary for FormData
  const res = await axios({ method, url, data });
  return res.data;
};

export const deleteAdminData = async (endpoint, id) => {
  const res = await axios.delete(`${BASE_URL}${endpoint}/${id}`);
  return res.data;
};

