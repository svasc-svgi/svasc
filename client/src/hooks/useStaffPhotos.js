import { useState, useEffect } from 'react';
import { getStaffPhotoMap } from '../services/staffService';
import { getStaffKey } from '../utils/staffParser';

// In-memory cache shared across all components
let globalPhotoCache = null;
let listeners = [];

const notifyListeners = () => {
  listeners.forEach(fn => fn(globalPhotoCache));
};

export const useStaffPhotos = () => {
  const [photoMap, setPhotoMap] = useState(() => {
    if (globalPhotoCache) return globalPhotoCache;
    try {
      const saved = localStorage.getItem('svasc_staff_photos');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {};
  });

  useEffect(() => {
    const handleUpdate = (updatedMap) => {
      setPhotoMap(updatedMap || {});
    };
    listeners.push(handleUpdate);

    if (!globalPhotoCache) {
      getStaffPhotoMap().then(map => {
        globalPhotoCache = map;
        try {
          localStorage.setItem('svasc_staff_photos', JSON.stringify(map));
        } catch (e) {
          // ignore
        }
        notifyListeners();
      }).catch(err => {
        console.warn('Error loading staff photo map:', err);
      });
    }

    return () => {
      listeners = listeners.filter(fn => fn !== handleUpdate);
    };
  }, []);

  const reloadStaffPhotos = async () => {
    try {
      const map = await getStaffPhotoMap();
      globalPhotoCache = map;
      try {
        localStorage.setItem('svasc_staff_photos', JSON.stringify(map));
      } catch (e) {
        // ignore
      }
      notifyListeners();
      return map;
    } catch (err) {
      console.error('Error reloading staff photos:', err);
      return {};
    }
  };

  /**
   * Look up photo for a staff name using smart canonical matching
   */
  const getStaffPhoto = (name, fallbackUrl = '') => {
    if (!name) return fallbackUrl || '';
    const key = getStaffKey(name);
    if (photoMap && photoMap[key]) {
      return photoMap[key];
    }
    return fallbackUrl || '';
  };

  return {
    photoMap,
    getStaffPhoto,
    reloadStaffPhotos
  };
};

export default useStaffPhotos;
