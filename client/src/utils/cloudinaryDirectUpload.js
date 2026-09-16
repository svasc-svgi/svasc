import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

/**
 * Directly uploads a File from client browser to Cloudinary CDN
 * Bypasses backend server processing to eliminate 5-6 min TTFB server timeouts!
 *
 * @param {File} file - File object from input[type=file]
 * @param {string} folder - Destination Cloudinary folder (e.g., 'svasc/alumni/rising-stars')
 * @param {function} onProgress - Callback receiving upload percentage (0-100)
 * @returns {Promise<string>} - Cloudinary secure_url
 */
export const uploadDirectToCloudinary = async (file, folder = 'svasc', onProgress = null) => {
  if (!file) return '';

  // If already a URL string, return directly
  if (typeof file === 'string') return file;

  try {
    // 1. Get secure signed params from our backend API
    const sigRes = await axios.get(`${BASE_URL}/api/upload/signature`, {
      params: { folder }
    });

    const { signature, timestamp, apiKey, cloudName } = sigRes.data;

    // 2. Determine Cloudinary resource_type (video or auto)
    const isVideo = file.type?.startsWith('video/') || file.name?.match(/\.(mp4|webm|ogg|mov)$/i);
    const resourceType = isVideo ? 'video' : 'auto';

    // 3. Prepare FormData for direct Cloudinary upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', folder);

    // 4. Perform direct client-to-Cloudinary upload with live progress
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const res = await axios.post(uploadUrl, formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }
    });

    return res.data.secure_url;
  } catch (error) {
    console.error('Direct Cloudinary upload error:', error);
    const msg = error.response?.data?.error?.message || error.message || 'Direct upload failed';
    throw new Error(`Cloudinary Upload Failed: ${msg}`);
  }
};
