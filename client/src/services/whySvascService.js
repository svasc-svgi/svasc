import apiClient from './apiClient';

export const getWhySvascTestimonials = async () => {
    return await apiClient.get('/why-svasc');
};

export const createWhySvascTestimonial = async (data) => {
    return await apiClient.post('/why-svasc', data);
};

export const updateWhySvascTestimonial = async (id, data) => {
    return await apiClient.put(`/why-svasc/${id}`, data);
};

export const deleteWhySvascTestimonial = async (id) => {
    return await apiClient.delete(`/why-svasc/${id}`);
};
