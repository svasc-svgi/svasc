import apiClient from './apiClient';

/**
 * ==============================================================================
 * PROGRAMS API SERVICES
 * ==============================================================================
 */

// 1. GET ALL PROGRAMS (Flat List)
export const getPrograms = async () => {
    return await apiClient.get('/programs');
};

// 2. GET GROUPED PROGRAMS (Grouped by UG/PG/Ph.D and School)
export const getGroupedPrograms = async () => {
    return await apiClient.get('/programs/grouped');
};

// 3. GET PROGRAM BY SLUG
export const getProgramBySlug = async (slug) => {
    return await apiClient.get(`/programs/details/${slug}`);
};

// 4. CREATE PROGRAM
export const createProgram = async (data) => {
    return await apiClient.post('/programs', data);
};

// 5. UPDATE PROGRAM
export const updateProgram = async (id, data) => {
    return await apiClient.put(`/programs/${id}`, data);
};

// 6. DELETE PROGRAM
export const deleteProgram = async (id) => {
    return await apiClient.delete(`/programs/${id}`);
};
