import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL;
const rawBaseUrl = import.meta.env.VITE_BASE_URL;
const BASE_URL = rawBaseUrl || (rawApiUrl ? rawApiUrl.replace(/\/api\/?$/, '') : 'http://localhost:5000');

/**
 * Directly uploads a File from client browser to Cloudinary CDN
 * Bypasses backend server to prevent server timeouts and memory exhaustion.
 * Automatically uses chunked upload for videos larger than 20MB.
 *
 * @param {File} file - File object from input[type=file]
 * @param {string} folder - Destination Cloudinary folder (e.g., 'svasc/hero-slides')
 * @param {function} onProgress - Callback receiving upload percentage (0-100)
 * @returns {Promise<string>} - Cloudinary secure_url
 */
export const uploadDirectToCloudinary = async (file, folder = 'svasc', onProgress = null) => {
  if (!file) return '';

  // If already a URL string, return directly
  if (typeof file === 'string') return file;

  // Enforce Cloudinary 100MB max limit
  const MAX_SIZE = 100 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is 100MB.`);
  }

  try {
    // 1. Get secure signed params from backend
    const sigRes = await axios.get(`${BASE_URL}/api/upload/signature`, {
      params: { folder }
    });

    const { signature, timestamp, apiKey, cloudName } = sigRes.data;
    if (!signature || !apiKey || !cloudName) {
      throw new Error('Cloudinary signature missing from server response. Ensure Cloudinary credentials are set on the backend.');
    }

    // 2. Determine Cloudinary resource_type (video or auto)
    const isVideo = file.type?.startsWith('video/') || file.name?.match(/\.(mp4|webm|ogg|mov|m4v)$/i);
    const resourceType = isVideo ? 'video' : 'auto';
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    // 3. For large videos (> 20MB), use Cloudinary's chunked upload protocol (6MB chunks)
    const CHUNK_SIZE = 6 * 1024 * 1024; // 6MB
    if (isVideo && file.size > 20 * 1024 * 1024) {
      const uniqueUploadId = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      let lastResult = null;

      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunkBlob = file.slice(start, end);

        const chunkFormData = new FormData();
        chunkFormData.append('file', chunkBlob);
        chunkFormData.append('api_key', apiKey);
        chunkFormData.append('timestamp', timestamp);
        chunkFormData.append('signature', signature);
        chunkFormData.append('folder', folder);

        const chunkRes = await axios.post(uploadUrl, chunkFormData, {
          headers: {
            'X-Unique-Upload-Id': uniqueUploadId,
            'Content-Range': `bytes ${start}-${end - 1}/${file.size}`,
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const currentChunkLoaded = (progressEvent.loaded / progressEvent.total) * (end - start);
              const totalLoaded = start + currentChunkLoaded;
              const percent = Math.min(99, Math.round((totalLoaded * 100) / file.size));
              onProgress(percent);
            }
          }
        });

        lastResult = chunkRes.data;
      }

      if (onProgress) onProgress(100);
      return lastResult?.secure_url;
    }

    // 4. Standard direct upload for files <= 20MB
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', folder);

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
