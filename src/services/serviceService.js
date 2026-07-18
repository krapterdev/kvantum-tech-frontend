import api from './api';

// Fetch all services
export const getAllServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

// Create a new service capability (admin/seo only)
export const createService = async (serviceData) => {
  const response = await api.post('/services', serviceData);
  return response.data;
};

// Update an existing service capability (admin/seo only)
export const updateService = async (id, serviceData) => {
  const response = await api.put(`/services/${id}`, serviceData);
  return response.data;
};

// Delete a service (admin/seo only)
export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};
