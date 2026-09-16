import apiClient from './apiClient';

/**
 * ==============================================================================
 * BLOGS API SERVICES
 * ==============================================================================
 */

const isFormData = (val) => typeof FormData !== 'undefined' && val instanceof FormData;

// 1. GET ALL BLOGS
export const getBlogs = async () => {
  return await apiClient.get('/blogs');
};

// 2. GET SINGLE BLOG BY ID
export const getBlogById = async (id) => {
  return await apiClient.get(`/blogs/${id}`);
};

// 3. CREATE BLOG (Supports Direct Cloudinary URLs or FormData)
export const createBlog = async (data) => {
  return await apiClient.post(
    '/blogs',
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 4. UPDATE BLOG BY ID
export const updateBlog = async (id, data) => {
  return await apiClient.put(
    `/blogs/${id}`,
    data,
    isFormData(data) ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
  );
};

// 5. DELETE BLOG BY ID
export const deleteBlog = async (id) => {
  return await apiClient.delete(`/blogs/${id}`);
};

// 6. GET BLOGS PAGE HERO
export const getBlogsPageHero = async () => {
  return await apiClient.get('/page-heros/blogs');
};
